import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import CarForm from "../components/cars/CarForm";
import Button from "../components/common/Button";
import EmptyState from "../components/common/EmptyState";
import Loader from "../components/common/Loader";
import SectionCard from "../components/common/SectionCard";
import AppShell from "../components/layout/AppShell";

export default function EditCarPage() {
  const navigate = useNavigate();
  const { carId } = useParams();
  const { getCarById, upsertCar, loadingCars } = useApp();
  const [saving, setSaving] = useState(false);
  const car = getCarById(carId);

  async function handleSave(formData) {
    setSaving(true);
    try {
      const savedCar = await upsertCar({ ...formData, id: carId });
      navigate(`/cars/${savedCar.id}`);
    } finally {
      setSaving(false);
    }
  }

  if (loadingCars) {
    return (
      <AppShell title={appCopy.form.editTitle} subtitle={appCopy.form.editSubtitle}>
        <Loader label={appCopy.dashboard.loading} />
      </AppShell>
    );
  }

  if (!car) {
    return (
      <AppShell title={appCopy.details.missingTitle} subtitle={appCopy.details.missingMessage}>
        <SectionCard>
          <EmptyState
            title={appCopy.details.missingTitle}
            message={appCopy.details.missingMessage}
            actionLabel={appCopy.details.missingAction}
            onAction={() => navigate("/dashboard")}
          />
        </SectionCard>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={appCopy.form.editTitle}
      subtitle={appCopy.form.editSubtitle}
      action={
        <Button variant="secondary" onClick={() => navigate(`/cars/${carId}`)}>
          Open current report
        </Button>
      }
    >
      <CarForm initialValues={car} onSave={handleSave} saving={saving} mode="edit" />
    </AppShell>
  );
}

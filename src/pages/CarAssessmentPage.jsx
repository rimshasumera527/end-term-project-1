import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appCopy } from "../content/copy";
import { useApp } from "../context/AppContext";
import CarForm from "../components/cars/CarForm";
import Button from "../components/common/Button";
import AppShell from "../components/layout/AppShell";

export default function CarAssessmentPage() {
  const navigate = useNavigate();
  const { upsertCar } = useApp();
  const [saving, setSaving] = useState(false);

  async function handleSave(formData) {
    setSaving(true);
    try {
      const savedCar = await upsertCar(formData);
      navigate(`/cars/${savedCar.id}`);
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppShell
      title={appCopy.form.title}
      subtitle={appCopy.form.subtitle}
      action={
        <Button variant="secondary" onClick={() => navigate("/dashboard")}>
          {appCopy.form.backAction}
        </Button>
      }
    >
      <CarForm onSave={handleSave} saving={saving} />
    </AppShell>
  );
}

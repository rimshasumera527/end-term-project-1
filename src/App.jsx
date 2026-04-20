import { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loader from "./components/common/Loader";
import { appCopy } from "./content/copy";
import ProtectedRoute from "./routes/ProtectedRoute";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const CarAssessmentPage = lazy(() => import("./pages/CarAssessmentPage"));
const EditCarPage = lazy(() => import("./pages/EditCarPage"));
const CarDetailsPage = lazy(() => import("./pages/CarDetailsPage"));
const ComparePage = lazy(() => import("./pages/ComparePage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage"));

export default function App() {
  return (
    <Suspense fallback={<Loader fullScreen label={appCopy.shared.loadingApp} />}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/new"
          element={
            <ProtectedRoute>
              <CarAssessmentPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/:carId"
          element={
            <ProtectedRoute>
              <CarDetailsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/:carId/edit"
          element={
            <ProtectedRoute>
              <EditCarPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/compare"
          element={
            <ProtectedRoute>
              <ComparePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
}

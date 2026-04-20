import { Navigate, useLocation } from "react-router-dom";
import Loader from "../components/common/Loader";
import { appCopy } from "../content/copy";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader fullScreen label={appCopy.shared.loadingSession} />;
  }

  if (!user) {
    return <Navigate to="/auth" replace state={{ from: location.pathname }} />;
  }

  return children;
}

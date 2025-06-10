
import { useLocation, Navigate } from 'react-router-dom';
import Auth from './Auth';

const AuthPage = () => {
  const location = useLocation();
  const { selectedRole, projectId } = location.state || {};

  // If no state is passed, redirect back to onboarding
  if (!selectedRole || !projectId) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Auth selectedRole={selectedRole} projectId={projectId} />;
};

export default AuthPage;

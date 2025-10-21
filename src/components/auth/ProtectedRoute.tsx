import React, { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { showError } from '@/utils/toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth(); // Get isLoading
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) { // Only redirect if not loading AND no user
      showError('Anda perlu log masuk untuk mengakses halaman ini.');
      navigate('/login');
    }
  }, [user, isLoading, navigate]); // Add isLoading to dependency array

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center">
        <p className="text-lg text-muted-foreground">Memuatkan...</p>
      </div>
    ); // Show a loading indicator while auth state is being determined
  }

  if (!user) {
    return null; // User is not logged in and not loading, so redirect has been initiated.
  }

  return <>{children}</>;
};

export default ProtectedRoute;
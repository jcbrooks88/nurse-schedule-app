// src/pages/Dashboard.tsx
import { useEffect, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { GET_DASHBOARD_DATA } from '../../graphql/queries';
import WelcomeHeader from './WelcomeHeader';
import UpcomingShifts from './UpcomingShifts';
import ShiftRequests from './ShiftRequests';

export default function DashboardComponent() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem('token'), []);
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-xl text-teal animate-pulse">Loading your dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="text-xl text-burgundy font-semibold">Something went wrong. Please try again later.</div>
      </div>
    );
  }

  const { me } = data;
  const { assignedShifts = [] } = me;

  return (
    
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="bg-background shadow-lg rounded-2xl p-6 md:p-10">
          <WelcomeHeader />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-background shadow-md rounded-2xl p-6">
            <UpcomingShifts shifts={assignedShifts} />
          </div>
          <div className="bg-background shadow-md rounded-2xl p-6">
            <ShiftRequests />
          </div>
        </div>
      </div>
    
  );
}

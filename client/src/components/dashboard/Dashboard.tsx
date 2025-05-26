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
    return <div className="text-center py-10 text-teal text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-burgundy text-lg">Error loading dashboard data.</div>;
  }

  const { me } = data;
  const { assignedShifts = [], shiftRequests = [], ...user } = me;

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-sans">
      <WelcomeHeader user={user} />
      <UpcomingShifts shifts={assignedShifts} />
      <ShiftRequests requests={shiftRequests} />
    </div>
  );
}

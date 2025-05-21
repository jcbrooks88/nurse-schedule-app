// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useMemo } from 'react';
import { GET_DASHBOARD_DATA } from '../graphql/queries';

interface Shift {
  id: string;
  title: string;
  start: string;
  end: string;
  status: string;
}

interface ShiftRequest {
  id: string;
  shift: Shift;
  status: string;
}

export default function DashboardComponent() {
  const navigate = useNavigate();
  const token = useMemo(() => localStorage.getItem('token'), []);
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const assignedShifts: Shift[] = data?.assignedShifts || [];
  const shiftRequests: ShiftRequest[] = data?.shiftRequests || [];

  if (loading) return <div className="text-center py-10 text-lg text-secondary">Loading...</div>;
  if (error) return <div className="text-center py-10 text-lg text-quaternary">Error loading dashboard data.</div>;

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen">
      <h2 className="text-2xl font-bold text-primary mb-4 border-b-2 border-secondary pb-2">Upcoming Shifts</h2>
      <ul className="space-y-4">
        {assignedShifts.length === 0 && (
          <li className="text-gray-700 italic">No upcoming shifts.</li>
        )}
        {assignedShifts.map((shift: Shift) => (
          <li
            key={shift.id}
            className="bg-white rounded-2xl shadow-md border border-tertiary hover:shadow-lg transition-shadow p-4"
          >
            <div className="font-semibold text-lg text-quaternary">{shift.title}</div>
            <div className="text-sm text-gray-600 mt-1">
              {new Date(shift.start).toLocaleString()} –{' '}
              {new Date(shift.end).toLocaleString()}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium text-secondary">Status:</span>{' '}
              <span className="text-primary">{shift.status}</span>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold text-primary mt-10 mb-4 border-b-2 border-secondary pb-2">Shift Requests</h2>
      <ul className="space-y-4">
        {shiftRequests.length === 0 && (
          <li className="text-gray-700 italic">No requests submitted.</li>
        )}
        {shiftRequests.map((req: ShiftRequest) => (
          <li
            key={req.id}
            className="bg-white rounded-2xl shadow-md border border-tertiary hover:shadow-lg transition-shadow p-4"
          >
            <div className="font-semibold text-lg text-quaternary">{req.shift.title}</div>
            <div className="text-sm text-gray-600 mt-1">
              {new Date(req.shift.start).toLocaleString()} –{' '}
              {new Date(req.shift.end).toLocaleString()}
            </div>
            <div className="mt-2 text-sm">
              <span className="font-medium text-secondary">Request Status:</span>{' '}
              <span className="text-primary">{req.status}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

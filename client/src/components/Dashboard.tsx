// src/pages/Dashboard.tsx
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
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
  const token = localStorage.getItem('token');

  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const assignedShifts: Shift[] = data?.assignedShifts || [];
  const shiftRequests: ShiftRequest[] = data?.shiftRequests || [];

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading dashboard data.</div>;

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Upcoming Shifts</h2>
      <ul className="space-y-2">
        {assignedShifts.length === 0 && <li>No upcoming shifts.</li>}
        {assignedShifts.map((shift: Shift) => (
          <li key={shift.id} className="border rounded p-3 shadow">
            <div className="font-semibold">{shift.title}</div>
            <div className="text-sm text-gray-600">
              {new Date(shift.start).toLocaleString()} -{' '}
              {new Date(shift.end).toLocaleString()}
            </div>
            <span className="text-sm font-medium">Status: {shift.status}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Shift Requests</h2>
      <ul className="space-y-2">
        {shiftRequests.length === 0 && <li>No requests submitted.</li>}
        {shiftRequests.map((req: ShiftRequest) => (
          <li key={req.id} className="border rounded p-3 shadow">
            <div className="font-semibold">{req.shift.title}</div>
            <div className="text-sm text-gray-600">
              {new Date(req.shift.start).toLocaleString()} -{' '}
              {new Date(req.shift.end).toLocaleString()}
            </div>
            <span className="text-sm font-medium">
              Request Status: {req.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// src/pages/Dashboard.tsx

import { useEffect, useMemo } from 'react';
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
  const token = useMemo(() => localStorage.getItem('token'), []);
  const { data, loading, error } = useQuery(GET_DASHBOARD_DATA);

  useEffect(() => {
    if (!token) navigate('/login');
  }, [token, navigate]);

  const assignedShifts: Shift[] = data?.assignedShifts || [];
  const shiftRequests: ShiftRequest[] = data?.shiftRequests || [];
  const user = data?.user;

  if (loading) {
    return <div className="text-center py-10 text-teal text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-burgundy text-lg">Error loading dashboard data.</div>;
  }

  return (
    <div className="p-6 md:p-10 bg-background min-h-screen font-sans">
      {/* Welcome Header */}
      <div className="bg-white rounded-xl shadow-card p-6 mb-10 flex flex-col md:flex-row md:justify-between md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-grayDark mb-1">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
          </h1>
          <p className="text-sm text-accent">
            Here's your shift schedule and recent activity.
          </p>
        </div>
        <div className="mt-4 md:mt-0 text-sm text-grayDark space-y-1">
          <div><strong>Role:</strong> {user?.role || 'Nurse'}</div>
          <div><strong>Email:</strong> {user?.email}</div>
        </div>
      </div>

      {/* Upcoming Shifts */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-orange border-b-2 border-teal pb-2 mb-4">
          Upcoming Shifts
        </h2>
        <ul className="space-y-4">
          {assignedShifts.length === 0 ? (
            <li className="text-accent italic">No upcoming shifts.</li>
          ) : (
            assignedShifts.map((shift) => (
              <li
                key={shift.id}
                className="bg-card rounded-xl shadow-card border border-accent hover:shadow-md transition-shadow p-5"
              >
                <div className="text-lg font-semibold text-burgundy">{shift.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(shift.start).toLocaleString()} –{' '}
                  {new Date(shift.end).toLocaleString()}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium text-teal">Status:</span>{' '}
                  <span className="text-grayDark">{shift.status}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>

      {/* Shift Requests */}
      <section>
        <h2 className="text-xl font-semibold text-orange border-b-2 border-teal pb-2 mb-4">
          Shift Requests
        </h2>
        <ul className="space-y-4">
          {shiftRequests.length === 0 ? (
            <li className="text-accent italic">No requests submitted.</li>
          ) : (
            shiftRequests.map((req) => (
              <li
                key={req.id}
                className="bg-card rounded-xl shadow-card border border-accent hover:shadow-md transition-shadow p-5"
              >
                <div className="text-lg font-semibold text-burgundy">{req.shift.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {new Date(req.shift.start).toLocaleString()} –{' '}
                  {new Date(req.shift.end).toLocaleString()}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium text-teal">Request Status:</span>{' '}
                  <span className="text-grayDark">{req.status}</span>
                </div>
              </li>
            ))
          )}
        </ul>
      </section>
    </div>
  );
}

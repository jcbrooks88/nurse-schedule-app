import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

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

interface MeData {
  me: {
    name: string;
    email: string;
    role: string;
    createdAt: string;
    assignedShifts: Shift[];
    shiftRequests: ShiftRequest[];
  };
}

export default function Profile() {
  const { data, loading, error } = useQuery<MeData>(GET_ME);

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (error) return <p className="p-4 text-red-500">Error: {error.message}</p>;

  if (!data || !data.me) return <p className="p-4 text-red-500">Profile data not available.</p>;
  const { name, email, assignedShifts, shiftRequests } = data.me;

  return (
    <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded shadow space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Your Profile</h2>
        <p><strong>Name:</strong> {name}</p>
        <p><strong>Email:</strong> {email}</p>
            {shiftRequests.map((req: ShiftRequest) => (
              <li key={req.id} className="p-2 bg-blue-100 rounded">
                Requested: <strong>{req.shift.title}</strong> on {new Date(req.shift.start).toLocaleDateString()} — Status: <em>{req.status}</em>
              </li>
            ))}
        <h3 className="text-xl font-semibold mb-2">Assigned Shifts</h3>
        {assignedShifts.length === 0 ? (
          <p>No assigned shifts yet.</p>
        ) : (
          <ul className="space-y-1">
            {assignedShifts.map(shift => (
              <li key={shift.id} className="p-2 bg-gray-100 rounded">
                <strong>{shift.title}</strong> — {new Date(shift.start).toLocaleString()} to {new Date(shift.end).toLocaleString()} [{shift.status}]
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-2">Shift Requests</h3>
        {shiftRequests.length === 0 ? (
          <p>No shift requests submitted.</p>
        ) : (
          <ul className="space-y-1">
            {shiftRequests.map(req => (
              <li key={req.id} className="p-2 bg-blue-100 rounded">
                Requested: <strong>{req.shift.title}</strong> on {new Date(req.shift.start).toLocaleDateString()} — Status: <em>{req.status}</em>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

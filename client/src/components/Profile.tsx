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

  if (loading) return <p className="p-4 text-grayDark">Loading profile...</p>;
  if (error) return <p className="p-4 text-burgundy">Error: {error.message}</p>;
  if (!data?.me) return <p className="p-4 text-burgundy">Profile data not available.</p>;

  const { name, email, assignedShifts, shiftRequests } = data.me;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-card rounded-2xl shadow-card border border-accent space-y-8">
      <section>
        <h2 className="text-3xl font-semibold text-burgundyLight mb-4">Your Profile</h2>
        <div className="text-grayDark space-y-2">
          <p><span className="font-semibold">Name:</span> {name}</p>
          <p><span className="font-semibold">Email:</span> {email}</p>
        </div>
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-teal mb-3">Assigned Shifts</h3>
        {assignedShifts.length === 0 ? (
          <p className="text-grayLight italic">No assigned shifts yet.</p>
        ) : (
          <ul className="space-y-3">
            {assignedShifts.map(shift => (
              <li
                key={shift.id}
                className="p-3 bg-white rounded-lg border border-accent shadow-sm text-sm text-grayDark"
              >
                <strong className="text-burgundyLight">{shift.title}</strong> —{' '}
                {new Date(shift.start).toLocaleString()} to {new Date(shift.end).toLocaleString()} —{' '}
                <span className="italic text-orange">{shift.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h3 className="text-2xl font-semibold text-teal mb-3">Shift Requests</h3>
        {shiftRequests.length === 0 ? (
          <p className="text-grayLight italic">No shift requests submitted.</p>
        ) : (
          <ul className="space-y-3">
            {shiftRequests.map(req => (
              <li
                key={req.id}
                className="p-3 bg-lightBeige rounded-lg border border-orangeLight shadow-sm text-sm text-grayDark"
              >
                Requested: <strong className="text-burgundyLight">{req.shift.title}</strong> on{' '}
                {new Date(req.shift.start).toLocaleDateString()} —{' '}
                <span className="italic text-orange">{req.status}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}

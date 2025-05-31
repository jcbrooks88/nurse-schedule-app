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

  const { name, email, role, assignedShifts, shiftRequests } = data.me;
  const avatarUrl = `https://i.pravatar.cc/100?u=${email}`;

  const formatDateTime = (dateStr: string) => {
    if (!dateStr) return 'Future time';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Future time';
    const now = new Date();
    return date > now
      ? 'Future time'
      : new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }).format(date);
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Future date';
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return 'Future date';
    const now = new Date();
    return date > now
      ? 'Future date'
      : new Intl.DateTimeFormat('en-US', {
          dateStyle: 'medium',
        }).format(date);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-background/85 rounded-2xl shadow-card border border-burgundyLight space-y-10">
      {/* Profile Header */}
      <header className="flex items-center gap-4">
        <img
          src={avatarUrl}
          alt={`${name}'s avatar`}
          className="w-16 h-16 rounded-full border border-gray-300 shadow-sm"
        />
        <div>
          <h2 className="text-3xl font-semibold text-burgundyLight">Welcome, {name}</h2>
          <p className="text-sm text-grayDark">{role} | {email}</p>
        </div>
      </header>

      {/* Assigned Shifts */}
      <article>
        <h3 className="text-2xl font-semibold text-teal/90 mb-4">Assigned Shifts</h3>
        {assignedShifts.length === 0 ? (
          <p className="text-grayLight italic">You have no assigned shifts at the moment.</p>
        ) : (
          <ul className="space-y-4">
            {assignedShifts.map(({ id, title, start, end, status }) => (
              <li
                key={id}
                className="p-4 bg-white rounded-lg border border-accent shadow-sm text-sm text-grayDark"
              >
                <p className="font-semibold text-burgundyLight">{title}</p>
                <p>{formatDateTime(start)} &rarr; {formatDateTime(end)}</p>
                <p className="italic text-orange">{status}</p>
              </li>
            ))}
          </ul>
        )}
      </article>

      {/* Shift Requests */}
      <article>
        <h3 className="text-2xl font-semibold text-teal mb-4">Shift Requests</h3>
        {shiftRequests.length === 0 ? (
          <p className="text-grayLight italic">No shift requests submitted.</p>
        ) : (
          <ul className="space-y-4">
            {shiftRequests.map(({ id, shift, status }) => (
              <li
                key={id}
                className="p-4 bg-lightBeige rounded-lg border border-orangeLight shadow-sm text-sm text-grayDark"
              >
                <p className="font-semibold text-burgundyLight">{shift.title}</p>
                <p>Requested on: {formatDate(shift.start)}</p>
                <p className="italic text-orange">{status}</p>
              </li>
            ))}
          </ul>
        )}
      </article>
    </div>
  );
}

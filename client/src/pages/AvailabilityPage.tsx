import AvailabilityCalendar from '../components/Availability';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

export default function AvailabilityPage() {
  const { data, loading } = useQuery(GET_ME);
  if (loading) return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-red-500">No user data found</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-semibold text-center text-blue-700 mb-6">Set Your Availability</h1>
        <p className="text-gray-600 text-center mb-8">
          Select the days you're available to work. This helps the scheduler match you to open shifts.
        </p>
        <AvailabilityCalendar userId={data.me.id} />
      </div>
    </div>
  );
}


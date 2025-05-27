import AvailabilityCalendar from '../components/Availability';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';

export default function AvailabilityPage() {
  const { data, loading } = useQuery(GET_ME);
  if (loading) return <p className="text-center mt-10 text-grayDark">Loading...</p>;
  if (!data) return <p className="text-center mt-10 text-errorRed">No user data found</p>;

  return (
    <div className="min-h-screen bg-lightBeige py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white border border-accent rounded-xl shadow-card hover:shadow-md transition-shadow p-8">
        <h1 className="text-3xl font-bold text-center text-burgundyLight mb-6">Set Your Availability</h1>
        <p className="text-grayDark text-center mb-8">
          Select the days you're available to work. This helps the scheduler match you to open shifts.
        </p>
        <AvailabilityCalendar userId={data.me.id} />
      </div>
    </div>
  );
}

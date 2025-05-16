import AvailabilityCalendar from '../components/Availability';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../graphql/queries';


export default function AvailabilityPage() {
  const { data, loading } = useQuery(GET_ME);
  if (loading) return <p>Loading...</p>;
  if (!data) return <p>No user data found</p>;


  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Availability Page</h1>
      <AvailabilityCalendar userId={data.me.id} />
    </div>
  );
}

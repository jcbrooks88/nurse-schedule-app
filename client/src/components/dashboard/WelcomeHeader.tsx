import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../graphql/queries';

export default function WelcomeHeader() {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-first',
  });

  const user = data?.me;

  if (loading || error || !user) return null;

  return (
    <div className="bg-lightBeige rounded-2xl shadow-lg border border-accent transition-shadow hover:shadow-xl p-6 mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h1 className="text-3xl font-semibold text-burgundyLight mb-2">
          Welcome back{user.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-base text-grayDark mb-3">
          Here’s your shift schedule and recent activity.
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/availability"
            className="text-sm font-medium text-teal hover:text-darkMossGreen transition-colors underline underline-offset-2"
          >
            View Availability
          </Link>
          <Link
            to="/requests"
            className="text-sm font-medium text-teal hover:text-darkMossGreen transition-colors underline underline-offset-2"
          >
            View Requests
          </Link>
        </div>
      </div>

      <div className="md:text-right text-sm text-grayDark">
        <div className="bg-white/50 border border-accent px-4 py-2 rounded-lg shadow-sm inline-block">
          <span className="font-semibold">Role:</span> {user.role || 'Nurse'}
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../graphql/queries';

export default function WelcomeHeader() {
  const { data, loading, error } = useQuery(GET_ME, {
    fetchPolicy: 'cache-first',
  });

  const user = data?.me;
  const avatarUrl = user?.email ? `https://i.pravatar.cc/40?u=${user.email}` : '';

  if (loading || error || !user) return null;

  return (
    <div className="bg-lightBeige rounded-xl shadow-card border border-accent hover:shadow-md transition-shadow p-6 mb-10 flex flex-col md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-burgundyLight mb-1">
          Welcome back{user.name ? `, ${user.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-sm text-grayDark">
          Here's your shift schedule and recent activity.
        </p>

        <div className="mt-3 flex space-x-4">
          <Link
            to="/availability"
            className="text-sm text-teal hover:text-darkMossGreen underline"
          >
            View Availability
          </Link>
          <Link
            to="/requests"
            className="text-sm text-teal hover:text-darkMossGreen underline"
          >
            View Requests
          </Link>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <div className="text-sm text-grayDark space-y-1 text-right">
          <div><strong>Role:</strong> {user.role || 'Nurse'}</div>
        </div>
        {avatarUrl && (
          <img
            src={avatarUrl}
            alt={`${user.name || 'User'}'s profile`}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>
    </div>
  );
}

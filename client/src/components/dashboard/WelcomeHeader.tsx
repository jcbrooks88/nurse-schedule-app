interface User {
  firstName?: string;
  role?: string;
  email?: string;
  picture?: string; // New: user profile image URL
}

export default function WelcomeHeader({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-xl shadow-card p-6 mb-10 flex flex-col md:flex-row md:justify-between md:items-center">
      <div>
        <h1 className="text-2xl font-bold text-grayDark mb-1">
          Welcome back{user?.firstName ? `, ${user.firstName}` : ''}!
        </h1>
        <p className="text-sm text-accent">
          Here's your shift schedule and recent activity.
        </p>
      </div>

      <div className="mt-4 md:mt-0 flex items-center space-x-4">
        <div className="text-sm text-grayDark space-y-1 text-right">
          <div><strong>Role:</strong> {user?.role || 'Nurse'}</div>
          <div><strong>Email:</strong> {user?.email}</div>
        </div>
        {user?.picture && (
          <img
            src={user.picture}
            alt={`${user.firstName || 'User'}'s profile`}
            className="w-12 h-12 rounded-full object-cover border border-gray-300"
          />
        )}
      </div>
    </div>
  );
}

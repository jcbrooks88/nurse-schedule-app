import { useAuth } from '../hooks/useAuth';

export function LogoutButton() {
  const { logout } = useAuth();

  return (
    <button
      onClick={logout}
      className="text-sm text-orange hover:underline"
    >
      Logout
    </button>
  );
}

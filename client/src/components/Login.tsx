import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { loading, error }] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      localStorage.setItem('token', data.login.accessToken);
      navigate('/dashboard');
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ variables: formState });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-card rounded-2xl px-8 pt-8 pb-10 w-full max-w-full sm:max-w-md md:max-w-lg border border-accent"
        >
        <h2 className="text-2xl font-extrabold text-center mb-6 text-teal tracking-tight font-sans">
          Login to your account
        </h2>

        <div className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition duration-200"
            required
          />
          {error && (
            <p className="text-burgundy text-sm text-center">
              {error.message.replace('GraphQL error: ', '')}
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-orange text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

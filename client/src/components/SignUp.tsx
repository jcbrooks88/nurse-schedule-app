import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

export default function SignUpForm() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [success, setSuccess] = useState(false);

  const [addUser, { loading, error }] = useMutation(ADD_USER, {
    onCompleted: (data) => {
      localStorage.setItem('accessToken', data.addUser.accessToken);
      setSuccess(true);
      navigate('/dashboard');     
    },
    onError: () => {
      setTimeout(() => window.location.reload(), 2500);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addUser({ variables: formState });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-card shadow-card rounded-2xl px-8 pt-8 pb-10 w-full max-w-md border border-accent"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-purple tracking-tight font-sans">
          Create an account
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formState.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple transition duration-200"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formState.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple transition duration-200"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formState.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-accent rounded-lg focus:outline-none focus:ring-2 focus:ring-purple transition duration-200"
            required
          />
          {success && (
            <p className="text-green-600 text-sm text-center">
              Signup successful! Redirecting...
            </p>
          )}
          {error && (
            <p className="text-burgundy text-sm text-center">
              Signup failed. Please try again.
            </p>
          )}
          <button
            type="submit"
            className="w-full bg-teal text-white py-2 rounded-lg font-semibold hover:bg-opacity-90 transition duration-200 shadow-md"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Sign Up'}
          </button>
        </div>
      </form>
    </div>
  );
}

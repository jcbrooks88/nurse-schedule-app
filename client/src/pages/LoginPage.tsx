import { Link } from 'react-router-dom';
import LoginForm from '../components/Login';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4 border border-accent">
      <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl p-8 space-y-6">
        <h1 className="text-3xl font-bold text-center text-burgundyLight">
          Welcome to MedShift Manager
        </h1>

        <LoginForm />

        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?
          </p>
          <Link to="/signup">
            <button
              className="mt-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-lg text-grayDark
             hover:bg-grayLight/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200"
              aria-label="Sign up for a new account">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

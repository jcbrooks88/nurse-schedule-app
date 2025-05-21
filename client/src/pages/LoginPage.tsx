import { Link } from "react-router-dom";
import LoginForm from "../components/Login";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card p-8 rounded-2xl shadow-card w-full max-w-md border border-accent">
        <LoginForm />

        {/* Signup redirect section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don’t have an account?
          </p>
          <Link to="/signup">
            <button className="mt-2 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

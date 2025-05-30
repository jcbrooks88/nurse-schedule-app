import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUp";

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softNeutral/50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-lg">

        <SignUpForm />

        {/* Login redirect section */}

        <div className="mt-6 text-center">
          <p className="text-sm text-grayDark text-muted-foreground">
            Already have an account?
          </p>
          <Link to="/login">
            <button
              className="mt-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium rounded-xl bg-primary text-orange hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200"
              aria-label="Sign up for a new account"
            >
                Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

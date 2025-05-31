import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUp";
import WelcomeHeader from "../components/WelcomeHeader";

export default function SignUp() {
  return (
    <>
      <WelcomeHeader />
      <main>
        <div className="min-h-screen flex items-center justify-center bg-muted px-4 border border-accent">
          <div className="w-full max-w-md bg-background border border-border rounded-2xl shadow-xl p-8 space-y-6">
            <h1 className="text-3xl font-semibold text-center text-burgundyLight/85">
              Welcome to MedShift Manager
            </h1>

            <SignUpForm />

            {/* Login redirect section */}
            <div className="mt-6 text-center">
              <p className="text-sm text-grayDarker text-muted-foreground">
                Already have an account?
              </p>
              <Link to="/login">
                <button
                  className="mt-3 inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold rounded-lg text-grayDark hover:bg-grayLight/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 transition-all duration-200"
                  aria-label="Log in to your account"
                >
                  Log In
                </button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

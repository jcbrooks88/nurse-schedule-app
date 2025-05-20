import LoginForm from "../components/Login";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="bg-card p-8 rounded-2xl shadow-card w-full max-w-md border border-accent">
        <LoginForm />
      </div>
    </div>
  );
}

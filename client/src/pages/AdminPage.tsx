import AdminDashboard from "../components/AdminDashboard";

export default function AdminDashboardPage() {
  return (
    <div className="min-h-screen bg-softNeutral/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto bg-transparent border border-transparent rounded-2xl shadow-transparent p-8 space-y-6">
        <h1 className="text-4xl font-bold text-teal/90 tracking-tight">Admin Dashboard</h1>
        <p className="text-grayDarker/95 text-lg">
          Review and manage shift requests from team members. Approve or reject each based on availability and scheduling needs.
        </p>
        <div className="pt-6">
          <AdminDashboard />
        </div>
      </div>
    </div>
  );
}

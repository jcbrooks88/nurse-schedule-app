import Request from "../components/Requests";

export default function RequestPage () {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-2xl shadow-lg">
        <h2 className="text-3xl text-grayLight font-semibold text-center text-foreground mb-6">
          Make your requests here
        </h2>
        <Request />
        </div>
      </div>
  );
}

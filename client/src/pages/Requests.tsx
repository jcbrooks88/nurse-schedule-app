export default function Request() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Request a Shift</h1>
      <form className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Shift Title</label>
          <input type="text" className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">Start Time</label>
          <input type="datetime-local" className="w-full border p-2 rounded" required />
        </div>
        <div>
          <label className="block mb-1 font-medium">End Time</label>
          <input type="datetime-local" className="w-full border p-2 rounded" required />
        </div>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded shadow">
          Submit Request
        </button>
      </form>
    </div>
  );
}
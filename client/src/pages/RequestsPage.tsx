export default function Request() {
  return (
    <div className="p-6 max-w-2xl mx-auto bg-lightBeige border border-accent rounded-xl shadow-card hover:shadow-md transition-shadow">
      <h1 className="text-2xl font-bold text-burgundyLight mb-6 text-center">Request a Shift</h1>
      <form className="space-y-5">
        <div>
          <label className="block mb-1 font-medium text-grayDark">Shift Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-grayDark">Start Time</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium text-grayDark">End Time</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-teal text-white px-5 py-2 rounded hover:bg-darkMossGreen transition-colors shadow-md"
        >
          Submit Request
        </button>
      </form>
    </div>
  );
}

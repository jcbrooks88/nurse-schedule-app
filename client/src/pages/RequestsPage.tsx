export default function Request() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-softNeutral/50 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-lightBeige border border-border p-8 rounded-2xl shadow-lg">
        <h1 className="text-2xl font-bold text-burgundyLight mb-6 text-center">
          Request a Shift
        </h1>
        <form className="space-y-5">
          <div>
            <label className="block mb-1 font-medium text-grayDarker">Shift Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-grayDarker">Start Time</label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-grayDarker">End Time</label>
            <input
              type="datetime-local"
              className="w-full border border-gray-300 p-3 rounded bg-white text-grayDark"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-teal text-white px-5 py-2 rounded hover:bg-darkMossGreen transition-colors shadow-md"
            >
              Submit Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

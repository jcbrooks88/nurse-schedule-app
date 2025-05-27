import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { REQUEST_SHIFT } from '../graphql/mutations';
import { GET_SHIFTS } from '../graphql/queries';

type Shift = {
  id: string;
  title: string;
  start: string;
  end: string;
};

export default function Request() {
  const [shiftId, setShiftId] = useState('');
  const { data: shiftData, loading: loadingShifts } = useQuery(GET_SHIFTS);
  const [requestShift, mutationResult] = useMutation(REQUEST_SHIFT);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestShift({ variables: { shiftId } });
      setShiftId('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="p-6 max-w-lg bg-burgundy mx-auto border border-accent rounded-xl shadow-card hover:shadow-md transition-shadow"
      >
        <h2 className="text-2xl font-bold text-burgundyLight mb-4 text-center">
          Request a Shift
        </h2>

        <label className="block text-grayDark font-medium mb-2">Select a Shift:</label>
        {loadingShifts ? (
          <p className="text-grayDark">Loading shifts...</p>
        ) : (
          <select
            className="block w-full mb-4 p-3 border border-gray-300 rounded bg-white text-grayDark"
            value={shiftId}
            onChange={(e) => setShiftId(e.target.value)}
            required
          >
            <option value="">-- Choose a shift --</option>
            {shiftData?.shifts.map((shift: Shift) => (
              <option key={shift.id} value={shift.id}>
                {shift.title} ({new Date(shift.start).toLocaleString()} -{' '}
                {new Date(shift.end).toLocaleString()})
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          disabled={mutationResult.loading}
          className="bg-teal text-white px-5 py-2 rounded hover:bg-darkMossGreen transition-colors disabled:opacity-60"
        >
          {mutationResult.loading ? 'Submitting...' : 'Request Shift'}
        </button>

        {mutationResult.error && (
          <p className="text-errorRed mt-3">Error: {mutationResult.error.message}</p>
        )}
        {mutationResult.data && (
          <p className="text-successGreen mt-3">Shift request submitted successfully!</p>
        )}
      </form>
    </div>
    </div>
  );
}

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
  // Use mutationResult.data, mutationResult.loading, and mutationResult.error directly below

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await requestShift({ variables: { shiftId } });
      alert('Shift request submitted!');
      setShiftId('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-md mx-auto bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-4">Request a Shift</h2>

      <label className="block mb-2">Select a Shift:</label>
      {loadingShifts ? (
        <p>Loading shifts...</p>
      ) : (
        <select
          className="block w-full mb-4 p-2 border rounded"
          value={shiftId}
          onChange={e => setShiftId(e.target.value)}
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
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {mutationResult.loading ? 'Submitting...' : 'Request Shift'}
      </button>

      {mutationResult.error && <p className="text-red-500 mt-2">Error: {mutationResult.error.message}</p>}
      {mutationResult.data && <p className="text-green-600 mt-2">Request sent!</p>}
    </form>
  );
}
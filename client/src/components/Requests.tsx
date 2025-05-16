import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { REQUEST_SHIFT } from '../graphql/mutations';

export default function Request() {
  const [shiftId, setShiftId] = useState('');
  const [requestShift, { data, loading, error }] = useMutation(REQUEST_SHIFT);

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
      <input
        type="text"
        value={shiftId}
        onChange={(e) => setShiftId(e.target.value)}
        placeholder="Enter Shift ID"
        className="w-full border p-2 mb-4"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        {loading ? 'Submitting...' : 'Request Shift'}
      </button>
      {error && <p className="text-red-500 mt-2">Error: {error.message}</p>}
      {data && <p className="text-green-600 mt-2">Request sent!</p>}
    </form>
  );
}

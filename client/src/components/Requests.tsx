import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { REQUEST_SHIFT, DROP_SHIFT, JOIN_WAITLIST } from '../graphql/mutations';
import { GET_SHIFTS } from '../graphql/queries';

type Shift = {
  id: string;
  title: string;
  start: string;
  end: string;
  postedBy: {
    role: 'ADMIN' | 'USER';
    name: string;
  };
};

export default function Request() {
  const [selectedShift, setSelectedShift] = useState<Shift | null>(null);
  const { data: shiftData, loading: loadingShifts, error: shiftsError } = useQuery(GET_SHIFTS);

  const [requestShift] = useMutation(REQUEST_SHIFT, {
    refetchQueries: [{ query: GET_SHIFTS }],
  });
  const [dropShift] = useMutation(DROP_SHIFT, {
    refetchQueries: [{ query: GET_SHIFTS }],
  });
  const [joinWaitlist] = useMutation(JOIN_WAITLIST, {
    refetchQueries: [{ query: GET_SHIFTS }],
  });

  const handleAction = async (action: 'ACCEPT' | 'DROP' | 'WAITLIST') => {
    if (!selectedShift) return;
    try {
      if (action === 'ACCEPT') {
        await requestShift({ variables: { shiftId: selectedShift.id } });
      } else if (action === 'DROP') {
        await dropShift({ variables: { shiftId: selectedShift.id } });
      } else if (action === 'WAITLIST') {
        await joinWaitlist({ variables: { shiftId: selectedShift.id } });
      }
      setSelectedShift(null);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h2 className="text-3xl font-bold text-center text-burgundyLight mb-8">Available Shifts</h2>

      {loadingShifts ? (
        <p className="text-center text-grayDark">Loading...</p>
      ) : shiftsError ? (
        <p className="text-center text-errorRed">Error loading shifts.</p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {shiftData.shifts.map((shift: Shift) => (
            <div
              key={shift.id}
              className="border border-accent rounded-xl p-4 shadow-sm hover:shadow-md hover:bg-burgundyLight/10 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedShift(shift)}
            >
              <h3 className="text-lg font-semibold text-burgundy">{shift.title}</h3>
              <p className="text-sm text-grayDark">
                {new Date(shift.start).toLocaleString()} – {new Date(shift.end).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedShift && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 shadow-xl w-full max-w-md animate-fadeIn">
            <h3 className="text-xl font-bold mb-2 text-burgundy">{selectedShift.title}</h3>
            <p className="mb-1 text-grayDark">
              <strong>Posted By:</strong> {selectedShift.postedBy.role} ({selectedShift.postedBy.name})
            </p>
            <p className="mb-4 text-grayDark">
              <strong>Time:</strong>{' '}
              {new Date(selectedShift.start).toLocaleString()} – {new Date(selectedShift.end).toLocaleString()}
            </p>

            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <button
                className="bg-teal hover:bg-darkMossGreen text-white px-4 py-2 rounded-lg font-medium transition"
                onClick={() => handleAction('ACCEPT')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition"
                onClick={() => handleAction('DROP')}
              >
                Drop
              </button>
              <button
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium transition"
                onClick={() => handleAction('WAITLIST')}
              >
                Waitlist
              </button>
            </div>

            <button
              className="mt-6 block mx-auto text-sm text-gray-500 hover:text-burgundyLight underline transition"
              onClick={() => setSelectedShift(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

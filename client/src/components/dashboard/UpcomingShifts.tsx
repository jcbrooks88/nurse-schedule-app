import { useEffect, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';

interface Shift {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  status: string; // 'open' | 'pending' | 'approved'
}
interface ShiftRequest {
  shift: { id: string };
  status: string;
}

interface SanitizedShift extends Omit<Shift, 'start' | 'end'> {
  start: Date;
  end: Date;
}

const REQUEST_SHIFT = gql`
  mutation RequestShift($input: ShiftRequestInput!) {
    requestShift(input: $input) {
      id
      status
      shift {
        id
      }
    }
  }
`;

const MY_SHIFT_REQUESTS = gql`
  query {
    myShiftRequests {
      shift {
        id
      }
      status
    }
  }
`;

function sanitizeShifts(shifts: Shift[]): SanitizedShift[] {
  return shifts.map((shift) => ({
    ...shift,
    start: new Date(shift.start),
    end: new Date(shift.end),
  }));
}

export default function UpcomingShifts({ shifts }: { shifts: Shift[] }) {
  const [shiftRequests, setShiftRequests] = useState<Record<string, string>>({});

  const [requestShift] = useMutation(REQUEST_SHIFT, {
    onCompleted: (data) => {
      const { shift, status } = data.requestShift;
      setShiftRequests((prev) => ({ ...prev, [shift.id]: status.toLowerCase() }));
    },
  });

  const { data } = useQuery(MY_SHIFT_REQUESTS);

  useEffect(() => {
    if (data?.myShiftRequests) {
      const map: Record<string, string> = {};
      (data.myShiftRequests as ShiftRequest[]).forEach((req) => {
        map[req.shift.id] = req.status.toLowerCase();
      });
      setShiftRequests(map);
    }
  }, [data]);

  const sanitizedShifts = sanitizeShifts(shifts);

  const handlePickUp = (shiftId: string) => {
    requestShift({ variables: { input: { shiftId } } });
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-grayLight border-b border-grayLighter pb-3 mb-6">
        Upcoming Shifts
      </h2>
      <ul className="space-y-5">
        {sanitizedShifts.length === 0 ? (
          <li className="text-accent italic">No upcoming shifts.</li>
        ) : (
          sanitizedShifts.map((shift) => {
            const isValid =
              shift.start instanceof Date &&
              !isNaN(shift.start.getTime()) &&
              shift.end instanceof Date &&
              !isNaN(shift.end.getTime());

            const requestStatus = shiftRequests[shift.id] || shift.status.toLowerCase();
            const isPending = requestStatus === 'pending';
            const isApproved = requestStatus === 'approved';

            return (
              <li
                key={shift.id}
                className="bg-white/80 rounded-2xl shadow-md border border-accent hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-xl font-medium text-burgundyLight">{shift.title}</div>
                <div className="text-sm text-grayDarker mt-2">
                  {isValid ? (
                    <>
                      {shift.start.toLocaleString()} – {shift.end.toLocaleString()}
                    </>
                  ) : (
                    <span className="text-grayLighter italic">Invalid date</span>
                  )}
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-semibold text-grayDark">Status:</span>{' '}
                  <span className="text-grayDark capitalize">{requestStatus}</span>
                </div>
                <div className="mt-4">
                  {shift.status.toLowerCase() === 'open' && !shiftRequests[shift.id] && (
                    <button
                      onClick={() => handlePickUp(shift.id)}
                      className="bg-teal hover:bg-tealLight/80 text-white py-1 px-4 rounded"
                    >
                      Pick Up
                    </button>
                  )}
                  {isPending && (
                    <span className="text-orange font-semibold italic">Pending approval</span>
                  )}
                  {isApproved && (
                    <span className="text-burgundy font-semibold">
                      Approved - Added to your schedule
                    </span>
                  )}
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

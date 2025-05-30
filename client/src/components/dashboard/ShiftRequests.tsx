import { useMutation, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { GET_SHIFT_REQUESTS } from '../../graphql/queries';
import { CANCEL_SHIFT_REQUEST } from '../../graphql/mutations';

interface Shift {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  status: string;
}

interface ShiftRequest {
  id: string;
  shift: Shift;
  status: string;
}

interface SanitizedShiftRequest extends Omit<ShiftRequest, 'shift'> {
  shift: {
    id: string;
    title: string;
    start: Date;
    end: Date;
    status: string;
  };
}

interface GetShiftRequestsData {
  myShiftRequests: ShiftRequest[];
}

function sanitizeShiftRequests(requests: ShiftRequest[]): SanitizedShiftRequest[] {
  return requests.map((req) => ({
    ...req,
    shift: {
      ...req.shift,
      start: new Date(req.shift.start),
      end: new Date(req.shift.end),
    },
  }));
}

export default function ShiftRequests() {
  const { data, loading, error, refetch } = useQuery<GetShiftRequestsData>(GET_SHIFT_REQUESTS);

  const [cancelRequest, { loading: canceling, error: cancelError, data: cancelData }] =
    useMutation(CANCEL_SHIFT_REQUEST, {
      onCompleted: () => refetch(),
    });

  const handleCancel = async (requestId: string) => {
    try {
      await cancelRequest({ variables: { requestId } });
    } catch (err) {
      console.error(err);
    }
  };

  const sanitizedRequests = useMemo(() => {
    const requests = data?.myShiftRequests ?? [];
    return sanitizeShiftRequests(requests);
  }, [data?.myShiftRequests]);

  return (
    <section className="mb-12 px-4">
      <h2 className="text-2xl font-semibold text-grayLight border-b border-grayLighter pb-3 mb-6">
        Your Shift Requests
      </h2>

      {loading ? (
        <p className="text-grayDark">Loading your requests...</p>
      ) : error ? (
        <>
        {console.error('Shift request error:', error)}
        <p className="text-errorRed">Error loading shift requests.</p>
      </>
      ) : (
        <ul className="space-y-5">
          {sanitizedRequests.length === 0 ? (
            <li className="text-orange italic">No requests submitted.</li>
          ) : (
            sanitizedRequests.map((req) => {
              const { shift } = req;
              const isValid =
                shift.start instanceof Date &&
                !isNaN(shift.start.getTime()) &&
                shift.end instanceof Date &&
                !isNaN(shift.end.getTime());

              return (
                <li
                  key={req.id}
                  className="bg-white/80 rounded-2xl shadow-md border border-accent hover:shadow-lg transition-shadow p-6"
                >
                  <div className="text-xl font-medium text-burgundyLight">{shift.title}</div>
                  <div className="text-sm text-grayDarker mt-1">
                    {isValid ? (
                      <>
                        {shift.start.toLocaleString()} – {shift.end.toLocaleString()}
                      </>
                    ) : (
                      <span className="text-grayLighter italic">Invalid date</span>
                    )}
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="font-semibold text-grayDark">Request Status:</span>{' '}
                    <span className="text-grayDark capitalize">{req.status}</span>
                  </div>

                  {req.status.toLowerCase() !== 'cancelled' && (
                    <button
                      onClick={() => handleCancel(req.id)}
                      disabled={canceling}
                      className="mt-4 bg-errorRed text-white bg-burgundyLight px-4 py-2 rounded hover:bg-burgundy transition-colors disabled:opacity-60"
                    >
                      {canceling ? 'Cancelling...' : 'Cancel Request'}
                    </button>
                  )}

                  {cancelData?.cancelShiftRequest?.id === req.id && (
                    <p className="mt-2 text-successGreen text-sm">Request cancelled!</p>
                  )}

                  {cancelError && (
                    <p className="mt-2 text-errorRed text-sm">
                      Error: {cancelError.message}
                    </p>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}
    </section>
  );
}

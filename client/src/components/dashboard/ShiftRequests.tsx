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

export default function ShiftRequests({ requests }: { requests: ShiftRequest[] }) {
  const sanitizedRequests = sanitizeShiftRequests(requests);

  return (
    <section>
      <h2 className="text-xl font-semibold text-grayLight border-b-2 border-grayLighter pb-2 mb-4">
        Shift Requests
      </h2>
      <ul className="space-y-4">
        {sanitizedRequests.length === 0 ? (
          <li className="text-orange italic">No requests submitted.</li>
        ) : (
          sanitizedRequests.map((req) => {
            const isValid =
              req.shift.start instanceof Date &&
              !isNaN(req.shift.start.getTime()) &&
              req.shift.end instanceof Date &&
              !isNaN(req.shift.end.getTime());

            return (
              <li
                key={req.id}
                className="bg-lightBeige rounded-xl shadow-card border border-accent hover:shadow-md transition-shadow p-5"
              >
                <div className="text-lg font-semibold text-burgundyLight">{req.shift.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  {isValid ? (
                    <>
                      {req.shift.start.toLocaleString()} – {req.shift.end.toLocaleString()}
                    </>
                  ) : (
                    <span className="text-orangeLight italic">Invalid date</span>
                  )}
                </div>
                <div className="mt-2 text-sm">
                  <span className="font-medium text-grayDark ">Request Status:</span>{' '}
                  <span className="text-grayDark">{req.status}</span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

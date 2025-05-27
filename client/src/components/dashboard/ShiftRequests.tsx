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
      status: req.shift.status,
      id: req.shift.id,
      title: req.shift.title,
    },
  }));
}

export default function ShiftRequests({ requests }: { requests: ShiftRequest[] }) {
  const sanitizedRequests = sanitizeShiftRequests(requests);

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold text-grayLight border-b border-grayLighter pb-3 mb-6">
        Shift Requests
      </h2>
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
                className="bg-lightBeige rounded-2xl shadow-md border border-accent hover:shadow-lg transition-shadow p-6"
              >
                <div className="text-xl font-medium text-burgundyLight">{shift.title}</div>
                <div className="text-sm text-grayDarker mt-2">
                  {isValid ? (
                    <>
                      {shift.start.toLocaleString()} – {shift.end.toLocaleString()}
                    </>
                  ) : (
                    <span className="text-orangeLight italic">Invalid date</span>
                  )}
                </div>
                <div className="mt-3 text-sm">
                  <span className="font-semibold text-grayDark">Request Status:</span>{' '}
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

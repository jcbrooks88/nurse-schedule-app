interface Shift {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  status: string;
}

// SanitizedShift has start and end guaranteed to be Date objects
interface SanitizedShift extends Omit<Shift, 'start' | 'end'> {
  start: Date;
  end: Date;
}

// Convert any string dates to Date objects
function sanitizeShifts(shifts: Shift[]): SanitizedShift[] {
  return shifts.map((shift) => ({
    ...shift,
    start: new Date(shift.start),
    end: new Date(shift.end),
  }));
}

export default function UpcomingShifts({ shifts }: { shifts: Shift[] }) {
  const sanitizedShifts = sanitizeShifts(shifts);

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold text-orange border-b-2 border-teal pb-2 mb-4">
        Upcoming Shifts
      </h2>
      <ul className="space-y-4">
        {sanitizedShifts.length === 0 ? (
          <li className="text-accent italic">No upcoming shifts.</li>
        ) : (
          sanitizedShifts.map((shift) => {
            // Check if start and end are valid dates
            const isValid =
              shift.start instanceof Date &&
              !isNaN(shift.start.getTime()) &&
              shift.end instanceof Date &&
              !isNaN(shift.end.getTime());

            return (
              <li
                key={shift.id}
                className="bg-card rounded-xl shadow-card border border-accent hover:shadow-md transition-shadow p-5"
              >
                <div className="text-lg font-semibold text-burgundy">
                  {shift.title}
                </div>

                <div className="text-sm text-gray-600 mt-1">
                  {isValid ? (
                    <>
                      {shift.start.toLocaleString()} – {shift.end.toLocaleString()}
                    </>
                  ) : (
                    <span className="text-red-500 italic">Invalid date</span>
                  )}
                </div>

                <div className="mt-2 text-sm">
                  <span className="font-medium text-teal">Status:</span>{' '}
                  <span className="text-grayDark">{shift.status}</span>
                </div>
              </li>
            );
          })
        )}
      </ul>
    </section>
  );
}

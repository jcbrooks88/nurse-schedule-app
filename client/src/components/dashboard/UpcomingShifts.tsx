interface Shift {
  id: string;
  title: string;
  start: string | Date;
  end: string | Date;
  status: string;
}

interface SanitizedShift extends Omit<Shift, 'start' | 'end'> {
  start: Date;
  end: Date;
}

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

            return (
              <li
                key={shift.id}
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
                  <span className="font-semibold text-grayDark">Status:</span>{' '}
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

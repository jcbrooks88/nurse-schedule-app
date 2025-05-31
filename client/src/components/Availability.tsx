import { useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import { GET_AVAILABILITY } from '../graphql/queries';
import { SET_AVAILABILITY } from '../graphql/mutations';
import '../App.css';

type Availability = {
  date: string;
  isAvailable: boolean;
};

const AvailabilityCalendar = ({ userId }: { userId: string }) => {
  const month = format(new Date(), 'yyyy-MM');

  const { data } = useQuery(GET_AVAILABILITY, {
    variables: { userId, month },
  });

  const [setAvailability] = useMutation(SET_AVAILABILITY, {
    refetchQueries: ['GetAvailability'],
  });

  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [initialAvailable, setInitialAvailable] = useState<string[]>([]);
  const [hasChanges, setHasChanges] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    if (data?.getAvailability) {
      try {
        const available = data.getAvailability
          .filter((a: Availability) => a.isAvailable)
          .map((a: Availability) => {
            const parsed = new Date(a.date);
            return isNaN(parsed.getTime()) ? null : parsed;
          })
          .filter((d): d is Date => d !== null);

        setSelectedDates(available);
        setInitialAvailable(
          available.map((d) => {
            try {
              return format(d, 'yyyy-MM-dd');
            } catch {
              console.warn('Error formatting date:', d);
              return '';
            }
          }).filter(Boolean)
        );
      } catch (err) {
        console.error('Error processing availability data:', err);
      }
    }
  }, [data]);

  const handleDayClick = (day: Date) => {
    try {
      const formatted = format(day, 'yyyy-MM-dd');
      const exists = selectedDates.find(d => format(d, 'yyyy-MM-dd') === formatted);

      const updatedDates = exists
        ? selectedDates.filter(d => format(d, 'yyyy-MM-dd') !== formatted)
        : [...selectedDates, day];

      setSelectedDates(updatedDates);
      setHasChanges(true);
      debouncedSave(updatedDates);
    } catch (err) {
      console.error('Error handling day click:', err);
    }
  };

  const saveAvailability = useCallback(
    async (dates: Date[]) => {
      try {
        const current = dates.map(d => {
          try {
            return format(d, 'yyyy-MM-dd');
          } catch {
            console.warn('Invalid date encountered in saveAvailability:', d);
            return null;
          }
        }).filter((d): d is string => d !== null);

        const toAdd = current.filter(date => !initialAvailable.includes(date));
        const toRemove = initialAvailable.filter(date => !current.includes(date));

        await Promise.all([
          ...toAdd.map(date =>
            setAvailability({ variables: { date, isAvailable: true } })
          ),
          ...toRemove.map(date =>
            setAvailability({ variables: { date, isAvailable: false } })
          ),
        ]);

        setInitialAvailable(current);
        setHasChanges(false);
        setSuccessMessage('Availability updated successfully');

        // Clear success message after 3 seconds
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        console.error('Failed to update availability:', err);
      }
    },
    [initialAvailable, setAvailability]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSave = useCallback(debounce(saveAvailability, 1000), [saveAvailability]);

  return (
    <div className="w-full mt-8">
      <div className="flex justify-center">
        <div className="bg-white rounded-xl border border-accent shadow-card hover:shadow-md transition-shadow p-6">
          <h2 className="text-xl font-bold text-burgundyLight mb-4 text-center">
            Your Availability Calendar
          </h2>
          <DayPicker
            mode="multiple"
            selected={selectedDates}
            onDayClick={handleDayClick}
            month={(() => {
              try {
                return new Date(month + '-01');
              } catch (err) {
                console.error('Error parsing month for DayPicker:', err);
                return new Date(); // fallback to current date
              }
            })()}
            className="text-sm text-grayDarker"
            styles={{
              caption: { color: '#4b4b4b', fontWeight: '500' },
              day: {
                borderRadius: '8px',
                padding: '0.5rem',
              },
              selected: {
                backgroundColor: '#14b8a6',
                color: 'white',
              },
            }}
          />
          {hasChanges && (
            <p className="text-center text-sm mt-3 text-tealLight">
              Saving changes...
            </p>
          )}
          {successMessage && (
            <p className="text-center text-sm mt-3 text-teal font-semibold">
              {successMessage}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

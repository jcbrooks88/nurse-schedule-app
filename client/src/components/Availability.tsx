import { useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { GET_AVAILABILITY } from '../graphql/queries';
import { SET_AVAILABILITY } from '../graphql/mutations';
import "../App.css";

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

  const handleDayClick = async (day: Date) => {
    const formatted = format(day, 'yyyy-MM-dd');
    const match = data?.getAvailability?.find(
      (a: Availability) => format(new Date(a.date), 'yyyy-MM-dd') === formatted
    );

    await setAvailability({
      variables: {
        date: formatted,
        isAvailable: match ? !match.isAvailable : true,
      },
    });
  };

  const availableDates =
    data?.getAvailability
      ?.filter((a: Availability) => a.isAvailable)
      ?.map((a: Availability) => new Date(a.date)) || [];

  return (
    <div className="w-full mt-8">
      <div className="flex justify-center">
        <div className="bg-white rounded-xl border border-accent shadow-card hover:shadow-md transition-shadow p-6">
          <h2 className="text-xl font-bold text-burgundyLight mb-4 text-center">
            Your Availability Calendar
          </h2>
          <DayPicker
            mode="multiple"
            selected={availableDates}
            onDayClick={handleDayClick}
            month={new Date(month + '-01')}
            className="text-sm text-grayDarker"
            styles={{
              caption: { color: '#4b4b4b', fontWeight: '500' },
              day: {
                borderRadius: '8px',
                padding: '0.5rem',
                color: '#2c5e5b',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;

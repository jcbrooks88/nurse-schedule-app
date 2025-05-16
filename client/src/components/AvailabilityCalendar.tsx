import { useMutation, useQuery } from '@apollo/client';
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { GET_AVAILABILITY, SET_AVAILABILITY } from '../graphql/queries';

type Availability = {
  date: string;
  isAvailable: boolean;
};

const AvailabilityCalendar = ({ userId }: { userId: string }) => {
  // Removed unused selected state
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

    // Removed setSelected(day) as selected state is not used
  };

  const availableDates =
    data?.getAvailability
      ?.filter((a: Availability) => a.isAvailable)
      ?.map((a: Availability) => new Date(a.date)) || [];

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Your Availability</h2>
      <DayPicker
        mode="multiple"
        selected={availableDates}
        onDayClick={handleDayClick}
        month={new Date(month + '-01')}
      />
    </div>
  );
};

export default AvailabilityCalendar;

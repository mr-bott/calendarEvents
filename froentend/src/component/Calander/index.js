
import * as React from 'react';
import dayjs from 'dayjs';
import Badge from '@mui/material/Badge';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DayCalendarSkeleton } from '@mui/x-date-pickers/DayCalendarSkeleton';
import { PickersDay } from '@mui/x-date-pickers/PickersDay';
import { FaCheck } from "react-icons/fa";
import EventList from '../EventsList'; // Import your events component
import Cookies from 'js-cookie'; // For cookies


function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth && highlightedDays.includes(day.format('YYYY-MM-DD'));

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? <FaCheck /> : undefined}
    >
      <div style={{ position: 'relative' }}>
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </div>
    </Badge>
  );
}

export default function Calendar() {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [highlightedDays, setHighlightedDays] = React.useState([]);
  const [events, setEvents] = React.useState({});
  const [loadingEvents, setLoadingEvents] = React.useState(true);
  const [selectedDate, setSelectedDate] = React.useState(dayjs(new Date()));

  const fetchEvents = async () => {
    const userId = Cookies.get('userId');
    if (!userId) {
      console.error('User ID not found in cookies');
      setLoadingEvents(false);
      return;
    }

    try {
      const url=process.env.REACT_APP_BACKEND_URL
    
      const response = await fetch(`${url}/events/${userId}`);
      const data = await response.json();
      const formattedEvents = data.reduce((acc, event) => {
        const dateKey = event.event_date.split('T')[0];
        const eventStatus = event.status || 'pending';
        acc[dateKey] = acc[dateKey] ? [...acc[dateKey], { ...event, status: eventStatus }] : [{ ...event, status: eventStatus }];
        return acc;
      }, {});

      setEvents(formattedEvents); // Store events in state
      setHighlightedDays(Object.keys(formattedEvents)); // Store full date strings (YYYY-MM-DD) in highlightedDays
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setIsLoading(false)
      setLoadingEvents(false); // Stop loading indicator
    }
  };

  React.useEffect(() => {
    fetchEvents();
    return () => requestAbortController.current?.abort(); // Abort request on unmount
  }, []);

  const handleMonthChange = (date) => {
    // No need to fetch events again unless you want to
  };

  const handleDaySelect = (newValue) => {
    setSelectedDate(newValue);
  };

  const fetchDataOnChangedData = () => {
    fetchEvents();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
     
      {isLoading || loadingEvents ? (
        <DayCalendarSkeleton />
      ) : (
        <DateCalendar
          defaultValue={dayjs(new Date())}
          loading={isLoading}
          orientation="landscape"
          onMonthChange={handleMonthChange}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
          onChange={handleDaySelect}
        />
      )}

      <EventList
        selectedDate={selectedDate.format('YYYY-MM-DD')}
        events={events}
        fetchDataOnChangedData={fetchDataOnChangedData}
      />
    </LocalizationProvider>
  );
}

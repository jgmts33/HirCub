import React, { useCallback, useEffect, useRef, useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { setEvents } from '~/actions/calendar';
import {
  useGetEventsFetchOnce,
  useGetAllEventsRequest,
} from '~/hooks/requests';
import { Eventcalendar } from '@mobiscroll/react';
import Events from './events';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import './calendar.scss';
import { Button } from '../ui';
import moment from 'moment';
import Loader from '../Loader';

function CalendarWrapper(props) {
  const [fetchEventsErrors] = useGetEventsFetchOnce((events) =>
    dispatch(
      setEvents(
        events.map((e) => {
          const { title, ...rest } = e;
          return {
            ...rest,
            text: title,
          };
        })
      )
    )
  );

  const { fetchAllEventErrors, sendRequest } = useGetAllEventsRequest(
    (items) => {
      var result = [];
      for (var key in items) {
        const res = items[key].map((e) => {
          const { title, ...rest } = e;
          return {
            ...rest,
            text: title,
          };
        });

        result = result.concat(res);
      }
      dispatch(setEvents(result));
      setLoading(false);
    }
  );

  const {
    calendar: { events },
  } = useAppState();
  const dispatch = useAppDispatch();
  const calendarRef = useRef();
  const dayCalendarRef = useRef();
  const [load] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const pathParams = window.location.pathname.split(['/']);
    const urlPath = pathParams[1];
    const dateParam = pathParams[2];
    if (dateParam) {
      const m = moment(dateParam + 'T00:00:00');
      if (m.isValid() === true) {
        const date = new Date(m);
        if (currentDate != date) {
          dayCalendarRef.current.instance.setDate(date);
          calendarRef.current.instance.setDate(date);
          setCurrentDate(dateParam);
        }
      }
      window.history.replaceState(null, '', '/' + urlPath);
    }
  }, [load]);

  const navigate = useCallback(function navigate(inst, val) {
    if (inst) {
      inst.navigate(val);
    }
  }, []);

  const preventSet = useRef(false);

  const handleSetDate = useCallback(
    function handleSetDate(event) {
      if (!preventSet.current === true && dayCalendarRef.current != undefined) {
        navigate(dayCalendarRef.current.instance, event.date);
      }
      preventSet.current = false;
    },
    [preventSet, navigate]
  );

  const handlePageChange = useCallback(
    function handlePageChange(event) {
      preventSet.current = true;
      navigate(calendarRef.current.instance, event.firstDay);
    },
    [preventSet, navigate]
  );

  const onViewAllEvents = () => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    sendRequest();
  };

  return (
    <div>
      <div className="text-right mr-10 mb-10">
        <Button kind="full-blue" onClick={onViewAllEvents}>
          View events from all users
        </Button>
      </div>
      <div className="calendar-container">
        <div className="calendar-wrapper">
          {((fetchEventsErrors && fetchEventsErrors.length > 0) ||
            (fetchAllEventErrors && fetchAllEventErrors.length > 0)) && (
              <div style={{ color: '#f00' }}>{fetchEventsErrors[0]}</div>
            )}
          <Eventcalendar
            ref={calendarRef}
            theme="ios"
            display="inline"
            calendarHeight={513}
            view={{
              calendar: {
                labels: true,
                popover: true,
              },
            }}
            data={events}
            onSetDate={handleSetDate}
            min={new Date()}
          />
        </div>
        <div className="events-wrapper">
          <Events
            calendarRef={calendarRef}
            dayCalendarRef={dayCalendarRef}
            events={events}
            preventSet={preventSet}
            navigate={navigate}
            handlePageChange={handlePageChange}
            isAdd={props.isAdd}
            setIsAdd={props.setIsAdd}
            disabled={isLoading}
          />
        </div>
      </div>
      {isLoading && <Loader />}
    </div>
  );
}

export default CalendarWrapper;

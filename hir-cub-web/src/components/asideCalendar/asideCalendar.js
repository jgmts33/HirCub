import React, { useCallback, useRef, useState } from 'react';
import useAppState, { useAppDispatch } from '~/appState';
import { setEvents } from '~/actions/calendar';
import { useGetEventsFetchOnce } from '~/hooks/requests';
import { Eventcalendar } from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import './asideCalendar.scss';
import Feedback from '../Feedback';

import { ReactComponent as Calendar } from '~/assets/svg/Calendar.svg';
import { ReactComponent as EditEvent } from '~/assets/svg/EditEvent.svg';
import { formatDateMMMM, formatDateYMD } from '~/consts';

import { PermissionType } from '~/consts';
import { usePermission } from '~/hooks';

function AsideCalendar(props) {
  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.Calendar
  );
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
  const {
    calendar: { events },
  } = useAppState();

  const dispatch = useAppDispatch();
  const calendarRef = useRef();
  const dayCalendarRef = useRef();
  const preventSet = useRef(false);

  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventDay, setEventDay] = useState(currentDate.getDate());
  const [eventMonth, setEventMonth] = useState(formatDateMMMM(currentDate));

  const { onView, onAddEvent } = props;

  const navigate = useCallback(function navigate(inst, val) {
    if (inst) {
      inst.navigate(val);
    }
  }, []);

  const handleSetDate = useCallback(
    function handleSetDate(event) {
      if (!preventSet.current === true) {
        navigate(dayCalendarRef.current.instance, event.date);
        updateDate(event.date);
      }
      preventSet.current = false;
    },
    [preventSet, navigate]
  );

  // function

  const movePrevDate = () => {
    currentDate.setDate(currentDate.getDate() - 1);
    dayCalendarRef.current.instance.setDate(currentDate);
    calendarRef.current.instance.setDate(currentDate);

    updateDate(currentDate);
  };

  const moveNextDate = () => {
    currentDate.setDate(currentDate.getDate() + 1);
    dayCalendarRef.current.instance.setDate(currentDate);
    calendarRef.current.instance.setDate(currentDate);

    updateDate(currentDate);
  };

  const updateDate = (date) => {
    setEventDay(date.getDate());
    setEventMonth(formatDateMMMM(date));
    setCurrentDate(date);
  };

  return (
    <div className="aside">
      <div className="aside-container">
        <div className="aside-block-date">
          <div
            className="gallery-arrow-left"
            onClick={movePrevDate}
            role="button"
            tabIndex={0}
          />
          <div className="aside-date">
            <div className="aside-date-number">{eventDay}</div>
          </div>
          <div
            className="gallery-arrow-right"
            onClick={moveNextDate}
            role="button"
            tabIndex={0}
          />
        </div>

        <div className="aside-calendar">
          <div className="aside-calendar-block">
            <Eventcalendar
              ref={dayCalendarRef}
              data={events}
              showOuterDays={false}
            />

            <Eventcalendar
              ref={calendarRef}
              theme="ios"
              display="inline"
              view={{
                calendar: {
                  marked: true,
                  popover: true,
                },
              }}
              data={events}
              onSetDate={handleSetDate}
              showOuterDays={false}
            />

            <Eventcalendar
              ref={dayCalendarRef}
              theme="ios"
              display="inline"
              view={{
                eventList: { type: 'day' },
              }}
              data={events}
              showOuterDays={false}
            />
          </div>
          <div className="aside-calendar-buttons">
            <button
              type="button"
              className="btn -blue-btn"
              onClick={() => {
                onView(formatDateYMD(currentDate));
              }}
            >
              <Calendar />
              View
            </button>
            {(!isImpersonationMode || isWriteAllowed) && (
              <button
                type="button"
                className="btn -blue-btn"
                onClick={() => {
                  onAddEvent(formatDateYMD(currentDate));
                }}
              >
                <EditEvent />
                Add Event
              </button>
            )}
          </div>
        </div>
      </div>
      <Feedback />
    </div>
  );
}

export default AsideCalendar;

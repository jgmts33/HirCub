import React, { useState, useMemo, useEffect } from 'react';
import { useAppDispatch } from '~/appState';

import { toast } from 'react-toastify';
import { Eventcalendar } from '@mobiscroll/react';

import { Button } from '~/components/ui';
import CreateEventForm from './createEventForm';

import { addEvent, setCurrentEventsIds } from '~/actions/calendar';
import { useCreateEventRequest } from '~/hooks/requests';
import { PermissionType } from '~/consts';
import { usePermission } from '~/hooks';

import './events.scss';

function Events(props) {
  const {
    calendarRef,
    dayCalendarRef,
    events,
    handlePageChange,
    isAdd,
    setIsAdd,
    disabled,
  } = props;
  const { isImpersonationMode, isWriteAllowed } = usePermission(
    PermissionType.Calendar
  );

  const [showExistingEvents, setShowExistingEvents] = useState(!isAdd);
  const { errors, sendRequest } = useCreateEventRequest(handleSubmitSuccess);
  const [isLoading, setLoading] = useState(false);
  // const { errors, sendRequest: sendDeleteRequest } = useDeleteEventRequest(handleDeleteSubmitSuccess);
  const dispatch = useAppDispatch();
  // function handleDeleteSubmitSuccess(event) {}
  function handleSubmitSuccess(event) {
    const { title, ...rest } = event;
    dispatch(
      addEvent({
        ...rest,
        text: title,
      })
    );
    const currentEvents = calendarRef.current.instance.getEvents(
      calendarRef.current.instance.getDate()
    );
    const currentEventIds = currentEvents.map((event) => event.id);
    dispatch(setCurrentEventsIds(currentEventIds));
    handleAddCancelEvent(true);
    setLoading(false);
    toast.success('Event has been added to your calendar.');
  }
  function handleSubmit(formData) {
    if (disabled || isLoading) {
      return;
    }
    setLoading(true);
    sendRequest(formData);
  }
  const dailyEvents = useMemo(() => {
    return events.map((event) => ({
      ...event,
      text: `<div style="display: flex; flex-direction: column"><span style="font-size: 1rem; font-weight: bold">${event.text}</span><span>${event.description}</span></div>`,
    }));
  }, [events]);

  const handleAddCancelEvent = (isCancel) => {
    if (disabled || isLoading) {
      return;
    }
    setShowExistingEvents(isCancel);
    setIsAdd(!isCancel);

    const pathName = isCancel ? '/calendar' : '/calendar_add';

    window.history.pushState(null, '', `${pathName}`);
  };

  useEffect(() => {
    setShowExistingEvents(!isAdd);
  }, [isAdd]);

  return (
    <div className="">
      <div style={{ display: showExistingEvents ? '' : 'none' }}>
        <Eventcalendar
          ref={dayCalendarRef}
          theme="ios"
          display="inline"
          view={{
            eventList: { type: 'day' },
          }}
          data={dailyEvents}
          onPageChange={handlePageChange}
          min={new Date()}
        />
        <div className="mt-10 text-center">
          {(!isImpersonationMode || isWriteAllowed) && (
            <Button kind="purpure" onClick={() => handleAddCancelEvent(false)}>
              Add event
            </Button>
          )}
        </div>
      </div>
      {!showExistingEvents && dayCalendarRef.current != null && (
        <div>
          <CreateEventForm
            errors={errors}
            startDate={
              dayCalendarRef.current != null
                ? dayCalendarRef.current.instance.getDate()
                : new Date()
            }
            handleSubmit={handleSubmit}
            cancelEvent={() => handleAddCancelEvent(true)}
          />
        </div>
      )}
    </div>
  );
}

export default Events;

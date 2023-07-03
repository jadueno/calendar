import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Navbar, CalendarEvent, CalendarModal } from "../components";
import { localizer } from "../../helpers";
import { useState } from "react";
import { useUiStore, useCalendarStore, Event } from "../../hooks";

export const CalendarPage = () => {
  const { openDateModal } = useUiStore();
  const { events, setActiveEvent } = useCalendarStore();

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "week"
  );

  const eventStyleGetter = () => {
    const style = {
      backgroundColor: "#5045e5",
    };

    return { style };
  };

  const onSelect = (event: Event) => {
    setActiveEvent(event);
    openDateModal();
  };

  const onViewChanged = (event: Event) => {
    localStorage.setItem("lastView", event);
    setLastView(event);
  };
  return (
    <>
      <Navbar />

      <Calendar
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 72px)" }}
        eventPropGetter={eventStyleGetter}
        components={{ event: CalendarEvent }}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
    </>
  );
};

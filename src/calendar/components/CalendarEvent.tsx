type CalendarEventProps = {
  event: { title: string; notes: string };
};

export const CalendarEvent: React.FC<CalendarEventProps> = ({ event }) => {
  const { title, notes } = event;

  return (
    <>
      <strong>{title}</strong> {notes && <span> - {notes}</span>}
    </>
  );
};

import { addHours } from "date-fns";
import { Link } from "../../components";
import { useUiStore, useCalendarStore } from "../../hooks";

export const AddEvent = () => {
  const { openDateModal } = useUiStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user: {
        _id: "123",
        name: "Fernando",
      },
    });
    openDateModal();
  };

  return (
    <Link onClick={handleClickNew} dark>
      <i className="fas fa-plus"></i> Create event
    </Link>
  );
};

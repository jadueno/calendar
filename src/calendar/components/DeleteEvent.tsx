import { Link } from "../../components";
import { useCalendarStore, useUiStore } from "../../hooks";

export const DeleteEvent = () => {
  const { startDeletingEvent } = useCalendarStore();
  const { closeDateModal } = useUiStore();

  const handleClickDelete = () => {
    startDeletingEvent();
    closeDateModal();
  };

  return (
    <div className="text-center mt-2">
      <Link
        onClick={handleClickDelete}
        classList="text-sm text-red-600 hover:text-red-800"
      >
        Delete event
      </Link>
    </div>
  );
};

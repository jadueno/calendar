import { useEffect, useMemo, useState, ChangeEvent } from "react";
import { addHours, differenceInSeconds } from "date-fns";
import { Input, Label, TextArea, Button, Subtitle } from "../../components";
import { useUiStore, useCalendarStore } from "../../hooks";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Modal from "react-modal";
import DatePicker from "react-datepicker";
import { DateOrString } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { DeleteEvent } from "./DeleteEvent";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#root");

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const { activeEvent, startSavingEvent } = useCalendarStore();

  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: "",
    notes: "",
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleError = useMemo(() => {
    if (!formSubmitted) {
      return false;
    }

    return formValues.title.length <= 0 ? true : false;
  }, [formValues.title, formSubmitted]);

  useEffect(() => {
    if (activeEvent !== null) {
      setFormValues({ ...activeEvent });
    }
  }, [activeEvent]);

  const onInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  const onDateChanged = (date: DateOrString, changing: string) => {
    setFormValues({
      ...formValues,
      [changing]: date,
    });
  };

  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormSubmitted(true);

    const difference = differenceInSeconds(formValues.end, formValues.start);

    if (isNaN(difference) || difference <= 0) {
      Swal.fire("Incorrect dates", "Dates need to be checked", "error");
      return;
    }

    if (formValues.title.length <= 0) {
      Swal.fire("Title", "You need to create one", "error");
      return;
    }

    await startSavingEvent(formValues);
    closeDateModal();
    setFormSubmitted(false);
  };

  return (
    <Modal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className="modal"
      overlayClassName="modal-fondo"
      closeTimeoutMS={200}
    >
      <Subtitle content="Información del evento" />
      <hr className="my-2"></hr>
      <form className="container" onSubmit={onSubmit}>
        <div className="form-group mb-2">
          <Label content="Start date and time" />
          <DatePicker
            selected={formValues.start}
            onChange={(event: DateOrString) => onDateChanged(event, "start")}
            dateFormat="Pp"
            showTimeSelect
            className="border text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500"
          />
        </div>

        <div className="form-group mb-2">
          <Label content="End date and time" />
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            onChange={(event: DateOrString) => onDateChanged(event, "end")}
            dateFormat="Pp"
            showTimeSelect
            className="border text-gray-900 sm:text-sm rounded-lg focus:border-primary-600 block w-full p-2.5 border-gray-600 placeholder-gray-400 focus:border-blue-500"
          />
        </div>

        <div className="form-group mb-2">
          <Label content="Titulo" />
          <Input
            type="text"
            name="title"
            placeholder="Event title"
            value={formValues.title}
            error={titleError}
            onChange={onInputChanged}
          />
        </div>

        <div className="form-group mb-2">
          <Label content="Additional Information" />
          <TextArea
            className="form-control"
            placeholder="Notes"
            name="notes"
            value={formValues.notes}
            onChange={onInputChanged}
          ></TextArea>
        </div>

        <Button type="submit" content="Save" icon="far fa-save" />
        <DeleteEvent />
      </form>
    </Modal>
  );
};

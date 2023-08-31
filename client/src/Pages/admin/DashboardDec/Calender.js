import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
const Calender = () => {
  const [date, setDate] = useState(new Date());

  return (
    <div className="calendar-container p">
      <Calendar onChange={setDate} value={date} />
    </div>
  );
};

export default Calender;

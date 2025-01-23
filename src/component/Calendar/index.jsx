import { useState } from "react";

export default function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleDateClick = (date) => {
    if (!selectedRange.from || (selectedRange.from && selectedRange.to)) {
      setSelectedRange({ from: date, to: null });
    } else {
      const newRange = { from: selectedRange.from, to: date };
      if (newRange.from > newRange.to) {
        newRange.from = date;
        newRange.to = selectedRange.from;
      }
      setSelectedRange(newRange);
    }
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const isDateInRange = (date, range) => {
    if (!range.from || !range.to) return false;
    return date > range.from && date < range.to;
  };

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = new Date(year, month, 1).getDay();
    const calendarDays = [];

    // Padding for days of the week before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      calendarDays.push(
        <div
          key={`empty-${i}`}
          className="w-13 h-13 sm:h-10 sm:w-10 bg-white border border-natural-charcoal/40"
        ></div>,
      );
    }

    // Actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isFromDate =
        selectedRange.from &&
        selectedRange.from.getDate() === day &&
        selectedRange.from.getMonth() === month &&
        selectedRange.from.getFullYear() === year;
      const isToDate =
        selectedRange.to &&
        selectedRange.to.getDate() === day &&
        selectedRange.to.getMonth() === month &&
        selectedRange.to.getFullYear() === year;
      const isInRange = isDateInRange(date, selectedRange);

      calendarDays.push(
        <div
          key={day}
          className={`w-13 h-13 sm:h-10 sm:w-10 flex items-center justify-center cursor-pointer border border-natural-charcoal/40  
            ${isFromDate || isToDate ? "bg-golden-yellow" : ""} 
            ${isInRange ? "bg-golden-yellow/20" : ""} 
            ${!isFromDate && !isToDate && !isInRange ? "bg-white hover:bg-blue-100" : ""}`}
          onClick={() => handleDateClick(date)}
        >
          {day}
        </div>,
      );
    }

    return calendarDays;
  };

  const formatDate = (date) => {
    return date
      ? `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`
      : "--";
  };

  return (
    <div className="bg-light-sky-blue flex justify-center pb-10 shadow-md shadow-natural-charcoal/40">
      <div className=" p-5 sm:px-0 flex flex-col gap-5 max-w-100">
        {/* Header */}
        <div className="flex justify-center sm:items-center gap-4 flex-wrap">
          <div className="bg-white rounded-full h-8 w-8">
            <button onClick={prevMonth}>
              <img
                src="/circle-right-sharp-solid.svg"
                alt=""
                className="h-8 rotate-180"
              />
              <span className="sr-only">previous</span>
            </button>
          </div>
          <div className="font-serif font-bold uppercase bg-white py-2 rounded-full w-48 sm:w-40 text-center leading-none border border-natural-charcoal/40">
            {currentDate.toLocaleString("default", { month: "long" })}{" "}
            {currentDate.getFullYear()}
          </div>
          <div className="bg-white rounded-full h-8 w-8">
            <button onClick={nextMonth}>
              <img src="/circle-right-sharp-solid.svg" alt="" className="h-8" />
              <span className="sr-only">next</span>
            </button>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center">
          <div className="grid  grid-cols-7">{renderCalendar()}</div>
        </div>

        {/* Selected Range */}
        <div className="bg-white border border-natural-charcoal/40">
          <div className="text-sm-leading-none font-bold p-2.5">
            <span>You picked:</span>
          </div>
          <div className="flex justify-center pb-5 text-xl-leading-none">
            {formatDate(selectedRange.from)} - {formatDate(selectedRange.to)}
          </div>
        </div>
        <div className="mx-auto">
          <button className="font-serif font-black capitalize text-white bg-deep-blue text-3xl-leading-none px-7.5 py-3.75 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90">
            book now
          </button>
        </div>
      </div>
    </div>
  );
}

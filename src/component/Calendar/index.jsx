/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../js/store/useAuthStore";
import useUIStore from "../../js/store/useUIStore";

/**
 * Renders an interactive calendar component for booking purposes.
 *
 * This component displays a monthly calendar that allows users to select a date range for booking a venue.
 * It provides navigation to move between months and handles various interactions including:
 * - Selecting a start and end date for the booking.
 * - Preventing selection of past or blocked dates.
 * - Resetting the selection with the "Escape" key.
 * - Validating that the selected range does not include disabled dates.
 * - Formatting the selected date range for URL parameters.
 *
 * When the "book now" button is clicked, the component checks if the user is logged in:
 * - If not logged in, it opens a login modal and defers the booking until login is complete.
 * - If logged in and a valid date range is selected, it navigates to the booking page with formatted dates.
 *
 * The component also displays weekday headers and uses dynamic styling to indicate selected dates,
 * dates in the current range, and disabled dates. It relies on various hooks and external stores:
 * - `useState` and `useEffect` for managing state and side effects.
 * - `useNavigate` from React Router for navigation.
 * - Custom hooks `useAuthStore` and `useUIStore` for authentication and UI state management.
 *
 * @component
 * @param {object} props - The component props.
 * @param {Array} props.data - An array of booking objects, each containing `dateFrom` and `dateTo` to denote blocked dates.
 * @param {string|number} props.venueId - The unique identifier for the venue, used to generate booking URLs.
 *
 * @example
 * // Example usage:
 * <Calendar data={bookings} venueId="12345" />
 *
 * @returns {JSX.Element} The rendered Calendar component with date selection and booking functionality.
 */
export default function Calendar({ data, venueId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    from: null,
    to: null,
  });
  const navigate = useNavigate();
  const { isLoggedIn } = useAuthStore();
  const { openStateWithOverlay } = useUIStore();
  const [waitingForLogin, setWaitingForLogin] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setSelectedRange({ from: null, to: null });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const nextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1); // Ensure it starts from the first day
      newDate.setMonth(newDate.getMonth() + 1);
      return newDate;
    });
  };

  const prevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(1); // Ensure it starts from the first day
      newDate.setMonth(newDate.getMonth() - 1);
      return newDate;
    });
  };

  const handleDateClick = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (date < today || isDateDisabled(date)) {
      console.warn("Cannot select past or blocked dates.");
      return;
    }

    if (selectedRange.from && selectedRange.from.getTime() === date.getTime()) {
      // If clicking the same date as "from", reset selection
      setSelectedRange({ from: null, to: null });
    } else if (
      !selectedRange.from ||
      (selectedRange.from && selectedRange.to)
    ) {
      // Start new selection
      setSelectedRange({ from: date, to: null });
    } else {
      let newRange = { from: selectedRange.from, to: date };

      if (newRange.from.getTime() >= newRange.to.getTime()) {
        console.warn("The end date must be after the start date.");
        return;
      }

      let hasDisabledDates = false;
      let currentDate = new Date(newRange.from);

      while (currentDate < newRange.to) {
        currentDate.setDate(currentDate.getDate() + 1);
        if (isDateDisabled(currentDate)) {
          hasDisabledDates = true;
          break;
        }
      }

      if (hasDisabledDates) {
        console.warn("Cannot select range with blocked dates.");
        return;
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

  const isDateDisabled = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      date < today || // Disable past dates
      data.some((booking) => {
        const dateFrom = new Date(booking.dateFrom);
        const dateTo = new Date(booking.dateTo);

        dateFrom.setHours(0, 0, 0, 0);
        dateTo.setHours(0, 0, 0, 0);

        return date >= dateFrom && date <= dateTo;
      })
    );
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
      const disabled = isDateDisabled(date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const isPastDate = date < today;

      calendarDays.push(
        <div
          key={day}
          className={`w-13 h-13 sm:h-10 sm:w-10 flex items-center justify-center border border-natural-charcoal/40  
            ${disabled || isPastDate ? "bg-deep-blue/10 cursor-not-allowed" : ""}
            ${isFromDate || isToDate ? "bg-golden-yellow cursor-pointer" : ""} 
            ${isInRange ? "bg-golden-yellow/20 cursor-pointer" : ""} 
            ${!isFromDate && !isToDate && !isInRange && !disabled && !isPastDate ? "bg-white hover:bg-blue-100 cursor-pointer" : ""}`}
          onClick={() => !disabled && !isPastDate && handleDateClick(date)}
        >
          {day}
        </div>,
      );
    }

    return calendarDays;
  };

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDate = (date) => {
    return date
      ? `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}.${date.getFullYear()}`
      : "--";
  };

  const bookNow = () => {
    if (!isLoggedIn) {
      openStateWithOverlay("isLoginModalOpen");
      setWaitingForLogin(true); // Set flag to track login attempt
    } else {
      proceedWithBooking();
    }
  };

  const proceedWithBooking = useCallback(() => {
    if (selectedRange.from && selectedRange.to) {
      const formattedFrom = formatDateForURL(selectedRange.from);
      const formattedTo = formatDateForURL(selectedRange.to);

      navigate(
        `/venue/${venueId}/booking?from=${formattedFrom}&to=${formattedTo}`,
      );
    } else {
      console.warn("please select a valid date range before booking");
    }
  }, [selectedRange, venueId, navigate]);

  // Utility function to ensure the date is correctly formatted in local time
  const formatDateForURL = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // Ensures proper local format
  };

  useEffect(() => {
    if (waitingForLogin && isLoggedIn) {
      setWaitingForLogin(false);
      proceedWithBooking();
    }
  }, [isLoggedIn, waitingForLogin, proceedWithBooking]);

  return (
    <div className="p-5 bg-light-sky-blue flex justify-center pb-10 shadow-md shadow-natural-charcoal/40 md:mx-auto rounded-xl md:w-210">
      <div className="sm:px-0 flex flex-col gap-5 max-w-100 md:grid md:grid-cols-2 md:gap-7.5">
        {/* Header */}
        <div className="md:col-start-2 md:col-end-3">
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
                <img
                  src="/circle-right-sharp-solid.svg"
                  alt=""
                  className="h-8"
                />
                <span className="sr-only">next</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="flex justify-center md:col-start-1 md:col-end-2 md:row-start-1 row-end-4">
          <div className="grid grid-cols-7">
            {/* Weekday headers */}
            {weekdays.map((weekday, index) => (
              <div
                key={index}
                className="w-13 h-13 sm:h-10 sm:w-10 flex items-center justify-center uppercase font-bold border border-natural-charcoal/40 bg-white"
              >
                {weekday}
              </div>
            ))}
            {renderCalendar()}
          </div>
        </div>

        {/* Selected Range */}
        <div className="md:col-start-2 md:col-end-3 md:row-start-2 md:row-end-3 md:self-center">
          <div className="bg-white border border-natural-charcoal/40">
            <div className="text-sm-leading-none font-bold p-2.5">
              <span>You picked:</span>
            </div>
            <div className="flex justify-center pb-5 text-xl-leading-none">
              {formatDate(selectedRange.from)} - {formatDate(selectedRange.to)}
            </div>
          </div>
        </div>
        <div className="mx-auto md:col-start-2 md:col-end-3 self-end">
          <button
            className="font-serif font-black capitalize text-white bg-deep-blue text-3xl-leading-none px-7.5 py-3.75 rounded-xl shadow-md shadow-natural-charcoal/40 hover:bg-deep-blue/90"
            onClick={bookNow}
          >
            book now
          </button>
        </div>
      </div>
    </div>
  );
}

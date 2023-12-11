import moment from "moment";
import React, { useState } from "react";
import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import { Moment } from "moment";

const RangePicker: React.FC<any> = ({ handleApply }) => {
  const [startDate, setStartDate] = useState<Moment | null>(moment());
  const [endDate, setEndDate] = useState<Moment | null>(
    moment().add(1, "days").subtract(1, "seconds")
  );
  const [focusedInput, setFocusedInput] = useState<any>(null);

  const handleDatesChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  return (
    <div className="flex space-x-4 p-4 bg-white rounded shadow">
      <DateRangePicker
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={handleDatesChange}
        focusedInput={focusedInput}
        onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
        isOutsideRange={() => false}
        displayFormat="DD MMM YYYY"
      />
      <button
        className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition-colors duration-200 ease-in-out"
        onClick={() =>
          handleApply(
            startDate?.format("YYYY-MM-DD"),
            endDate?.format("YYYY-MM-DD")
          )
        }
      >
        Apply
      </button>
    </div>
  );
};

export default RangePicker;
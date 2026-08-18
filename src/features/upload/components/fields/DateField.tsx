import { useEffect, useId, useRef, useState } from "react";
import {
  IoCalendarOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

type DateFieldProps = {
  label: string;
  name: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const MONTHS = Array.from({ length: 12 }, (_, index) => `${index + 1}월`);
type CalendarView = "days" | "months" | "years";

const toDate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return year && month && day ? new Date(year, month - 1, day) : null;
};

const toDateValue = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;

export default function DateField({
  label,
  name,
  value,
  required = false,
  onChange,
}: DateFieldProps) {
  const selectedDate = toDate(value);
  const [isOpen, setIsOpen] = useState(false);
  const [visibleMonth, setVisibleMonth] = useState(
    () => selectedDate ?? new Date(),
  );
  const [calendarView, setCalendarView] = useState<CalendarView>("days");
  const rootRef = useRef<HTMLDivElement>(null);
  const labelId = useId();
  const calendarId = useId();

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsideClick);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsideClick);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  const year = visibleMonth.getFullYear();
  const month = visibleMonth.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const yearRangeStart = Math.floor(year / 12) * 12;
  const visibleYears = Array.from(
    { length: 12 },
    (_, index) => yearRangeStart + index,
  );
  const todayValue = toDateValue(new Date());
  const calendarCells = Array.from(
    { length: firstWeekday + daysInMonth },
    (_, index) => (index < firstWeekday ? null : index - firstWeekday + 1),
  );

  const moveCalendar = (offset: number) => {
    if (calendarView === "years") {
      setVisibleMonth(new Date(year + offset * 12, month, 1));
      return;
    }

    if (calendarView === "months") {
      setVisibleMonth(new Date(year + offset, month, 1));
      return;
    }

    setVisibleMonth(new Date(year, month + offset, 1));
  };

  return (
    <div
      ref={rootRef}
      className="relative border-b border-gray-200 pb-2"
    >
      <span
        id={labelId}
        className="mb-2 block px-2 text-xs font-medium text-gray-500"
      >
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </span>

      <input type="hidden" name={name} value={value} required={required} />
      <button
        type="button"
        aria-labelledby={labelId}
        aria-controls={calendarId}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={`mt-2 flex w-full items-center justify-between px-2 text-left text-sm font-medium outline-none transition-colors ${
          isOpen ? "text-[#4988C4]" : value ? "text-gray-900" : "text-gray-300"
        }`}
        onClick={() => {
          if (!isOpen) {
            setVisibleMonth(selectedDate ?? new Date());
            setCalendarView("days");
          }
          setIsOpen((current) => !current);
        }}
      >
        <span>{value || "연도-월-일"}</span>
        <IoCalendarOutline
          aria-hidden="true"
          className={isOpen ? "text-[#4988C4]" : "text-gray-400"}
          size={17}
        />
      </button>

      {isOpen && (
        <div
          id={calendarId}
          role="dialog"
          aria-modal="false"
          aria-labelledby={labelId}
          className="absolute left-0 top-full z-30 mt-2 w-full min-w-[280px] rounded-2xl border border-[#B5D4F4] bg-white p-4 shadow-xl"
        >
          <div className="mb-4 flex items-center justify-between">
            <button
              type="button"
              aria-label="이전 기간"
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-[#F4F7FB] hover:text-[#4988C4]"
              onClick={() => moveCalendar(-1)}
            >
              <IoChevronBack size={16} />
            </button>
            <div className="flex items-center gap-1 text-sm font-semibold text-[#0F2854]">
              <button
                type="button"
                className={`rounded-lg px-2 py-1 transition-colors hover:bg-[#F4F7FB] hover:text-[#4988C4] ${
                  calendarView === "years" ? "bg-[#4988C4]/10 text-[#4988C4]" : ""
                }`}
                onClick={() => setCalendarView("years")}
              >
                {calendarView === "years"
                  ? `${yearRangeStart}–${yearRangeStart + 11}년`
                  : `${year}년`}
              </button>
              <button
                type="button"
                className={`rounded-lg px-2 py-1 transition-colors hover:bg-[#F4F7FB] hover:text-[#4988C4] ${
                  calendarView === "months" ? "bg-[#4988C4]/10 text-[#4988C4]" : ""
                }`}
                onClick={() => setCalendarView("months")}
              >
                {month + 1}월
              </button>
            </div>
            <button
              type="button"
              aria-label="다음 기간"
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-[#F4F7FB] hover:text-[#4988C4]"
              onClick={() => moveCalendar(1)}
            >
              <IoChevronForward size={16} />
            </button>
          </div>

          {calendarView === "years" ? (
            <div className="grid grid-cols-3 gap-2">
              {visibleYears.map((optionYear) => (
                <button
                  key={optionYear}
                  type="button"
                  className={`rounded-xl py-3 text-xs font-medium transition-colors ${
                    optionYear === year
                      ? "bg-[#4988C4] text-white"
                      : "text-gray-600 hover:bg-[#F4F7FB] hover:text-[#4988C4]"
                  }`}
                  onClick={() => {
                    setVisibleMonth(new Date(optionYear, month, 1));
                    setCalendarView("days");
                  }}
                >
                  {optionYear}년
                </button>
              ))}
            </div>
          ) : calendarView === "months" ? (
            <div className="grid grid-cols-3 gap-2">
              {MONTHS.map((optionMonth, optionMonthIndex) => (
                <button
                  key={optionMonth}
                  type="button"
                  className={`rounded-xl py-3 text-xs font-medium transition-colors ${
                    optionMonthIndex === month
                      ? "bg-[#4988C4] text-white"
                      : "text-gray-600 hover:bg-[#F4F7FB] hover:text-[#4988C4]"
                  }`}
                  onClick={() => {
                    setVisibleMonth(new Date(year, optionMonthIndex, 1));
                    setCalendarView("days");
                  }}
                >
                  {optionMonth}
                </button>
              ))}
            </div>
          ) : (
          <div className="grid grid-cols-7 text-center">
            {WEEKDAYS.map((weekday, index) => (
              <span
                key={weekday}
                className={`pb-2 text-[11px] font-medium ${
                  index === 0
                    ? "text-red-400"
                    : index === 6
                      ? "text-[#4988C4]"
                      : "text-gray-400"
                }`}
              >
                {weekday}
              </span>
            ))}

            {calendarCells.map((day, index) => {
              if (day === null) return <span key={`empty-${index}`} />;

              const dateValue = toDateValue(new Date(year, month, day));
              const isSelected = dateValue === value;
              const isToday = dateValue === todayValue;
              const weekday = (firstWeekday + day - 1) % 7;

              return (
                <button
                  key={dateValue}
                  type="button"
                  aria-label={`${year}년 ${month + 1}월 ${day}일`}
                  aria-pressed={isSelected}
                  className={`mx-auto my-0.5 flex size-8 items-center justify-center rounded-full text-xs transition-colors ${
                    isSelected
                      ? "bg-[#4988C4] font-semibold text-white"
                      : isToday
                        ? "bg-[#4988C4]/10 font-semibold text-[#4988C4]"
                        : weekday === 0
                          ? "text-red-400 hover:bg-red-50"
                          : weekday === 6
                            ? "text-[#4988C4] hover:bg-[#F4F7FB]"
                            : "text-gray-600 hover:bg-[#F4F7FB]"
                  }`}
                  onClick={() => {
                    onChange(dateValue);
                    setIsOpen(false);
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
          )}
        </div>
      )}
    </div>
  );
}

"use client";
export const dynamic = "force-dynamic";
import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./calendar.css"; // Create this file for custom styles
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import { useGetEventQuery } from "@/api/eventApi/eventApi";

dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.extend(utc);

type Event = {
  id: string;
  title: string;
  from: any;
  to: any;
  color?: string;
};

export default function CalendarPage() {
  const [date, setDate] = useState(dayjs());
  const [selectedEvent, setSelectedEvent] = useState<Event[]>([]);

  const { data, isLoading } = useGetEventQuery({});

  const getFund = (value: any) => {
    setDate(dayjs(value));
  };

  const events: Event[] = (data?.result || []).map(
    (item: any, idx: number) => ({
      id: String(idx + 1),
      title: item.eventName,
      from: dayjs(item.fromDate, "YYYY-MM-DD HH:mm:ss.S"),
      to: dayjs(item.toDate, "YYYY-MM-DD HH:mm:ss.S"),
      color: "bg-blue-500",
    })
  );

  const hasEvent = (targetDate: dayjs.Dayjs) => {
    const d = dayjs(targetDate);
    return events.some((ev) => d.isBetween(ev.from, ev.to, "day", "[]"));
  };

  const getEventsForDate = (targetDate: dayjs.Dayjs) => {
    const d = dayjs(targetDate);
    return events.filter((ev) => d.isBetween(ev.from, ev.to, "day", "[]"));
    // return events.filter(event =>  targetDate?.isBetween(event.from, event.to, "day", "[]"));
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    const dayjsDate = dayjs(date);
    if (view === "month") {
      const dateEvents = getEventsForDate(dayjsDate);

      return (
        <div className="absolute top-0 left-0 right-0 bottom-0 p-1 flex flex-col">
          <div className="text-center text-sm font-medium">
            {date.getDate()}
          </div>
          {dateEvents.length > 0 && (
            <div className="flex-1 overflow-y-auto mt-1 space-y-1">
              {dateEvents.map((event) => (
                <div
                  key={event.id}
                  className={`text-xs p-1 rounded truncate ${
                    event.color || "bg-blue-500"
                  } text-white`}
                >
                  {event.title}
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  // Custom tile className to style event dates differently
  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month" && hasEvent(date)) {
      return "has-event";
    }
    return "";
  };

  return (
    <div className="min-h-screen bg-white text-black w-full">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-4xl font-bold mb-8 text-center">Event Calendar</h1>

        <div className="w-full bg-white p-6  rounded-lg">
          <Calendar
            onChange={getFund}
            value={date.toDate()}
            tileContent={tileContent}
            tileClassName={tileClassName}
            onClickDay={(value: any) => {
              const dayEvents = getEventsForDate(value);
              setSelectedEvent(dayEvents);
            }}
            className="w-full border-none"
          />
        </div>

        {selectedEvent.length > 0 && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg shadow">
            <h2 className="text-2xl font-semibold mb-4">
              {dayjs(selectedEvent[0].from).format("dddd, MMMM D, YYYY")}
            </h2>

            <ul className="space-y-3">
              {selectedEvent.map((ev) => (
                <li key={ev.id} className="p-3 bg-white rounded border">
                  <div className="font-medium">{ev.title}</div>
                  <div className="text-gray-600 text-sm">
                    {/* same-day event? show time; else show range */}
                    {ev.from.isSame(ev.to, "day")
                      ? `${ev.from.format("hh:mm A")} – ${ev.to.format(
                          "hh:mm A"
                        )}`
                      : `${ev.from.format(
                          "MMM D, YYYY hh:mm A"
                        )} → ${ev.to.format("MMM D, YYYY hh:mm A")}`}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

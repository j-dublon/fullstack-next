import EventList from "@components/events/EventList";
import { getAllEvents } from "dummy-data";
import EventSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";

export default function AllEvents() {
  const router = useRouter();
  const events = getAllEvents();

  const findEvents = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <EventSearch onSearch={findEvents} />
      <EventList items={events} />
    </>
  );
}

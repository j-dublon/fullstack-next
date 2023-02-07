import EventList from "@components/events/EventList";
import { getAllEvents } from "@helpers/api-util";
import EventSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";

export default function AllEvents({ events }) {
  const router = useRouter();

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

export const getStaticProps = async () => {
  const events = await getAllEvents();

  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
};

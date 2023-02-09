import EventList from "@components/events/EventList";
import { getAllEvents } from "@helpers/api-util";
import EventSearch from "../../components/events/EventSearch";
import { useRouter } from "next/router";
import Head from "next/head";

export default function AllEvents({ events }) {
  const router = useRouter();

  const findEvents = (year, month) => {
    router.push(`/events/${year}/${month}`);
  };

  return (
    <>
      <Head>
        <title>All events</title>
        <meta
          name="description"
          content="Find Next events for your personal development"
        />
      </Head>
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

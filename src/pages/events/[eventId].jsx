import { getEventById, getFeaturedEvents } from "@helpers/api-util";
import EventContent from "@components/EventDetail/EventContent";
import EventLogistics from "@components/EventDetail/EventLogistics";
import EventSummary from "@components/EventDetail/EventSummary";
import ErrorAlert from "@components/ui/error-alert/ErrorAlert";
import Head from "next/head";
import Comments from "@components/input/Comments";

export default function EventDetailPage({ details }) {
  if (!details) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  return (
    <>
      <Head>
        <title>{details.title}</title>
        <meta name="description" content={details.description} />
      </Head>
      <EventSummary title={details.title} />
      <EventLogistics
        date={details.date}
        address={details.location}
        image={details.image}
        imageAlt={details.imageAlt}
      />
      <EventContent>
        <p>{details.description}</p>
      </EventContent>
      <Comments eventId={details.id} />
    </>
  );
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      details: event,
    },
    revalidate: 30,
  };
};

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));
  return {
    paths: paths,
    fallback: "blocking",
  };
};

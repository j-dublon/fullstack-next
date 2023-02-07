import { getEventById } from "@helpers/api-util";
import EventContent from "@components/EventDetail/EventContent";
import EventLogistics from "@components/EventDetail/EventLogistics";
import EventSummary from "@components/EventDetail/EventSummary";
import ErrorAlert from "@components/ui/error-alert/ErrorAlert";

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
  };
};

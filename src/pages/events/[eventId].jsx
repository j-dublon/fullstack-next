import { useRouter } from "next/router";
import { getEventById } from "dummy-data";
import EventContent from "@components/EventDetail/EventContent";
import EventLogistics from "@components/EventDetail/EventLogistics";
import EventSummary from "@components/EventDetail/EventSummary";

export default function EventDetailPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const details = getEventById(eventId);

  if (!details) {
    return <p>No event found</p>;
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

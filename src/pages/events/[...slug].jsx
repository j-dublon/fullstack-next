import { useRouter } from "next/router";
import { getFilteredEvents } from "dummy-data";
import EventList from "@components/events/EventList";
import ResultsTitle from "@components/events/results-title/ResultsTitle";
import Button from "@components/ui/Button";
import ErrorAlert from "@components/ui/error-alert/ErrorAlert";

export default function FilteredEventsPage() {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filterYear = Number(filterData[0]);
  const filterMonth = Number(filterData[1]);

  // TO DO: Add TS to project and remove conditional logic

  if (
    isNaN(filterYear) ||
    isNaN(filterYear) ||
    filterYear > 2030 ||
    filterYear < 2021 ||
    filterMonth > 12 ||
    filterMonth < 1
  ) {
    return (
      <ErrorAlert>
        <p>Invalid date. Please adjust your selection!</p>
      </ErrorAlert>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  if (!filteredEvents.length) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen dates!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}

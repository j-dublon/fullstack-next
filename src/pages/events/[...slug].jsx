import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getFilteredEvents } from "@helpers/api-util";
import EventList from "@components/events/EventList";
import ResultsTitle from "@components/events/results-title/ResultsTitle";
import Button from "@components/ui/Button";
import ErrorAlert from "@components/ui/error-alert/ErrorAlert";

export default function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://full-stack-next-537ee-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = Number(filterData[0]);
  const filteredMonth = Number(filterData[1]);

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2021 ||
    filteredMonth < 1 ||
    filteredMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filteredYear &&
      eventDate.getMonth() === filteredMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

// import { getFilteredEvents } from "@helpers/api-util";
// import EventList from "@components/events/EventList";
// import ResultsTitle from "@components/events/results-title/ResultsTitle";
// import ErrorAlert from "@components/ui/error-alert/ErrorAlert";
// import Button from "@components/ui/Button";

// export default async function FilteredEventsPage({
//   filteredEvents,
//   hasError,
//   notFound,
//   year,
//   month,
//   isLoading,
// }) {
//   console.log("in here");
// if (isLoading) {
//   return <p className="center">Loading...</p>;
// }

// if (hasError) {
//   return (
//     <ErrorAlert>
//       <p>Invalid date. Please adjust your selection!</p>
//     </ErrorAlert>
//   );
// }

// if (notFound) {
//   return (
//     <>
//       <ErrorAlert>
//         <p>No events found for the chosen dates!</p>
//       </ErrorAlert>
//       <div className="center">
//         <Button link="/events">Show all events</Button>
//       </div>
//     </>
//   );
// }

// const date = new Date(year, month - 1);

// return (
//   <>
{
  /* <ResultsTitle date={date} />
      <EventList items={filteredEvents} /> */
}
{
  /* </>
  );
} */
}

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   const filterData = params.slug;

//   if (!filterData) {
//     return {
//       props: {
//         isLoading: true,
//       },
//     };
//   }

//   const filterYear = Number(filterData[0]);
//   const filterMonth = Number(filterData[1]);

//   // TO DO: Add TS to project and remove conditional logic

//   if (
//     isNaN(filterYear) ||
//     isNaN(filterYear) ||
//     filterYear > 2030 ||
//     filterYear < 2021 ||
//     filterMonth > 12 ||
//     filterMonth < 1
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filterYear,
//     month: filterMonth,
//   });

//   if (!filteredEvents.length) {
//     return {
//       props: {
//         notFound: true,
//       },
//     };
//   }

//   return {
//     props: {
//       filteredEvents: filteredEvents,
//       year: filterYear,
//       month: filterMonth,
//     },
//   };
// };

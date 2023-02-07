import { getFilteredEvents } from "@helpers/api-util";
import EventList from "@components/events/EventList";
import ResultsTitle from "@components/events/results-title/ResultsTitle";
import ErrorAlert from "@components/ui/error-alert/ErrorAlert";
import Button from "@components/ui/Button";

export default async function FilteredEventsPage() {
  return (
    <div className="center">
      <p>Hello There</p>
    </div>
  );
}

// export default async function FilteredEventsPage({
//   filteredEvents,
//   hasError,
//   notFound,
//   year,
//   month,
//   isLoading,
// }) {
//   if (isLoading) {
//     return <p className="center">Loading...</p>;
//   }

//   if (hasError) {
//     return (
//       <ErrorAlert>
//         <p>Invalid date. Please adjust your selection!</p>
//       </ErrorAlert>
//     );
//   }

//   if (notFound) {
//     return (
//       <>
//         <ErrorAlert>
//           <p>No events found for the chosen dates!</p>
//         </ErrorAlert>
//         <div className="center">
//           <Button link="/events">Show all events</Button>
//         </div>
//       </>
//     );
//   }

//   const date = new Date(year, month - 1);

//   return (
//     <>
//       <ResultsTitle date={date} />
//       <EventList items={filteredEvents} />
//     </>
//   );
// }

// export const getServerSideProps = async (context) => {
//   const { params } = context;
//   console.log(params, "<---params");
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

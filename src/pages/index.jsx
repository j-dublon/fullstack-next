import EventList from "@/components/events/EventList";
import NewsletterRegistration from "@components/input/NewsletterRegistration";
import { getFeaturedEvents } from "@helpers/api-util";
import Head from "next/head";

export default function HomePage({ events }) {
  return (
    <div>
      <Head>
        <title>Fullstack Next</title>
        <meta
          name="description"
          content="Find Next events for your personal development"
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

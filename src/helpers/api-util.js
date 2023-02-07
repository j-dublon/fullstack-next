export const getAllEvents = async () => {
  const res = await fetch(
    "https://full-stack-next-537ee-default-rtdb.europe-west1.firebasedatabase.app/events.json"
  );
  const data = await res.json();

  const events = [];
  for (const key in data) {
    events.push({
      id: key,
      ...data[key],
    });
  }

  return events;
};

export const getFeaturedEvents = async () => {
  const allEvents = await getAllEvents();
  return allEvents.filter((event) => event.isFeatured);
};

export const getEventById = async (id) => {
  const allEvents = await getAllEvents();
  return allEvents.find((event) => event.id === id);
};

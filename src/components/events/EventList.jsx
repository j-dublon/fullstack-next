import EventItem from "./EventItem";
import styles from "@styles/event-list.module.css";

export default function EventList({ items }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => (
        <EventItem item={item} />
      ))}
    </ul>
  );
}

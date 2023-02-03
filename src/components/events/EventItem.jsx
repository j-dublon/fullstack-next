import Button from "@components/ui/Button";
import styles from "@styles/event-item.module.css";

export default function EventItem({ item }) {
  const readableDate = new Date(item.date).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedAddress = item.location.replace(", ", "\n");

  const exploreLink = `/events/${item.id}`;

  return (
    <li className={styles.item}>
      <img src={`/${item.image}`} alt={item.title} />
      <div className={styles.content}>
        <div className={styles.summary}>
          <h2>{item.title}</h2>
          <div className={styles.date}>
            <time>{readableDate}</time>
          </div>
          <div className={styles.address}>
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>Explore Event</Button>
        </div>
      </div>
    </li>
  );
}

import Button from "@components/ui/Button";
import styles from "@styles/event-item.module.css";
import DateIcon from "@components/icons/date-icon";
import AddressIcon from "@components/icons/address-icon";
import ArrowRightIcon from "@components/icons/arrow-right-icon";

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
            <DateIcon />
            <time>{readableDate}</time>
          </div>
          <div className={styles.address}>
            <AddressIcon />
            <address>{formattedAddress}</address>
          </div>
        </div>
        <div className={styles.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={styles.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
}

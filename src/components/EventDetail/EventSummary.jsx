import styles from "@styles/event-summary.module.css";

function EventSummary({ title }) {
  return (
    <section className={styles.summary}>
      <h1>{title}</h1>
    </section>
  );
}

export default EventSummary;

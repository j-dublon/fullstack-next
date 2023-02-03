import Link from "next/link";
import styles from "@styles/button.module.css";

export default function Button({ children, link }) {
  return (
    <Link href={link} className={styles.button}>
      {children}
    </Link>
  );
}

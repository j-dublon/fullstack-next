import Link from "next/link";
import styles from "@styles/button.module.css";

export default function Button({ children, link }) {
  return (
    <>
      {link ? (
        <Link href={link} className={styles.btn}>
          {children}
        </Link>
      ) : (
        <button className={styles.btn}>{children}</button>
      )}
    </>
  );
}

import styles from "@styles/comment-list.module.css";

function CommentList({ items }) {
  return (
    <ul className={styles.comments}>
      {items &&
        items.map((item) => (
          <li key={item.id}>
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))}
    </ul>
  );
}

export default CommentList;

import { DiaryItemData } from "../../hooks/useCollection";
import useFireStore from "../../hooks/useFireStore";
import styles from "./home.module.scss";


const DiaryItem = ({ title, content, date, id }: DiaryItemData) => {
  const fireStore = useFireStore();
  const handleDeleteDiary = () => {
    fireStore?.deleteDocument(id)
  }
  const formattedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);

    return `${year}. ${month}. ${day} ${dayOfWeek}`;
  };
  return (
    <li id={`${id}`}>
      <article className={styles["diary-article"]}>
        <h3 className={styles["article-title"]}>{title}</h3>
        <time className={styles["article-time"]}>
          {formattedDate(date)}
        </time>
        <p className={styles["article-content"]}>{content}</p>

        <div className={styles["button-group"]}>
          <button type="button">
            <img src="./img/icon-edit.svg" alt="수정" />
          </button>
          <span></span>
          <button type="button" onClick={handleDeleteDiary}>
            <img src="./img/icon-delete.svg" alt="삭제" />
          </button>
        </div>
      </article>
    </li>
  );
};

export default DiaryItem;

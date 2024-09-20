import React from "react";
import styles from "./home.module.scss";
import DiaryForm from "./DiaryForm";
import DiaryItem from "./DiaryItem";
import useCollection from "../../hooks/useCollection";

const Home = () => {
  const { data } = useCollection("diary");
  const date = new Date();
  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return (
    <div className={styles["container"]}>
      <main className={styles["diary-main"]}>
        <h2 className={styles["heart"]}>{formattedDate} 비밀 일기</h2>
        <DiaryForm />
      </main>
      <section>
        <h2 className="a11y-hidden">일기 목록</h2>
        <ul>
          {!data ? (
            <li>작성한 다이어리가 없습니다.</li>
          ) : (
            data.map((el) => (
              <DiaryItem
                key={`${el.id}_${el.title}`}
                id={el.id}
                title={el.title}
                content={el.content}
                date={el.date}
              />
            ))
          )}
        </ul>
      </section>
    </div>
  );
};

export default Home;

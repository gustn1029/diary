import React from "react";
import styles from "./home.module.scss";
import DiaryForm from "./DiaryForm";
import DiaryItem from "./DiaryItem";

const Home = () => {
  return (
    <div className={styles["container"]}>
      <main className={styles["diary-main"]}>
        <h2 className={styles["heart"]}>2023.02.27의 비밀일기</h2>
        <DiaryForm />
      </main>
      <section>
        <h2 className="a11y-hidden">일기 목록</h2>
        <ul>{<DiaryItem />}</ul>
      </section>
    </div>
  );
};

export default Home;

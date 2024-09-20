import { ChangeEvent, FormEventHandler, useState } from "react";
import styles from "./home.module.scss";
import useFireStore from "../../hooks/useFireStore";

interface DiaryData {
  title: string;
  content: string;
}

const DiaryForm = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const addDiary = useFireStore<DiaryData>();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const newDiary = {
      title: title,
      content: content,
    };
    addDiary?.addDocument(newDiary);
    alert("다이어리를 저장했습니다.");
    setTitle("");
    setContent("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label className="a11y-hidden" htmlFor="diary-title">
        일기 제목
      </label>
      <input
        className="input-style"
        id="diary-title"
        type="text"
        placeholder="제목"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setTitle(e.target.value)
        }
        required
      />

      <label className="a11y-hidden" htmlFor="diary-content">
        일기 내용
      </label>
      <textarea
        className={styles["diary-textarea"]}
        id="diary-content"
        value={content}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setContent(e.target.value)
        }
        placeholder="오늘의 비밀은 무엇인가요?"
      ></textarea>
      <button className="black-btn" type="submit">
        작성하기
      </button>
    </form>
  );
};

export default DiaryForm;

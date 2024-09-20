import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
  WhereFilterOp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { appFireStore } from "../firebase/config";
import { useAppDispatch } from "./useReduxToolkitHook";
import { setIsStoreLoading } from "../store/fireStoreSlice";

export interface DiaryItemData {
  title: string;
  content: string;
  id: string;
  date: Date;
}

const useCollection = (
  collectionName: string,
  myQuery?: [string, WhereFilterOp, unknown]
) => {
  const [data, setData] = useState<Array<DiaryItemData>>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setIsStoreLoading(true));
    let q;
    const isValidQuery = myQuery && myQuery.every((item) => item !== undefined);
    if (isValidQuery) {
      q = query(
        collection(appFireStore, collectionName),
        where(...(myQuery as [string, WhereFilterOp, unknown]))
      );
    }
    const unsubscribe = onSnapshot(
      isValidQuery ? q! : collection(appFireStore, collectionName),
      (snapshot) => {
        snapshot.docs.forEach((el) => {
          const addDocTime = el.data().addDocTime;
          let date: Date = new Date();
          if (addDocTime instanceof Timestamp) {
            date = new Date(addDocTime.seconds * 1000);
          }

          const diary: DiaryItemData = {
            title: el.data().title,
            content: el.data().content,
            date: date,
            id: el.id,
          };

          setData((prevDiary) => {
            const find = prevDiary.find((el) => el.id === diary.id);
            if (!find) {
              return [...prevDiary, diary];
            }
            return [...prevDiary];
          });
        });
        dispatch(setIsStoreLoading(false));
      },
      (err) => {
        dispatch(setIsStoreLoading(false));
        throw new Error(err.message);
      }
    );

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  return { data };
};

export default useCollection;

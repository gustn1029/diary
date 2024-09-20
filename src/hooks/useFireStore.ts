import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { appFireStore, timestamp } from "../firebase/config";
import { FirebaseError } from "firebase/app";
import { useAppDispatch, useAppSelector } from "./useReduxToolkitHook";
import { setIsStoreLoading, setStoreError } from "../store/fireStoreSlice";

const useFireStore = <T>() => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  if (user) {
    const colRef = collection(appFireStore, "diary");
    const addDocument = async (doc: T) => {
      dispatch(setIsStoreLoading(true));
      try {
        const addDocTime = timestamp.fromDate(new Date());
        const userId = user.uid;
        await addDoc(colRef, { ...doc, userId, addDocTime });
        
        dispatch(setStoreError({isError: false, error: null}));
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error(`errorCode:${error.code}, message: ${error.message}`);
          dispatch(setStoreError({isError: true, error: `errorCode:${error.code}, message: ${error.message}`}));
          throw new Error(`errorCode:${error.code}, message: ${error.message}`);
        } else {
          console.error(error);
        }
      } finally {
        dispatch(setIsStoreLoading(false));
      }
    };

    const deleteDocument = async (id: string) => {
      dispatch(setIsStoreLoading(true));
      try {
        await deleteDoc(doc(colRef, id));
      } catch (error) {
        if (error instanceof FirebaseError) {
          console.error(`errorCode:${error.code}, message: ${error.message}`);
          throw new Error(`errorCode:${error.code}, message: ${error.message}`);
        } else {
          console.error(error);
        }
      } finally {
        dispatch(setIsStoreLoading(false));
      }
    };

    return { addDocument, deleteDocument };
  }
};

export default useFireStore;

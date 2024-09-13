import { useState } from "react";
import { UserData } from "../types";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { appAuth } from "../firebase/config";
import { FirebaseError } from "firebase/app";

export const useSignup = () => {
  // 에러 상태 관리
  const [error, setError] = useState<string | null>(null);
  // 통신 상태 관리
  const [isPending, setIsPending] = useState<boolean>(false);

  const signup = async ({ userEmail, userPassword, userName }: UserData) => {
    setIsPending(true);
    try {
      const userCredencial = await createUserWithEmailAndPassword(
        appAuth,
        userEmail,
        userPassword
      );
      const user = userCredencial.user;

      await updateProfile(user, { displayName: userName });
    } catch (error) {
      if (error instanceof FirebaseError) {
        setError(error.message);
        console.error(`code: ${error.code}, error: ${error}`);
      }
      console.error(`error: ${error}`);
    } finally {
      setIsPending(false);
    }
  };

  return { signup, error, isPending };
};

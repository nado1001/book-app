import { signInAction } from "./actions";
import Router from "next/router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const listenAuthState = () => {
  return async (dispatch) => {
    return auth.onAuthStateChanged((user) => {
      // 現在ログインしているユーザーを取得
      if (user) {
        const uid = user.uid;
        // DBからユーザーの情報を取得
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            // actionsのsignInActionのstateを変更
            dispatch(
              signInAction({
                isSignedIn: true,
                role: data.role,
                uid: uid,
                username: data.username,
              })
            );
          });
      } else {
        // ユーザーが存在していない場合
        Router.push("/signin");
      }
    });
  };
};

export const signIn = (email, password) => {
  return async (dispatch) => {
    if (email === "" || password === "") {
      alert("必須項目が未入力です");
      return false;
    }

    auth.signInWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        db.collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data = snapshot.data();

            dispatch(
              signInAction({
                isSignedIn: true,
                uid: uid,
                role: data.role,
                username: data.username,
              })
            );
            Router.push("/");
          });
      }
    });
  };
};

export const signUp = (username, email, password, confirmPassword) => {
  return async () => {
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      alert("必須項目が未入力です");
      return false;
    }

    if (password !== confirmPassword) {
      alert("パスワードが一致していません");
      return false;
    }
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          const uid = user.uid;
          const timestamp = FirebaseTimestamp.now();

          const userInitalData = {
            create_at: timestamp,
            email: email,
            role: "customer",
            uid: uid,
            updated_at: timestamp,
            username: username,
          };

          db.collection("users")
            .doc(uid)
            .set(userInitalData)
            .then(() => {
              Router.push("/");
            });
        }
      });
  };
};

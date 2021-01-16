import { signInAction } from "./actions";
import Router from "next/router";
import { auth, db, FirebaseTimestamp } from "../../firebase/index";

export const signIn = () => {
  return async (dispatch, getState) => {
    const state = getState();
    const isSignedIn = state.users.isSignedIn;

    if (!isSignedIn) {
      const url = "https://api.github.com/users/take-tech1001";
      const res = await fetch(url)
        .then((res) => res.json())
        .catch(() => null);

      const name = res.login;
      dispatch(
        signInAction({
          uid: "00001",
          username: name,
        })
      );
      Router.push("/about");
    }
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

import { useCallback, useState } from "react";
import { TextInput, PrimaryButton, Loading } from "../components/atoms";
import { signUp } from "../redux/users/operations";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { SimpleLayout } from "../components/organisms";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const inputUsername = useCallback(
    (event) => {
      setUsername(event.target.value);
    },
    [setUsername]
  );

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const inputConfirmPassword = useCallback(
    (event) => {
      setConfirmPassword(event.target.value);
    },
    [setConfirmPassword]
  );

  const submit = () => {
    dispatch(signUp(username, email, password, confirmPassword));
    if (
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === "" ||
      password.length < 6 ||
      password !== confirmPassword
    ) {
      return false;
    } else {
      setLoading(true);
    }
  };

  return (
    <SimpleLayout title="新規会員登録">
      <div className="container m-auto">
        {loading && <Loading />}
        <div className="w-96 mx-auto mt-10">
          <h2 className="text-2xl text-block02 font-semibold text-center mb-2">
            新規会員登録
          </h2>
          <TextInput
            fullWidth={true}
            label={"ユーザー名"}
            multiline={false}
            required={true}
            rows={1}
            value={username}
            type={"text"}
            onChange={inputUsername}
          />
          <div className="mt-2" />
          <TextInput
            fullWidth={true}
            label={"メールアドレス"}
            multiline={false}
            required={true}
            rows={1}
            value={email}
            type={"email"}
            onChange={inputEmail}
          />
          <div className="mt-2" />
          <TextInput
            fullWidth={true}
            label={"パスワード"}
            multiline={false}
            required={true}
            rows={1}
            value={password}
            type={"password"}
            onChange={inputPassword}
          />
          <div className="mt-2" />
          <TextInput
            fullWidth={true}
            label={"パスワード（再確認）"}
            multiline={false}
            required={true}
            rows={1}
            value={confirmPassword}
            type={"password"}
            onChange={inputConfirmPassword}
          />

          <div className="mt-8 text-center">
            <PrimaryButton label={"登録する"} onClick={submit} />
          </div>

          <Link href="/signin">
            <a className="text-right mt-4 block">ログイン画面に戻る→</a>
          </Link>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default SignUp;

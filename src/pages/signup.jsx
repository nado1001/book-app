import { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/atoms";
import { signUp } from "../redux/users/operations";
import { useDispatch } from "react-redux";
import Link from "next/link";

const SignUp = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  return (
    <div className="container m-auto">
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
          <PrimaryButton
            label={"登録する"}
            onClick={() =>
              dispatch(signUp(username, email, password, confirmPassword))
            }
          />
        </div>

        <Link href="/signin">
          <a className="text-right mt-4 block">ログイン画面に戻る→</a>
        </Link>
      </div>
    </div>
  );
};

export default SignUp;

import { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../components/atoms";
import { signIn } from "../redux/users/operations";
import { useDispatch } from "react-redux";
import Link from "next/link";

const SignIn = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <div className="container m-auto">
      <div className="w-96 mx-auto mt-10">
        <h2 className="text-2xl text-block02 font-semibold text-center mb-2">
          ログイン
        </h2>
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
        <div className="mt-8 text-center text-white font-semibold">
          <PrimaryButton
            label={"ログインする"}
            onClick={() => dispatch(signIn(email, password))}
          />
        </div>

        <Link href="/signup">
          <a className="text-right mt-4 block">新規会員登録→</a>
        </Link>

        <Link href="/signin/reset">
          <a className="text-right mt-2 block">パスワードを忘れた方はこちら→</a>
        </Link>
      </div>
    </div>
  );
};

export default SignIn;

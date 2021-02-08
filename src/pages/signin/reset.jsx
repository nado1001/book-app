import { useCallback, useState } from "react";
import { TextInput, PrimaryButton } from "../../components/atoms";
import { SimpleLayout } from "../../components/organisms";
import { resetPassword } from "../../redux/users/operations";
import { useDispatch } from "react-redux";
import Link from "next/link";

const Reset = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const inputEmail = useCallback(
    (event) => {
      setEmail(event.target.value);
    },
    [setEmail]
  );

  return (
    <SimpleLayout title="パスワードのリセット">
      <div className="container m-auto">
        <div className="w-96 mx-auto mt-10">
          <h2 className="text-2xl text-block02 font-semibold text-center mb-2">
            パスワードのリセット
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
          <div className="mt-8 text-center">
            <PrimaryButton
              label={"パスワードをリセットする"}
              onClick={() => dispatch(resetPassword(email))}
            />
          </div>

          <Link href="/signin">
            <a className="text-right mt-4 block">ログイン画面に戻る→</a>
          </Link>
        </div>
      </div>
    </SimpleLayout>
  );
};

export default Reset;

import Link from "next/link";

const about = () => {
  return (
    <div className="about">
      <h1>about</h1>
      <Link href="/">
        <a>ホームへ</a>
      </Link>
    </div>
  );
};

export default about;

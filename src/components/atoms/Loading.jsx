import styles from "../../styles/Utils.module.css";

const loading = () => {
  return (
    <div className={styles.loaderWrap}>
      <div className={styles.loader}>Loading...</div>
    </div>
  );
};

export default loading;

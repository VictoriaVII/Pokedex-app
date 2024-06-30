import styles from "./Loader.module.scss";

const Loader = () => {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__img} />
      <div className={styles.loading__text}>Загрузка...</div>
    </div>
  );
};

export default Loader;

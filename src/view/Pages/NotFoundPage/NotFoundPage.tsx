import { NavLink } from "react-router-dom";
import styles from "./NotFoundPage.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.error}>
      <div className={styles.error__body}>
        <img
          className={styles.error__img}
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzI2YnZwOWFkaDlqbm9oN2hpdTV6c2Y3MzY0NnNsd2VzYzdxbXJ1dCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pUh8KWBxCjMeMI3S3y/giphy.gif"
          alt="404"
        />
        <span className={styles.error__span}>404</span>
        <p className={styles.error__text}>Страница не найдена</p>
        <NavLink className={styles.error__back} to="../">
          На главную
        </NavLink>
      </div>
    </div>
  );
};

export default NotFoundPage;

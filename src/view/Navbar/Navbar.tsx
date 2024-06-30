import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <nav className={styles.navbar__logo}>
        <img
          className={styles.logo__img}
          src="img/pokedex-logo.png"
          alt="Pokedex Logo"
        />
        <div className={styles.navbar__body}>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__navlink} ${styles.navbar__navlink__active}`
                : styles.navbar__navlink
            }
            to="."
          >
            Home{" "}
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__navlink} ${styles.navbar__navlink__active}`
                : styles.navbar__navlink
            }
            to="caught"
          >
            Caught Pokemon
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? `${styles.navbar__navlink} ${styles.navbar__navlink__active}`
                : styles.navbar__navlink
            }
            to="select"
          >
            Catalog
          </NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  );
};

export default Navbar;

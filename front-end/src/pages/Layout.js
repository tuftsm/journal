import { Outlet, Link } from "react-router-dom";
import styles from './styles.module.css';

const Layout = () => {
  return (
    <>
    <div stylename={styles.header}>
    <div className={styles.bar}>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item mx-2">
            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item mx-2">
            <Link class="nav-link" to="/Personal">Personal</Link>
          </li>
          <li class="nav-item mx-2">
            <Link class="nav-link" to="/Academics">Academics</Link>
          </li>          
        </ul>
      </div>
    </nav>
    </div>
    </div>

    <Outlet />
    </>

    )
};

export default Layout;
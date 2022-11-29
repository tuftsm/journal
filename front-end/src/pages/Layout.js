import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
    <nav class="navbar navbar-expand-sm bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Personal">Personal</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Workouts">Workouts</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/Academics">Academics</Link>
          </li>          
        </ul>
      </div>
    </nav>

    <Outlet />
    </>

    )
};

export default Layout;
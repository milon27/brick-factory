import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StateContext } from './../../../utils/context/AppContext';

export default function Header() {
    const { user } = useContext(StateContext);



    return (
        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

            {/* <!-- Sidebar Toggle (Topbar) --> */}
            <button id="sidebarToggleTop" className="btn btn-link d-md-none rounded-circle mr-3"
                onClick={() => {
                    document.getElementById("page-top").classList.toggle("sidebar-toggled");
                    document.getElementById("accordionSidebar").classList.toggle("toggled");
                }}
            >
                <i className="fa fa-bars"></i>
            </button>

            {/* <!-- Topbar Navbar --> */}
            <ul className="navbar-nav ml-auto">

                {/* <!-- Nav Item - User Information --> */}
                <li className="nav-item dropdown no-arrow">
                    {/* <a className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.user_name}-{user.user_role}</span>
                        <i className="fas fa-user-circle text-primary  " style={{ fontSize: 23 }}></i>
                    </a> */}

                    <Link to="#" className="nav-link dropdown-toggle" id="userDropdown" role="button"
                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{user.user_name}-{user.user_role}</span>
                        <i className="fas fa-user-circle text-primary  " style={{ fontSize: 23 }}></i>
                    </Link>

                    {/* <!-- Dropdown - User Information --> */}
                    <div className="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                        aria-labelledby="userDropdown">
                        <Link className="dropdown-item"
                            to={{ pathname: `tel:${user.user_phone_num}` }}
                            target="_blank"
                        >
                            <i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400"></i>
                                 Phone: {user.user_phone_num}
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" to={{ pathname: `mailto:admin@gmail.com` }}
                            target="_top">
                            <i className="fas fa-list fa-sm fa-fw mr-2 text-gray-400"></i>
                           Email: {user.user_email}
                        </Link>
                        <div className="dropdown-divider"></div>
                        <Link className="dropdown-item" data-toggle="modal" data-target="#logoutModal" to="/">
                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                    Logout
                        </Link>
                    </div>
                </li>

            </ul>

        </nav>
    )
}

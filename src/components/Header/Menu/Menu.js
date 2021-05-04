import logo from '../../../assets/images/logo2.png'
import { NavLink, Link } from "react-router-dom";
import useUser from "../../../hooks/useUser";

const Menu = function () {
    const [ user, setUser ] = useUser();

    function logout(e) {
        e.preventDefault();
        setUser(null);
    }

    function login(e) {
        e.preventDefault();
        setUser("dfsdfsdf");
    }

    return (
        <nav className="navbar navbar-expand-md navbar-light bg-white shadow-sm">
            <div className="container">
                <Link className="navbar-brand" to="/">
                    <img src={logo} width="40" height="40" alt="" />
                </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        { user ?
                            (
                                <>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact
                                            to="/dashboard/proposals/accepted">All accepted proposal</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact
                                            to="/dashboard/proposals">My proposals</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className="nav-link" exact
                                            to="/dashboard/proposals/add">Submit a proposal</NavLink>
                                    </li>
                                    { user.canAcceptProposal ? (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" exact
                                                     to="/dashboard/proposals/accept">List of proposals</NavLink>
                                        </li>
                                    ) : null }

                                    { user.canShowAllProposals ? (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" exact
                                                     to="/dashboard/proposals/list">Show all proposals</NavLink>
                                        </li>
                                    ) : null }

                                </>
                            ) : null
                        }

                    </ul>
                    <ul className="navbar-nav ml-auto">
                        { user ?
                            (
                                <>
                                    { user.isAdmin ? (
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/admin">Admin Panel</NavLink>
                                        </li>
                                        ) : null
                                    }
                                    <li className="nav-item dropdown">
                                        <a id="navbarDropdown" className="nav-link dropdown-toggle" href="/#" role="button"
                                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            {`${user.firstName} ${user.lastName}`}
                                        </a>

                                        <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                            <Link to="/dashboard/panel" className="dropdown-item">
                                                User panel
                                            </Link>
                                            <Link to="/dashboard/panel/details" className="dropdown-item">
                                                User details
                                            </Link>
                                            <a onClick={logout} className="dropdown-item" href="/#">
                                                Logout
                                            </a>
                                        </div>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a onClick={login} className="nav-link" href="/#">Login</a>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">Register</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </div>
            </div>
        </nav>
    );

}

export default Menu;
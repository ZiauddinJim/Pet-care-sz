import React, { useContext } from "react";
import MyContainer from "../MyComponents/MyContainer";
import { Link, NavLink } from "react-router";
import logo from "../assets/logo.png";
import MyLink from "../MyComponents/MyLink";
import { BiMenuAltLeft } from "react-icons/bi";
import AuthContext from "../Providers/AuthContext";
import userIcon from "../assets/userIcon.png"
import toast from "react-hot-toast";

const Navbar = () => {
    const { user, signOutFun } = useContext(AuthContext)
    // console.log(user);
    const links = (
        <>
            <li>
                <MyLink to={'/'}>Home</MyLink>
            </li>
            <li>
                <MyLink to={'/services'}>Services</MyLink>
            </li>
            <li>
                <MyLink to={'/profile'}>My Profile</MyLink>
            </li>
        </>
    );

    const handleLogout = () => {
        // console.log("Click logout");
        signOutFun()
            .then(() => {
                toast.success("Logout successful!")
            }).catch((error) => {
                // An error happened.
                toast.error("Logout failed: " + error.message);
            });
    }

    return (
        <div className="bg-base-100 shadow-lg">
            <MyContainer className={"navbar"}>
                <div className="navbar-start items-center ">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <BiMenuAltLeft />
                        </div>
                        <ul
                            tabIndex="-1"
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                        >
                            {links}
                        </ul>
                    </div>
                    <Link to={"/"} className="flex items-center gap-1">
                        <img src={logo} alt="" className="w-8 h-8" />
                        <h1 className="text-primary font-bold text-lg lg:text-2xl ">Pet Care</h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1">{links}</ul>
                </div>
                <div className="navbar-end">
                    {
                        user
                            ? <div className="flex gap-2">
                                <div className="dropdown dropdown-center cursor-pointer">
                                    <div tabIndex={0} role="button" className="md:tooltip md:tooltip-left" data-tip={user.displayName}>
                                        <img src={user.photoURL || userIcon} alt="User Picture" className="w-12 h-12 rounded-full border-2 border-[#003453] p-1" />
                                    </div>
                                    <ul tabIndex="-1"
                                        className="menu  dropdown-content z-50 bg-base-100 rounded-box mt-3 w-52 p-2 shadow">
                                        <p className="font-medium text-lg mb-3">My Account</p>
                                        <Link to={"/profile"} className="btn btn-outline btn-primary mb-2">Profile</Link>

                                        <li onClick={handleLogout} className="btn btn-outline btn-primary">Logout</li>
                                    </ul>
                                </div>
                                <button onClick={handleLogout} className="btn btn-primary font-medium"> Logout</button>
                            </div>
                            : <Link to={'/auth/login'} className="btn btn-primary font-medium">Login / Register</Link>
                    }
                </div>
            </MyContainer>
        </div>
    );
};

export default Navbar;

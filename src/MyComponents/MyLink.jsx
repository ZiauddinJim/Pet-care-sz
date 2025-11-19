import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
    return (
        <NavLink to={to}
            className={({ isActive }) => isActive ? "text-secondary border border-secondary" : `${className} text-primary hover:text-secondary`}>
            {children}
        </NavLink>
    );
};

export default MyLink;

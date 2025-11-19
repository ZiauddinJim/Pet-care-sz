import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home";
import Services from "../Pages/Services";
import Profile from "../Pages/Profile";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Error404 from "../Error/Error404";
import ServiceDetails from "../Components/ServiceDetails";
import PrivateRoute from "../Providers/PrivateRoute";
import ForgetPassword from "../Pages/ForgetPassword";
import FunctionalError from "../Error/FunctionalError";

const Root = createBrowserRouter([
    {
        path: '/',
        Component: HomeLayout,
        errorElement: <FunctionalError />,
        children: [
            {
                path: '/',
                Component: Home,
            },
            {
                path: '/services',
                Component: Services,
            },
            {
                path: '/service/:id',
                element:
                    <PrivateRoute>
                        <ServiceDetails />
                    </PrivateRoute>,
            },
            {
                path: '/profile',
                element:
                    <PrivateRoute>
                        <Profile />
                    </PrivateRoute>,
            }
        ]
    },
    {
        path: "/auth",
        Component: AuthLayout,
        errorElement: <FunctionalError />,
        children: [
            {
                path: "/auth/login",
                Component: Login,
            },
            {
                path: "/auth/register",
                Component: Register,
            },
            {
                path: "/auth/forgetPassword",
                Component: ForgetPassword,
            }
        ]
    },
    {
        path: '/*',
        Component: Error404,
    }
])

export default Root;
import React, { useContext, useEffect, useRef, useState } from 'react';
import { BsEye } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { MdOutlineMail } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router';
import login from "../assets/login.png"
import { FaRegEyeSlash } from 'react-icons/fa';
import AuthContext from '../Providers/AuthContext';
import toast from 'react-hot-toast';
import logo from "../assets/logo.png"
import MyContainer from '../MyComponents/MyContainer';
import Spinner from '../Components/Spinner';


const Login = () => {
    const location = useLocation();
    // console.log(location);
    const [show, setShow] = useState(false);
    const navigate = useNavigate()
    const { signInFun, googleSignInFun, setEmail, setLoading, loading } = useContext(AuthContext);
    const emailRef = useRef(null);

    // useEffect(() => {
    //     setLoading(true)
    //     const timer = setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    //     return () => clearTimeout(timer)
    // }, [setLoading])
    // if (loading) return <Spinner />;

    const handleSignIn = (e) => {
        e.preventDefault();
        // console.log("Click");
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log({ email, password });

        signInFun(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                toast.success(`Welcome back, ${user.displayName}!`);
                // console.log(user);
                navigate(`${location.state ? location.state : '/'}`) // if using react-router
                e.target.reset();
            })
            .catch((error) => {
                // Handling all Firebase auth errors
                let message = '';
                switch (error.code) {
                    case 'auth/invalid-email':
                        message = 'Invalid email address!';
                        break;
                    case 'auth/user-disabled':
                        message = 'This user has been disabled!';
                        break;
                    case 'auth/user-not-found':
                        message = 'No user found with this email!';
                        break;
                    case 'auth/wrong-password':
                        message = 'Incorrect password!';
                        break;
                    case 'auth/invalid-credential':
                        message = 'Incorrect email or password!';
                        break;
                    case 'auth/network-request-failed':
                        message = 'Network error! Please check your internet connection and try again.';
                        break;
                    default:
                        message = 'Something went wrong. Please try again!';
                }
                toast.error(message);
                // console.error(error);
            });
    }
    const handleGoogle = () => {
        googleSignInFun()
            .then((userCredential) => {
                const user = userCredential.user;
                // console.log(user);

                toast.success(`Welcome, ${user.displayName || 'User'}! `);
                navigate(`${location.state ? location.state : '/'}`);
            })
            .catch((err) => {
                const error = err.message;
                // console.error(error);

                toast.error(
                    error.includes('popup-closed-by-user')
                        ? 'Google Sign-In cancelled.'
                        : 'Failed to sign in with Google. Please try again.');
            });
    };

    const handleForgetPassword = () => {
        // console.log(emailRef.current.value);
        const emailValue = emailRef.current?.value;
        // use sessionStorage or Context API
        // if (emailValue) {
        //     sessionStorage.setItem("userEmail", emailValue);
        // }
        setEmail(emailValue);
        navigate("/auth/forgetPassword");


    }


    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <title>Login | Pet Care</title>
            <MyContainer className="flex flex-col md:flex-row-reverse items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 shadow-xl rounded-md">
                <div className="md:max-w-md w-full px-4 py-4 ">

                    {/* Top */}
                    <Link to={"/"} className="flex items-center gap-1 w-fit">
                        <img src={logo} alt="" className="w-8 h-8" />
                        <h1 className="text-primary font-bold text-lg lg:text-2xl ">Pet Care</h1>
                    </Link>

                    <form className=' flex flex-col justify-center' onSubmit={handleSignIn}>
                        {/* Top */}
                        <div className="mb-12 text-center">
                            <h1 className="text-2xl font-bold mt-5 text-primary">Log in to your accout</h1>
                            <p className='text-gray-500 mt-2'>Enter your email below <br /> to login to your account</p>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="label text-primary">Email</label>
                            <div className="relative flex items-center">
                                <input name="email" ref={emailRef} type="text" required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter email" />
                                <MdOutlineMail className='text-slate-500' />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mt-8">
                            <label className="label text-primary">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type={show ? "text" : "password"} required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter password" />
                                <span onClick={() => setShow(!show)} className='text-slate-500 hover:text-secondary cursor-pointer'>
                                    {show ? <BsEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                        </div>

                        {/* Forget password */}
                        <div className="mt-8">
                            <button onClick={handleForgetPassword} className="text-secondary font-medium text-sm hover:underline">
                                Forgot Password?
                            </button>
                        </div>

                        {/* Button */}
                        <div className="mt-12">
                            <button type="submit" className="btn hover:btn-primary border-primary w-full shadow font-medium">
                                Sign in
                            </button>
                        </div>
                    </form>
                    <h3 className="text-[15px] mt-6 text-slate-600">Don't have an account <Link to={"/auth/register"} className="text-secondary font-medium hover:underline ml-1 whitespace-nowrap">Register here</Link></h3>

                    {/* OR */}
                    <div className="my-6 flex items-center gap-4">
                        <hr className="w-full border-slate-300" />
                        <p className="text-sm text-slate-900 text-center">or</p>
                        <hr className="w-full border-slate-300" />
                    </div>

                    {/* Google */}
                    <button onClick={handleGoogle} className="btn hover:btn-primary font-medium border-primary shadow w-full">
                        <FcGoogle />
                        Signin with Google
                    </button>
                </div>
                {/* Right side */}
                <div className="w-full h-full rounded-xl p-8 flex-1 hidden md:block">
                    <img src={login} className="w-full object-contain" alt="login-image" />
                </div>
            </MyContainer>
        </div>
    );
};

export default Login;
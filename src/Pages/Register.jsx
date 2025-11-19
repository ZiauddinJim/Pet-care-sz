import React, { useContext, useEffect, useState } from 'react';
import signUp from "../assets/sign-up.png";
import { Link, useLocation, useNavigate } from 'react-router';
import { MdOutlineMail } from 'react-icons/md';
import { FcGoogle } from 'react-icons/fc';
import AuthContext from '../Providers/AuthContext';
import toast from 'react-hot-toast';
import firebaseSignUpErrorHandle from '../Utils/firebaseSignUpErrorHandle';
import { BsEye } from 'react-icons/bs';
import { FaRegEyeSlash } from 'react-icons/fa';
import Spinner from '../Components/Spinner';


const Register = () => {
    const { createUserSignInWithEmailFun,
        updateProfileFun,
        setLoading,
        signOutFun,
        setUser,
        googleSignInFun,
    } = useContext(AuthContext);
    const navigate = useNavigate();
    const [show, setShow] = useState(false)
    const location = useLocation();

    // Password validation regex
    const hasUppercase = (s) => /[A-Z]/.test(s);
    const hasLowercase = (s) => /[a-z]/.test(s);
    const isLongEnough = (s) => s.length >= 6;

    const validatePassword = (pw) => {
        if (!hasUppercase(pw)) return "Password must contain at least one uppercase letter.";
        if (!hasLowercase(pw)) return "Password must contain at least one lowercase letter.";
        if (!isLongEnough(pw)) return "Password must be at least 6 characters long.";
        return null;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const displayName = form.name.value;
        const photoURL = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;
        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }
        createUserSignInWithEmailFun(email, password)
            .then(() => {
                // Update profile
                updateProfileFun(displayName, photoURL)
                    .then(() => {
                        // signOut
                        signOutFun()
                            .then(() => {
                                toast.success("Signup successful. Continue with Login.");
                                e.target.reset();
                                setUser(null)
                                navigate("/auth/login");
                            })
                    })
            })
            .catch(firebaseSignUpErrorHandle)
            .finally(() => setLoading(false));
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
            })
            .finally(() => setLoading(false));
    };

    // useEffect(() => {
    //     setLoading(true)
    //     const timer = setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    //     return () => clearTimeout(timer)
    // }, [setLoading])
    // if (loading) return <Spinner />;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
            <title>Register | Pet Care</title>
            <div className="grid md:grid-cols-2 items-center gap-4 max-md:gap-8 max-w-6xl max-md:max-w-lg w-full p-4 [box-shadow:0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
                <div className="md:max-w-md w-full px-4 py-4">
                    <form onSubmit={handleRegister}>
                        {/* Top */}
                        <div className="mb-12">
                            <h1 className="text-slate-900 text-3xl font-bold">Join My Website Today</h1>
                        </div>
                        {/* Name */}
                        <div>
                            <label className="label text-primary">Name</label>
                            <div className="relative flex items-center">
                                <input name="name" type="text" required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter your name" />
                            </div>
                        </div>
                        {/* Email */}
                        <div className="mt-8">
                            <label className="label text-primary">Email</label>
                            <div className="relative flex items-center">
                                <input name="email" type="email" required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter email" />
                                <MdOutlineMail className='text-slate-500' />
                            </div>
                        </div>
                        {/* Photo URL */}
                        <div className="mt-8">
                            <label className="label text-primary">Photo URL</label>
                            <div className="relative flex items-center">
                                <input name="photoURL" type="text" required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter your photo URL" />
                            </div>
                        </div>
                        {/* Password */}
                        <div className="mt-8">
                            <label className="label text-primary">Password</label>
                            <div className="relative flex items-center">
                                <input name="password" type={show ? "text" : "password"} required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter password" />
                                <span onClick={() => setShow(!show)} className='text-slate-500 hover:text-secondary cursor-pointer' >
                                    {show ? <BsEye /> : <FaRegEyeSlash />}
                                </span>
                            </div>
                        </div>

                        {/* Remember & Forget password */}
                        <div className="flex items-center mt-8">
                            <input type="checkbox" required defaultChecked={false} className="checkbox checkbox-sm rounded text-secondary" />
                            <label className="ml-3 block text-sm text-slate-900">
                                I agree to the <a href="/terms">Terms</a> and <a href="/privacy">Privacy Policy</a>
                            </label>
                        </div>

                        {/* Button */}
                        <div className="mt-12">
                            <button type="submit" className="btn hover:btn-primary border-primary w-full shadow font-medium">
                                Register Now
                            </button>
                        </div>
                    </form>
                    <h3 className="text-[15px] mt-6 text-slate-600">Already an account? <Link to={"/auth/login"} className="text-secondary font-medium hover:underline ml-1 whitespace-nowrap">Login here</Link></h3>
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
                <div className="w-full h-full flex items-center rounded-xl p-8">
                    <img src={signUp} className="w-full object-contain" alt="login-image" />
                </div>
            </div>
        </div>
    );
};

export default Register;
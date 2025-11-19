import React, { useContext, useEffect, useRef } from 'react';
import logo from "../assets/logo.png"
import { Link } from 'react-router';
import { MdOutlineMail } from 'react-icons/md';
import AuthContext from '../Providers/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Spinner from '../Components/Spinner';

const ForgetPassword = () => {
    const { resetPasswordFun, email, setEmail, setLoading, loading } = useContext(AuthContext)
    const emailRef = useRef();

    // useEffect(() => {
    //     const saveEmail = sessionStorage.getItem("userEmail")
    //     if (saveEmail && emailRef.current) {
    //         emailRef.current.value = saveEmail;
    //     }
    // }, []);

    useEffect(() => {
        if (email && emailRef.current) {
            emailRef.current.value = email;
        }
    }, [email])
    // useEffect(() => {
    //     setLoading(true)
    //     const timer = setTimeout(() => {
    //         setLoading(false)
    //     }, 500)
    //     return () => clearTimeout(timer)
    // }, [setLoading])
    // if (loading) return <Spinner />;


    const handleReset = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        resetPasswordFun(email)
            .then(() => {
                window.open("https://mail.google.com/", "_blank");
                // Password reset email sent!
                Swal.fire({
                    title: "Password Reset Email Sent!",
                    text: `Please check your inbox for reset instructions.`,
                    icon: "success",
                    confirmButtonColor: "#003453",
                });
            })
            .catch((errorCode) => {
                switch (errorCode) {
                    case "auth/invalid-email":
                        toast.error("Invalid email address format!");
                        break;
                    case "auth/user-not-found":
                        toast.error("No user found with this email!");
                        break;
                    case "auth/missing-email":
                        toast.error("Please enter your email address!");
                        break;
                    case "auth/too-many-requests":
                        toast.error("Too many requests. Please try again later!");
                        break;
                    default:
                        toast.error("Something went wrong. Please try again!");
                        break;
                }
            });
        // sessionStorage.removeItem("userEmail"); 
        setEmail(null)

    }

    return (
        <div
            className="flex h-auto min-h-screen items-center justify-center overflow-x-hidden bg-[url('https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/auth/auth-background-2.png')] bg-cover bg-center bg-no-repeat py-10"
        >
            <title>Forget Password | Pet Care</title>
            <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="bg-base-100 shadow-base-300/20 z-1 w-full space-y-6 rounded-xl p-6 shadow-md sm:max-w-md lg:p-8">
                    {/* logo */}
                    <div className="flex items-center gap-1">
                        <img src={logo} alt="" className="w-8 h-8" />
                        <h1 className="text-primary font-bold text-lg lg:text-2xl ">Pet Care</h1>
                    </div>
                    {/* header */}
                    <div>
                        <h3 className="text-base-content mb-1.5 text-2xl font-semibold">Forgot Password?</h3>
                        <p className="text-base-content/80">Enter your email and we'll send you instructions to reset your password</p>
                    </div>
                    {/* form */}
                    <form onSubmit={handleReset} className="mb-4 space-y-4">
                        <div>
                            <label className="label-text">Email address*</label>
                            <div className="relative flex items-center">
                                <input name="email" ref={emailRef} type="text" required className="w-full text-slate-700 text-sm border-b border-slate-300 focus:border-secondary pl-2 pr-8 py-3 outline-none" placeholder="Enter email" />
                                <MdOutlineMail className='text-slate-500' />
                            </div>
                        </div>
                        <button type='submit' className="btn btn-lg btn-primary btn-gradient btn-block">Send Reset Link</button>
                    </form>

                    <div className="flex justify-center">
                        <Link to={"/auth/login"} className="underline text-secondary font-normal">Back to login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;
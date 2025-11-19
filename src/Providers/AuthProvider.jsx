import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { app } from '../Firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // console.log({ loading, user });
    // ForgetPassword implement
    const [email, setEmail] = useState(null);

    const createUserSignInWithEmailFun = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const updateProfileFun = (displayName, photoURL) => {
        setLoading(true);
        return updateProfile(auth.currentUser, { displayName, photoURL })
    }

    const signOutFun = () => {
        setLoading(true);
        return signOut(auth)
    }

    const signInFun = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password)
    }

    const googleSignInFun = () => {
        setLoading(true);
        return signInWithPopup(auth, provider)
    }

    const resetPasswordFun = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const userInfo = {
        user,
        setUser,
        loading,
        setLoading,
        createUserSignInWithEmailFun,
        updateProfileFun,
        signOutFun,
        signInFun,
        googleSignInFun,
        resetPasswordFun,
        email,
        setEmail,
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        });
        // Cleanup function create
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    )
};

export default AuthProvider;
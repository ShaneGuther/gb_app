import React, { createContext, useState } from 'react';
import firebase from 'firebase';

export const AuthContext = createContext({});

export const AuthProvider = ({children}) =>{
    const [user, setUser] = userState(null);
    return(
        <AuthContext.Provider
        value={{
            user,
            setUser,
            login: async
        }}
    )
}
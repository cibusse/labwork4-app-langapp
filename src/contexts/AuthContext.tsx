/* import React, { createContext, useContext, useState } from 'react';

// Define the types for your context
interface AuthContextType {
  currentUser: any; // Replace 'any' with your user type if available
  signup: (email: string, password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>; // Add this line
  updatePassword: (password: string) => Promise<void>; // Add this line
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provide your context to the application
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null); // Replace 'any' with your user type

  const signup = async (email: string, password: string) => {
    // Implement signup logic here
  };

  const login = async (email: string, password: string) => {
    // Implement login logic here
  };

  const logout = async () => {
    // Implement logout logic here
  };

  const resetPassword = async (email: string) => {
    // Implement password reset logic here
  };

  // Implement updateEmail logic
  const updateEmail = async (email: string) => {
    // Add logic to update email
  };

  // Implement updatePassword logic
  const updatePassword = async (password: string) => {
    // Add logic to update password
  };

  return (
    <AuthContext.Provider value={{ currentUser, signup, login, logout, resetPassword, updateEmail, updatePassword }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
 */


/* import React, { useContext, useState, useEffect, ReactNode } from 'react';
import { auth } from '../firebase'; // Adjust the import based on your Firebase setup

const AuthContext = React.createContext<any>(null);

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login: (email: string, password: string) => auth.signInWithEmailAndPassword(email, password),
    // Add other auth functions here
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}; */


import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { auth } from '../firebase'; // Adjust the import based on your file structure
import { User, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateEmail as firebaseUpdateEmail, updatePassword as firebaseUpdatePassword, sendPasswordResetEmail } from 'firebase/auth';

interface AuthContextProps {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password).then(() => {});
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password).then(() => {});
  };

  const logout = () => {
    return signOut(auth);
  };

  const resetPassword = (email: string) => {
    return sendPasswordResetEmail(auth, email);
  };

  const updateEmail = (email: string) => {
    if (currentUser) {
      return firebaseUpdateEmail(currentUser, email);
    }
    return Promise.reject(new Error("No current user"));
  };

  const updatePassword = (password: string) => {
    if (currentUser) {
      return firebaseUpdatePassword(currentUser, password);
    }
    return Promise.reject(new Error("No current user"));
  };

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
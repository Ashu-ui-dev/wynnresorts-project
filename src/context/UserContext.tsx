import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of user data
type User = {
  email: string;
  phoneNumber: string;
  medium?: number;
  communicationStream : string;
};

// Define the context value type
type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

// Create the context with initial empty fallback
const UserContext = createContext<UserContextType | undefined>(undefined);

// Props for the provider
type UserProviderProps = {
  children: ReactNode;
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User>({
    email: '',
    phoneNumber: '',
    medium: 0,
    communicationStream: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

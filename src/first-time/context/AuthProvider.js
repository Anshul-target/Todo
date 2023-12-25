import { useContext, createContext } from "react";


export const AuthContext = createContext({
    isLogged: false
});



export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = AuthContext.Provider
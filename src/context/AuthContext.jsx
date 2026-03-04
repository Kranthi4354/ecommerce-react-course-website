import { Children, createContext, useState } from "react";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
    
    function signUp(email,password){
        // Sign up logic here
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        if (users.find(user => user.email === email)){
            return {success:false, message: "User already exists"};
        }

        const newUser = {email, password};
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("currentUser", JSON.stringify(newUser));
        setUser({email});
        return {success:true, message: "Sign up successful"};
    }
    function login(email, password){
        // Login logic here
         const users = JSON.parse(localStorage.getItem("users") || "[]");

         const user = users.find(user => user.email === email && user.password === password);
         if (!user){
            return {success:false, message: "Invalid email or password"};
         }
         localStorage.setItem("currentUser", email);
         setUser({email});
         return {success:true, message: "Login successful"};

    }

    function logout(){
        // Logout logic here
        localStorage.removeItem("currentUser");
        setUser(null);
        alert("User logged out successfully!");
    }

    return (
        <AuthContext.Provider value={{signUp, user, logout, login}}>
            {children}
        </AuthContext.Provider>
    );
}
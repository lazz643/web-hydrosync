"use client"
import React, { useState } from 'react';
import axios from 'axios';
import styles from "@/app/UI/Login/login.module.css";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const LoginPageAdmin = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();
    

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log("Username:", name);
        console.log("Password:", password);
        
        
        try {
            const response = await axios.post("http://localhost:8000/api/loginadmin", { username:name, password });
            
            // Handle successful login, e.g., redirect to dashboard or set authentication token
            console.log(response.data); // You can handle response accordingly
            const { id_admin,username, code, image} = response.data.users;
            console.log(username);
            console.log(id_admin);
            console.log(code);
            console.log(image);
             // Save data to localStorage
            localStorage.setItem('admin', JSON.stringify({ id_admin, code, username, image }));
            router.push("/Dashboard", { id_admin, username });
        } catch (error) {
            // Handle error, e.g., show error message to user
            console.error('Login failed:', error);
            alert("Username atau Password Tidak Sesuai ");
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleLogin} className={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
                {/* Link to RegisterAdmin page */}
                <div className={styles.registerLink}>
                    Belum memiliki akun? <Link href="/RegisterAdmin">Silahkan klik <span>Register</span></Link>
                </div>
            </form>
            
        </div>
    );
};

export default LoginPageAdmin;

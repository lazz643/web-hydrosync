"use client";
import React, { useState } from "react";
import axios from "axios";
import styles from "@/app/UI/Login/login.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://7d75-202-46-68-200.ngrok-free.app/api/login", { name: username, password });

      // Handle successful login, e.g., redirect to dashboard or set authentication token
      console.log(response.data); // You can handle response accordingly
      const { id_user, meter_id, name, notelp, image } = response.data.users;
      console.log(name);
      console.log(id_user);
      console.log(meter_id);
      console.log(notelp);
      console.log(image);
      // Save data to localStorage
      localStorage.setItem("user", JSON.stringify({ id_user, meter_id, name, notelp, image }));
      router.push("/UserDashboard", { id_user, meter_id });
    } catch (error) {
      // Handle error, e.g., show error message to user
      console.error("Login failed:", error);
      alert("Username atau Password Tidak Sesuai ");
    }
  };

  return (
    <>
      <form onSubmit={handleLogin} className={styles.form}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default LoginPage;

"use client";

import styles from "@/app/UI/Register/Register.module.css";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const RegisterPageAdmin = () => {
  const [Field, setField] = useState({
    username: "",
    code: "",
    image: "-",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter

  const changeFieldHandler = (field, value) => {
    setField({
      ...Field,
      [field]: value,
    });
  };

  const onSubmitChange = async () => {
    console.log("Mengirim data ke server...");
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/api/addadmin", Field);
      console.log("Respon dari server:", response);
      setLoading(false);
      alert("Pendaftaran akun berhasil");
      router.push("/LoginAdmin"); // Redirect to /app/Login upon successful registration
    } catch (err) {
      console.error("Terjadi kesalahan:", err);
      setLoading(false);
      if (err.response) {
        if (err.response.status === 400) {
          alert("Invalid username or password combination");
        } else if (err.response.status === 500) {
          alert("Server error: Unable to register");
        } else if (err.response.status === 422) {
          alert("Please complete all fields");
        } else {
          alert(`Error: ${err.response.status} - ${err.response.statusText}`);
        }
      } else if (err.request) {
        alert("No response received from server");
      } else {
        alert("Connection error: Please wait and try again...");
      }
    }
  };

  return (
    <form
      action=""
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onSubmitChange();
      }}
    >
      <input type="text" placeholder="Username" value={Field.username} onChange={(e) => changeFieldHandler("username", e.target.value)} />
      <input type="text" placeholder="Kode Admin" value={Field.code} onChange={(e) => changeFieldHandler("code", e.target.value)} />
      <input type="password" placeholder="Password" value={Field.password} onChange={(e) => changeFieldHandler("password", e.target.value)} />
      <button type="submit" disabled={loading}>
        Register
      </button>
    </form>
  );
};

export default RegisterPageAdmin;

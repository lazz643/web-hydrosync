"use client"

import styles from "@/app/UI/Register/Register.module.css";
import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from "next/navigation"; // Import useRouter from Next.js

const RegisterPage = () => {
  const [userField, setUserField] = useState({
    name: "",
    meter_id: "",
    notelp: "",
    image: "-",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize useRouter
  const changeUserFieldHandler = (field, value) => {
    setUserField({
      ...userField,
      [field]: value
    });
  }

  const onSubmitChange = async () => {
    console.log("Mengirim data ke server...");
    setLoading(true);
    try {
      const response = await axios.post("https://7d75-202-46-68-200.ngrok-free.app/api/addnew", userField);
      console.log("Respon dari server:", response);
      setLoading(false);
      alert("Pendaftaran akun berhasil")
      router.push('/Login'); // Redirect to /app/Login upon successful registration
    } catch (err) {
      console.log("Terjadi kesalahan:", err);
      setLoading(false);
      if (err.response && err.response.status === 400) {
        alert("Kombinasi Meter id dan Nomor Telpon tidak terdaftar sebagai pelanggan PDAM");
      } else if (err.response && err.response.status === 500) {
        alert("Nomor meter atau Username sudah digunakan");
        router.push('/Login')
      } else if (err.response && err.response.status === 422) {
        alert('Harap lengkapi pengisian data');
      } else if (err.response) {
        alert("Terjadi kesalahan koneksi, harap login kembali");
      }
    }
  }

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={(e) => {
        e.preventDefault(); // Prevents the default form submission behavior
        onSubmitChange();
      }}>
        <input type="text" placeholder="Username" value={userField.name} onChange={(e) => changeUserFieldHandler('name', e.target.value)} />
        <input type="text" placeholder="Nomor Telepon" value={userField.notelp} onChange={(e) => changeUserFieldHandler('notelp', e.target.value)} />
        <input type="text" placeholder="Nomor Meter" value={userField.meter_id} onChange={(e) => changeUserFieldHandler('meter_id', e.target.value)} />
        <input type="password" placeholder="Password" value={userField.password} onChange={(e) => changeUserFieldHandler('password', e.target.value)} />
        <button type="submit" disabled={loading}>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;

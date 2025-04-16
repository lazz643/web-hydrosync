"use client"
import React, { useState } from 'react';
import styles from "@/app/UI/Dashboard/PelangganBaru/pelangganbaru.module.css";
import { useRouter } from 'next/navigation'; // Import useRouter
import axios from 'axios'; // Import axios

const PelangganBaru = () => {
    const [userField, setUserField] = useState({
        status: "1",
        name: "",
        alamat: "",
        meter_id: "",
        notelp: ""
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Initialize useRouter

    const changeUserFieldHandler = (field, value) => {
        setUserField({
            ...userField,
            [field]: value
        });
    }

    const onSubmitChange = async (event) => {
        event.preventDefault(); // Prevent default form submission
        console.log("Mengirim data ke server...");
        setLoading(true);
        try {
            const response = await axios.post("https://7d75-202-46-68-200.ngrok-free.app/api/addPelanggan", userField);
            console.log("Respon dari server:", response);
            setLoading(false);
            alert("Pendaftaran Berhasil")
            router.push('/Dashboard/Pelanggan'); // Redirect to /app/Login upon successful registration
        } catch (err) {
            console.log("Terjadi kesalahan:", err);
            setLoading(false);
            if (err.response && err.response.status === 500) {
                alert("Nomor meter sudah digunakan");
            } else if (err.response && err.response.status === 422) {
                alert('Harap lengkapi pengisian data');
            } else if (err.response) {
                alert("Terjadi kesalahan koneksi, harap coba kembali");
            }
        }
    }

    return (
        <div className={styles.container}>
            <form onSubmit={onSubmitChange} className={styles.form}>
                <input
                    type="text"
                    placeholder="Nama"
                    name="Nama"
                    value={userField.name}
                    onChange={(e) => changeUserFieldHandler('name', e.target.value)}
                    required
                />
                <textarea
                    name="Alamat"
                    id="Alamat"
                    rows={16}
                    placeholder="Alamat"
                    value={userField.alamat}
                    onChange={(e) => changeUserFieldHandler('alamat', e.target.value)}
                    required
                />
                <input
                    type="number"
                    placeholder="Nomor Telepon"
                    name="Nomor Telepon"
                    value={userField.notelp}
                    onChange={(e) => changeUserFieldHandler('notelp', e.target.value)}
                    required
                />
                <input
                    type="text"
                    placeholder="Meter Id"
                    name="Nomor Meter"
                    value={userField.meter_id}
                    onChange={(e) => changeUserFieldHandler('meter_id', e.target.value)}
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

export default PelangganBaru;

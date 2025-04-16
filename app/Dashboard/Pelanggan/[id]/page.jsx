"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import styles from "@/app/UI/Dashboard/Pelanggan/singleuser.module.css";
import { useRouter } from "next/navigation";

const SingleUser = () => {
    const [userData, setUserData] = useState({
        status: "",
        name: "",
        alamat: "",
        notelp: "",
        meter_id: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUserData = async () => {
            const storedUser = localStorage.getItem('pelanggan');
            if (storedUser) {
                const { id_plgn } = JSON.parse(storedUser);
                try {
                    const result = await axios.get(`http://localhost:8000/api/usersplgn/${id_plgn}`);
                    const user = result.data.users;
                    setUserData({
                        status: user.status,
                        name: user.name,
                        alamat: user.alamat,
                        notelp: user.notelp,
                        meter_id: user.meter_id
                    });
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            }
        };
        fetchUserData();
    }, []);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name.toLowerCase().replace(" ", "_")]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storedUser = localStorage.getItem('pelanggan');
        if (storedUser) {
            const { id_plgn } = JSON.parse(storedUser);
            try {
                await axios.put(`http://localhost:8000/api/usersupdate/${id_plgn}`, userData);
                alert("Data berhasil diperbarui");
                setIsEditing(false);
                // Redirect to /Dashboard/Pelanggan after successful update
                router.push("/Dashboard/Pelanggan");
            } catch (err) {
                console.error("Failed to update user data:", err);
            }
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.InfoContainer}>
                <div className={styles.imgContainer}>
                    <Image src="/noavatar.png" alt="User Avatar" fill />
                </div>
            </div>
            <div className={styles.FormContainer}>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <label>Status</label>
                    <input 
                        type="text" 
                        name="status" 
                        value={userData.status} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditing} 
                    />
                    <label>Nama</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={userData.name} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditing} 
                    />
                    <label>Alamat</label>
                    <textarea 
                        name="alamat" 
                        id="Alamat" 
                        rows={16} 
                        value={userData.alamat} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditing} 
                    />
                    <label>Nomor Telepon</label>
                    <input 
                        type="text" 
                        name="notelp" 
                        value={userData.notelp} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditing} 
                    />
                    <label>Nomor Meter</label>
                    <input 
                        type="text" 
                        name="meter_id" 
                        value={userData.meter_id} 
                        onChange={handleChange} 
                        required 
                        disabled={!isEditing} 
                    />
                    {isEditing ? (
                        <>
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </>
                    ) : (
                        <button type="button" onClick={handleEditClick}>Edit</button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default SingleUser;

"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "@/app/UI/Dashboard/Pelanggan/pelanggan.module.css";
import Search from "@/app/UI/Dashboard/Search/search";
import Link from "next/link";
import Pagination from "@/app/UI/Dashboard/Pagination/pagination";
import {useRouter} from "next/navigation";

const Pelanggan = () => {
    const [emptyMessage, setEmptyMessage] = useState('No transactions found.');
    const [userData, setUserData] = useState([]);
    const router = useRouter();
    //const localAccount = true; // Placeholder for localAccount

    const fetchUser = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/users`);
            console.log(result.data);
            if (result.data.results && result.data.results.length > 0) {
                setUserData(result.data.results);
                setEmptyMessage(''); // Clear empty message if data is fetched
            } else {
                setEmptyMessage('Data pelanggan Tidak Ditemukan');
                setUserData([]);
            }
        } catch (err) {
            console.log("Something went wrong:", err);
            setEmptyMessage('Failed to load data.');
            setUserData([]);
        }
    }, []);

    useEffect(() => {
            fetchUser();
    }, [fetchUser]);

    const handleViewClick = (id_plgn) => {
        const selectedUser = userData.find(user => user.id_plgn === id_plgn);
        localStorage.setItem('pelanggan', JSON.stringify(selectedUser));
        router.push(`/Dashboard/Pelanggan/${id_plgn}`);
    };

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Search placeholder={"Search for a user ..."} />
                <Link href="/Dashboard/PelangganBaru">
                    <button className={styles.addButton}>+ Pelanggan</button>
                </Link>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID Pelanggan</th>
                        <th>Status</th>
                        <th>Pelanggan</th>
                        <th>Alamat</th>
                        <th>Nomor Meter</th>
                        <th>Telepon</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.length > 0 ? (
                        userData.map((user, index) => (
                            <tr key={index}>
                                <td>{user.id_plgn}</td>
                                <td>{user.status}</td>
                                <td>{user.name}</td>
                                <td>{user.alamat}</td>
                                <td>{user.meter_id}</td>
                                <td>{user.notelp}</td>
                                <td>
                                    <div className={styles.buttons}>
                                        <button className={`${styles.button} ${styles.view}`} onClick={() => handleViewClick(user.id_plgn)}>
                                            Lihat
                                        </button>
                                        <button className={`${styles.button} ${styles.delete}`}>
                                            Hapus
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">{emptyMessage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Pagination />
        </div>
    );
}

export default Pelanggan;

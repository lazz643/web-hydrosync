"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import styles from "@/app/UI/UserDashboard/RiwayatTransaksi/RiwayatTransaksi.module.css";
import Cari from "@/app/UI/UserDashboard/Cari/cari";
import Page from "@/app/UI/UserDashboard/page/page";
import { useRouter } from "next/navigation";

const HistoryBuy = () => {
    const [emptymessage, setEmptymessage] = useState('No transactions found.');
    const [userData, setUserData] = useState([]);
    const [localAccount, setLocalAccount] = useState(null);
    const [filteredData, setFilteredData] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
          setLocalAccount(storedUser);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (localAccount) {
            try {
                const result = await axios.get(`http://localhost:8000/api/users4/${localAccount.id_user}`);
                if (result.data.users && result.data.users.length > 0) {
                    setUserData(result.data.users);
                    setFilteredData(result.data.users);
                } else {
                    setEmptymessage('No transactions found.');
                    setUserData([]);
                    setFilteredData([]);
                }
            } catch (err) {
                console.log("Something went wrong:", err);
                setEmptymessage('Failed to load data.');
                setUserData([]);
                setFilteredData([]);
            }
        }
    }, [localAccount]);

    useEffect(() => {
        if (localAccount) {
            fetchUser();
        }
    }, [localAccount, fetchUser]);

    const handleSearch = (searchTerm) => {
        if (searchTerm === "") {
            setFilteredData(userData);
        } else {
            const filteredUserData = userData.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.id_transaksi.toString().includes(searchTerm) ||
                user.meter_id.toString().includes(searchTerm) || 
                user.waktu_beli.toString().includes(searchTerm)
            );
            console.log("Filtered data: ", filteredUserData)
            setFilteredData(filteredUserData);
        }
    };

    const handleViewClick = (id_transaksi) => {
        const selectedUser = userData.find(user => user.id_transaksi === id_transaksi);
        localStorage.setItem('payment', JSON.stringify(selectedUser));
        router.push(`/UserDashboard/HistoryBuy/${id_transaksi}`);
    }

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <Cari placeholder={"Search for a user ..."} onSearch={handleSearch} />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <td>Pelanggan</td>
                        <td>Status</td>
                        <td>ID Transaksi</td>
                        <td>Nomor Meter</td>
                        <td>Debit Beli</td>
                        <td>Nominal Beli</td>
                        <td>Tanggal Transaksi</td>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        userData.map((user, index) => (
                            <tr key={index}>
                                <td>
                                    <div className={styles.Pelanggan}>
                                        {user.name}
                                    </div>
                                </td>
                                <td>{user.status}</td>
                                <td>{user.id_transaksi}</td>
                                <td>{user.meter_id}</td>
                                <td>{user.debit_beli} m<sup>3</sup></td>
                                <td>{user.harga_beli}</td>
                                <td>{user.waktu_beli}</td>
                                <td>
                                <div className={styles.buttons}>
                                        <button className={`${styles.button} ${styles.view}`} onClick={() => handleViewClick(user.id_transaksi)}>
                                            Lihat
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">{emptymessage}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Page />
        </div>
    );
}

export default HistoryBuy;
"use client";
import styles from '@/app/UI/UserDashboard/PembelianToken/Invoice.module.css';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect, useCallback, useRef, forwardRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print';

const DetailPembelian = forwardRef((props, ref) => {
    const [userData, setUser] = useState({});
    const [localPayment, setLocalPayment] = useState(null);
    const [loading, setLoading] = useState(true);
    const localRef = useRef();
    const componentRef = ref || localRef;

    useEffect(() => {
        const storedPayment = JSON.parse(localStorage.getItem('payment'));
        if (storedPayment) {
            setLocalPayment(storedPayment);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (localPayment) {
            try {
                const result = await axios.get(`http://localhost:8000/api/users3/${localPayment.id_transaksi}`);
                setUser(result.data.users);
            } catch (err) {
                console.log("Something went wrong:", err);
            } finally {
                setLoading(false);
            }
        }
    }, [localPayment]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const formatToken = (token) => {
        if (!token) return ''; // Handle jika token kosong atau undefined
        const tokenStr = token.toString(); // Pastikan token dalam bentuk string
        return tokenStr.replace(/\d{4}(?=.)/g, '$& '); // Regex untuk menambahkan spasi setiap 4 digit
    };

    return (
        <div className={styles.container} ref={componentRef}>
            {loading ? (
                <div className={styles.loading}>
                    <p>Loading...</p>
                </div>
            ) : (
                <>
                    <div className={styles.header}>
                        <Image className={styles.logo} src="/Hydrosync.png" alt="" width="500" height="100" />
                        <h1 className={styles.title}>Invoice Pembelian</h1>
                    </div>
                    <div className={styles.details}>
                        <h2>Detail Pembelian</h2>
                        <p><strong>Nama Pemilik:</strong> {userData.name}</p>
                        <p><strong>Nomor Meter:</strong> {userData.meter_id}</p>
                        <p><strong>Nominal Harga:</strong> Rp {userData.harga_beli}</p>
                        <p><strong>Jumlah Debit:</strong> {userData.debit_beli}</p>
                        <p><strong>Status:</strong> {userData.status}</p>
                    </div>
                    <div className={styles.summary}>
                        <h2>Token</h2>
                        <p><strong>Token: </strong>{formatToken(userData.token)}</p>
                    </div>

                    {/* Cetak Invoice */}
                    <button type='button' className={`${styles.button} ${styles.hideOnPrint}`} onClick={handlePrint}>Cetak Invoice</button>

                    {/* Kembali ke Dashboard */}
                    <Link href="/UserDashboard/HistoryBuy">
                        <button type='button' className={`${styles.button} ${styles.hideOnPrint}`}>Kembali</button>
                    </Link>
                </>
            )}
        </div>
    );
});

DetailPembelian.displayName = "InvoicePembelian";

export default DetailPembelian;

'use client'
import { useState, useEffect, useCallback } from 'react';
import styles from './chart.module.css';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Chart = () => {
    const [data, setData] = useState([]);
    const [emptyMessage, setEmptyMessage] = useState('');

    const fetchUser = useCallback(async () => {
        try {
            const result = await axios.get(`http://localhost:8000/api/users`);
            console.log(result.data);
            if (result.data.results && result.data.results.length > 0) {
                const transformedData = transformData(result.data.results);
                setData(transformedData);
                setEmptyMessage(''); // Clear empty message if data is fetched
            } else {
                setEmptyMessage('Data pelanggan Tidak Ditemukan');
                setData([]);
            }
        } catch (err) {
            console.log("Something went wrong:", err);
            setEmptyMessage('Failed to load data.');
            setData([]);
        }
    }, []);

    const getCurrentWeekDates = () => {
        const currentDate = new Date();
        const startOfWeek = currentDate.getDate() - currentDate.getDay(); // Starting from Sunday
        const weekDates = [];
        
        for (let i = 0; i < 7; i++) {
            const date = new Date(currentDate.setDate(startOfWeek + i));
            const day = date.toLocaleDateString('id-ID', { weekday: 'short', day: 'numeric', month: 'short' });
            weekDates.push(day);
        }

        return weekDates;
    };

    const transformData = (users) => {
        const daysOfWeek = getCurrentWeekDates();
        const dayCounts = daysOfWeek.map(day => ({ name: day, Pelanggan: 0, PelangganBaru: 0, Keterangan: '' }));

        // Objek untuk mengumpulkan data sementara
        const tempData = {};

        // Inisialisasi objek untuk setiap hari
        daysOfWeek.forEach(day => {
            tempData[day] = {
                Pelanggan: 0,
                PelangganBaru: 0,
                Keterangan: ''
            };
        });

        // Pengumpulan data sementara berdasarkan pengguna baru
        users.forEach(user => {
            const createdAt = new Date(user.created_at);
            const dayIndex = createdAt.getDay(); // 0 (Min) to 6 (Sab)
            const dayString = daysOfWeek[dayIndex];

            tempData[dayString].PelangganBaru += 1; // Tambahkan pelanggan baru ke hari tersebut
            tempData[dayString].Keterangan += `+1 Pelanggan Baru pada ${dayString}\n`;
        });

        // Hitung total pelanggan
        let totalPelanggan = 0;
        daysOfWeek.forEach(day => {
            totalPelanggan += tempData[day].PelangganBaru;
            tempData[day].Pelanggan = totalPelanggan; // Tetapkan total pelanggan hingga hari tersebut
        });

        // Konversi data sementara ke dalam bentuk yang diharapkan
        const transformedCounts = daysOfWeek.map(day => ({
            ...dayCounts[daysOfWeek.indexOf(day)],
            Pelanggan: tempData[day].Pelanggan,
            PelangganBaru: tempData[day].PelangganBaru,
            Keterangan: tempData[day].Keterangan.trim() // Hapus spasi di akhir keterangan
        }));

        console.log("Data yang ditransformasi:", transformedCounts);
        return transformedCounts;
    };

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Rekap Mingguan</h2>
            {emptyMessage ? (
                <p>{emptyMessage}</p>
            ) : (
                <ResponsiveContainer width="100%" height={400}>
                    <LineChart
                        width={400}
                        height={400}
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <XAxis dataKey="name" />
                        <YAxis domain={[0, 10]} />
                        <Tooltip contentStyle={{ background: "transparent", border: "none" }} />
                        <Legend />
                        <Line type="monotone" dataKey="Pelanggan" stroke="#ff3400" strokeDasharray="5 5" />
                        <Line type="monotone" dataKey="PelangganBaru" stroke="#ff8000" strokeDasharray="3 4 5 2" />
                    </LineChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}

export default Chart;

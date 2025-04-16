"use client";

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/app/UI/UserDashboard/Pengaturan/pengaturan.module.css';
import { useRouter } from 'next/navigation';

const Pengaturan = () => {
    const [isLoading, setLoading] = useState(true);
    const [isProfileUpdate, setProfileUpdate] = useState(false);
    const [menuImg, setMenuImg] = useState(false);
    const [userData, setUserData] = useState({});
    const [userDataAccount, setUserDataAccount] = useState({ image: '-' });
    const [localAkun, setLocalAkun] = useState(null);
    const [userField, setUserField] = useState({
        old_password: "",
        password: ""
    });
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setLocalAkun(storedUser);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (!localAkun) return;
        try {
            const result = await axios.get(`http://localhost:8000/api/users/${localAkun.id_user}`);
            const user = result.data.users;
            if (user.image && user.image !== "-") {
                user.image = `http://localhost:8000/storage/${user.image}`;
                console.log(user.image);
            } else {
                user.image = '/noavatar.png';
            }
            setUserDataAccount(user);
            setLoading(false);
        } catch (err) {
            console.error("Something went wrong", err);
            setLoading(false);
        }
    }, [localAkun]);

    const fetchUser2 = useCallback(async () => {
        if (!localAkun) return;
        try {
            const result2 = await axios.get(`http://localhost:8000/api/users2/${localAkun.meter_id}`);
            setUserData(result2.data.users);
            setLoading(false);
        } catch (err) {
            console.error("Something went wrong", err);
            setLoading(false);
        }
    }, [localAkun]);

    useEffect(() => {
        if(localAkun) {
            fetchUser();
            fetchUser2();
        }
    }, [localAkun, fetchUser, fetchUser2]);

    const changeUserFieldHandler = (field, value) => {
        setUserField({
            ...userField,
            [field]: value
        });
    };

    const onSubmitChange = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8000/api/usersuppass/${localAkun.id_user}`, userField);
            setLoading(false);
            alert("Password Berhasil di Ubah");
            // Add your navigation logic here
        } catch (err) {
            console.error("Something went wrong:", err);
            setLoading(false);
        }
    };

    const openImagePicker = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        console.log("file selected : ", file);
        console.log("FormData Content : ", formData);

        setLoading(true);
        try {
            await axios.post(`http://localhost:8000/api/uppimg/${userDataAccount.id_user}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setLoading(false);
            setMenuImg(false);
            fetchUser();
        } catch (err) {
            console.error("Something went wrong:", err);
            setLoading(false);
        }
    };

    const onDeleteImage = async () => {
        setLoading(true);
        try {
            await axios.post(`http://localhost:8000/api/delimg/${userDataAccount.id_user}`);
            setLoading(false);
            setMenuImg(false);
            fetchUser();
        } catch (err) {
            console.error("Something went wrong:", err);
            setLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingBox}>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            {isProfileUpdate ? (
                <>
                    <h1 className={styles.title}>Ubah Password</h1>
                    <label className={styles.label} >Password Lama</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Masukan Password Lama"
                        value={userField.old_password}
                        onChange={(e) => changeUserFieldHandler('old_password', e.target.value)}
                    />

                    <label className={styles.label} >Password Baru</label>
                    <input
                        className={styles.input}
                        type="password"
                        placeholder="Masukan Password Baru"
                        value={userField.password}
                        onChange={(e) => changeUserFieldHandler('password', e.target.value)}
                    />
                    <div className={styles.button1}>
                        <button className={styles.buttonSave}  onClick={onSubmitChange}>Simpan</button>
                        <button className={styles.buttonBack} onClick={() => setProfileUpdate(false)}>Back</button>
                    </div>
                </>
            ) : (
                <>
                    <h1 className={styles.title}>Profil Saya</h1>
                    <div className={styles.containerProfile}>
                        <Image
                            src={userDataAccount.image && userDataAccount.image !== "-" ? userDataAccount.image : '/noavatar.png'}
                            width={200}
                            height={200}
                            alt="Profile Image"
                            className={styles.imageProfile}
                        />
                        <button className={styles.buttonEditImage} onClick={() => setMenuImg(true)}>Edit</button>
                    </div>

                    <label className={styles.label} >Nama Lengkap</label>
                    <div className={styles.containerInfo}>
                        <p>{userData.name}</p>
                    </div>

                    <label className={styles.label} >Alamat</label>
                    <div className={styles.containerInfo}>
                        <p>{userData.alamat}</p>
                    </div>

                    <label className={styles.label} >Meter id</label>
                    <div className={styles.containerInfo}>
                        <p>{userData.meter_id}</p>
                    </div>

                    <label className={styles.label} >Nomor Telpon</label>
                    <div className={styles.containerInfo}>
                        <p>{userData.notelp}</p>
                    </div>

                    <div className={styles.button1}>
                        <button className={styles.buttonUpdate} onClick={() => setProfileUpdate(true)}>Ubah Password</button>
                        <button className={styles.buttonBack} onClick={() => router.push('/UserDashboard')}>Back</button>
                    </div>

                    
                    {menuImg && (
                        <div className={styles.overlay}>
                            <div className={styles.containerUploadImage}>
                                <input type="file" accept="image/*" className={styles.inputFile} onChange={openImagePicker} />
                                <button className={styles.buttonDeleteImage}  onClick={onDeleteImage}>Hapus</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Pengaturan;

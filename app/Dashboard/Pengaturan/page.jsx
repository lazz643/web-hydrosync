"use client";

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '@/app/UI/Dashboard/pengaturan/pengaturan.module.css';
import { useRouter } from 'next/navigation';

const PengaturanPage = () => {
    const [isLoading, setLoading] = useState(true);
    const [isProfileUpdate, setProfileUpdate] = useState(false);
    const [menuImg, setMenuImg] = useState(false);
    //const [userData, setUserData] = useState({});
    const [userDataAccount, setUserDataAccount] = useState({ image: '-' });
    const [localAkun, setLocalAkun] = useState(null);
    const [userField, setUserField] = useState({
        old_password: "",
        password: ""
    });
    const router = useRouter();

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('admin'));
        if (storedUser) {
            setLocalAkun(storedUser);
        }
    }, []);

    const fetchUser = useCallback(async () => {
        if (!localAkun) return;
        try {
            const result = await axios.get(`http://localhost:8000/api/admin/${localAkun.id_admin}`);
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

    useEffect(() => {
        if(localAkun) {
            fetchUser();
        }
    }, [localAkun, fetchUser]);

    const changeUserFieldHandler = (field, value) => {
        setUserField({
            ...userField,
            [field]: value
        });
    };

    const onSubmitChange = async () => {
        setLoading(true);
        try {
            await axios.put(`http://localhost:8000/api/adminuppass/${localAkun.id_admin}`, userField);
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
            await axios.post(`http://localhost:8000/api/uppimgadmin/${userDataAccount.id_admin}`, formData, {
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
            await axios.post(`http://localhost:8000/api/delimgadmin/${userDataAccount.id_admin}`);
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

                    <label className={styles.label} >Nama Admin</label>
                    <div className={styles.containerInfo}>
                        <p>{userDataAccount.username}</p>
                    </div>

                    <label className={styles.label} >Code</label>
                    <div className={styles.containerInfo}>
                        <p>{userDataAccount.code}</p>
                    </div>

                    <div className={styles.button1}>
                        <button className={styles.buttonUpdate} onClick={() => setProfileUpdate(true)}>Ubah Password</button>
                        <button className={styles.buttonBack} onClick={() => router.push('/Dashboard')}>Back</button>
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


export default PengaturanPage;
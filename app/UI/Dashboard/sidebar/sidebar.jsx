"use client"
import React, {useState, useEffect} from "react";
import MenuLink from "./menuLink/menuLink"
import styles from "./sidebar.module.css"
import Image from "next/image"
import { 
    MdDashboard,
    MdPeople,
    MdPersonAddAlt1,
    MdOutlineCallMissedOutgoing,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import { useRouter } from "next/navigation";
//import { json } from "react-router-dom";

const DaftarItems = [
{
    title: "Menu",
    list: [
        {
            title: "Dashboard",
            path: "/Dashboard",
            icon: <MdDashboard />,
        },
        {
            title: "Pelanggan",
            path: "/Dashboard/Pelanggan",
            icon: <MdPeople />,
        },
        {
            title: "Pelanggan Baru",
            path: "/Dashboard/PelangganBaru",
            icon: <MdPersonAddAlt1 />,
        },
    ],
},  
{
    title: "Analytics",
    list: [
        {
            title: "Report",
            path: "/Dashboard/Report",
            icon: <MdOutlineCallMissedOutgoing />,
        },
        
    ],
},
{
    title: "Users",
    list: [
        {
            title: "Pengaturan",
            path: "/Dashboard/Pengaturan",
            icon: <MdOutlineSettings />,
        },
        {
            title: "Bantuan",
            path: "/Dashboard/Bantuan",
            icon: <MdHelpCenter />,
        },
    ],
},
];
const Sidebar = () => {
    const [admin, setAdmin] = useState({id_admin: "", code: "", username: "", image: ""});
    const [imageError, setImageError] = useState(false); 
    console.log(admin.image);
    const router = useRouter();
    useEffect(() => {
        const storedAdmin = localStorage.getItem('admin');
        if (storedAdmin) {
            setAdmin(JSON.parse(storedAdmin));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('admin'); // Hapus data user dari localStorage
        router.push('/LoginAdmin');
    }

    const handleError = () => {
        setImageError(true);
    }; 

    const adminImage = !imageError && admin.image ? (admin.image.startsWith('/') ? admin.image : `http://localhost:8000/storage/${admin.image}`) : "/noavatar.png";


    return (
        <div className={styles.container}>
            <div className={styles.Pelanggan}>
                <Image 
                    className={styles.Foto} 
                    src={adminImage} 
                    alt="Admin Image" 
                    width="70" 
                    height="70"
                    onError={handleError}
                    unoptimized={true}
                />
                <div className={styles.detailpengguna}>
                    <span className={styles.username}>{admin.username || "Admin"}</span>
                    <span className={styles.userTitle}>Administrator</span>
                </div>
            </div>
            <ul className={styles.DaftarList}>
            {DaftarItems.map((Daftar)=>(
                <li  key={Daftar.title}>
                    <span className={styles.Daftar}>{Daftar.title}</span>
                    {Daftar.list.map((item)=>(
                        <MenuLink item={item} key={item.title}/>
                    ))}
                </li>
            ))}
            </ul>
            <button className={styles.logout} onClick={handleLogout}>
                <MdLogout/>
                Keluar</button>
        </div>
    );
}

export default Sidebar
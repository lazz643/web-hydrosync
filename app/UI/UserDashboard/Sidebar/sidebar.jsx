"use client"
import React, {useState, useEffect} from "react";
import MenuLink from "./MenuLink/MenuLink";
import styles from "./sidebar.module.css";
import Image from "next/image";
import { 
    MdDashboard,
    MdOutlineWallet,
    MdReceiptLong,
    MdOutlineSettings,
    MdHelpCenter,
    MdLogout,
} from "react-icons/md";
import { useRouter } from "next/navigation";

const DaftarItems = [
    {
        title: "Menu",
        list: [
            {
                title: "Dashboard",
                path: "/UserDashboard",
                icon: <MdDashboard />,
            },
            {
                title: "Buy Token",
                path: "/UserDashboard/BuyToken",
                icon: <MdOutlineWallet />,
            },
            {
                title: "History Buy",
                path: "/UserDashboard/HistoryBuy",
                icon: <MdReceiptLong />,
            },
        ],
    },  
    {
        title: "Users",
        list: [
            {
                title: "Pengaturan",
                path: "/UserDashboard/Pengaturan",
                icon: <MdOutlineSettings />,
            },
            {
                title: "Bantuan",
                path: "/UserDashboard/Bantuan",
                icon: <MdHelpCenter />,
            },
        ],
    },
];

const Sidebar = () => {
    const [user, setUser] = useState({ name: "", id_user: "", meter_id: "", image: "" });
    const [imageError, setImageError] = useState(false);
    console.log(user.image);
    const router =useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user'); // Hapus data user dari localStorage
        router.push('/Login');
    }

    const handleError = () => {
        setImageError(true);
    }; 

    const userImage = !imageError && user.image ? (user.image.startsWith('/') ? user.image : `http://localhost:8000/storage/${user.image}`) : "/noavatar.png";

    return (
        <div className={styles.container}>
            <div className={styles.Pelanggan}>
                <Image 
                    className={styles.Foto} 
                    src={userImage} 
                    alt="User Image" 
                    width="70" 
                    height="70"
                    onError={handleError}
                    unoptimized={true}
                />
                <div className={styles.detailpengguna}>
                <span className={styles.username}>{user.name || "User"}</span>
                    <span className={styles.userTitle}>User</span>
                </div>
            </div>
            <ul className={styles.DaftarList}>
                {DaftarItems.map((Daftar) => (
                    <li key={Daftar.title}>
                        <span className={styles.Daftar}>{Daftar.title}</span>
                        {Daftar.list.map((item) => (
                            <MenuLink item={item} key={item.title}/>
                        ))}
                    </li>
                ))}
            </ul>
            <button className={styles.logout} onClick={handleLogout}>
                <MdLogout/>
                Keluar
            </button>
        </div>
    );
};

export default Sidebar;
 
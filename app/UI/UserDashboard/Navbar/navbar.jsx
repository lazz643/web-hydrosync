"use client"
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation';
import {MdNotificationsActive, MdChat, MdOutlinePublic, MdSearch} from "react-icons/md"

const Navbar = () => {

    const pathname = usePathname();
    return (
        <div className={styles.container}>
            <div className={styles.title}>{pathname.split("/").pop()}</div>
            <div className={styles.menu}>
                <div className={styles.search}>
                    <MdSearch color='black'/>
                    <input type="text" placeholder="Search..." className={styles.input}/>
                </div>
                <div className={styles.icon}>
                    <MdNotificationsActive size={25}/>
                    <MdChat size={25}/>
                    <MdOutlinePublic size={25}/>
                </div>
            </div>
        </div>
    )
}

export default Navbar
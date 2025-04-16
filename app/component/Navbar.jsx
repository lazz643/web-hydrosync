"use client"

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/app/component/Navbar.module.css";

const Navbar = () => {
    const [dropdownUserOpen, setDropdownUserOpen] = useState(false);
    const [dropdownAdminOpen, setDropdownAdminOpen] = useState(false);

    const handleDropdownToggleUser = () => {
        setDropdownUserOpen(!dropdownUserOpen);
        if (dropdownAdminOpen) setDropdownAdminOpen(false); // Close the admin dropdown if it's open
    };

    const handleDropdownToggleAdmin = () => {
        setDropdownAdminOpen(!dropdownAdminOpen);
        if (dropdownUserOpen) setDropdownUserOpen(false); // Close the user dropdown if it's open
    };

    return(
        <div className={styles.container}>
            <div className={styles.content}>
                <Link href='/'>
                    <Image className={styles.logo} src="/Hydrosync.png" alt="Logo" width="200" height="70" />
                </Link>
                <ul className={styles.hiddenSmFlex}>
                    <li className={styles.menu}>
                        <Link href="/">Home</Link>
                    </li>
                    <li className={styles.menu} onClick={handleDropdownToggleUser}>
                        <span className={styles.dropdownToggle}>Pelanggan</span>
                        {dropdownUserOpen && (
                            <ul className={styles.dropdownMenu}>
                                <li className={styles.dropdownItem}>
                                    <Link href="/Login">Login</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/Register">Register</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                    <li className={styles.menu} onClick={handleDropdownToggleAdmin}>
                        <span className={styles.dropdownToggle}>Admin</span>
                        {dropdownAdminOpen && (
                            <ul className={styles.dropdownMenu}>
                                <li className={styles.dropdownItem}>
                                    <Link href="/LoginAdmin">Login</Link>
                                </li>
                                <li className={styles.dropdownItem}>
                                    <Link href="/RegisterAdmin">Register</Link>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>     
            </div>
        </div>
    )
}

export default Navbar;

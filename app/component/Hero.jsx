import React from "react";
import styles from "@/app/component/Hero.module.css"
import Link from "next/link";

const Hero = ({Heading,Message}) => {
    return (
        <div className={styles.container}>
            <div className={styles.overlay}/>
            <div className={styles.content}>
                <h2>{Heading}</h2>
                <p>{Message}</p>
                <Link href="/Login">
                    <button className={styles.button}>User Login</button>
                </Link>
                <Link href="/LoginAdmin">
                    <button className={styles.button}>Admin Login</button>
                </Link>
            </div>
           
        </div>
    )
}

export default Hero;
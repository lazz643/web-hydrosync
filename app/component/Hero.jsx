"use client";
import React, { useState } from "react";
import styles from "@/app/component/Hero.module.css";
import Link from "next/link";
import LoginPage from "../Login/page";
import LoginPageAdmin from "../LoginAdmin/page";

const Hero = () => {
  const [role, setRole] = useState("user");
  return (
    <div className={styles.container}>
      <div className={styles.contentL}></div>
      <div className={styles.contentR}>
        <div className={styles.itemContent}>
          <div className={styles.boxBtnRole}>
            <button className={`${styles.btnRole} ${role === "user" ? styles.roleActive : ""}`} onClick={() => setRole("user")}>
              User
            </button>
            <button className={`${styles.btnRole} ${role === "admin" ? styles.roleActive : ""}`} onClick={() => setRole("admin")}>
              Admin
            </button>
          </div>
          {role === "user" ? <LoginPage /> : <LoginPageAdmin />}

          {/* Link to RegisterAdmin page */}
          <div className={styles.registerLink}>
            Belum memiliki akun?{" "}
            <Link href="/Register">
              Silahkan klik <span>Register</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

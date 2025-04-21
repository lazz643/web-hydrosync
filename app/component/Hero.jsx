"use client";
import React, { useState } from "react";
import styles from "@/app/component/Hero.module.css";
import Link from "next/link";
import LoginPage from "../Login/page";
import LoginPageAdmin from "../LoginAdmin/page";
import RegisterPage from "../Register/page";
import RegisterPageAdmin from "../RegisterAdmin/page";

const Hero = () => {
  const [role, setRole] = useState("user");
  const [act, setAct] = useState("login");
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
          {role === "user" && act === "login" && <LoginPage />}
          {role === "admin" && act === "login" && <LoginPageAdmin />}
          {role === "user" && act === "regis" && <RegisterPage />}
          {role === "admin" && act === "regis" && <RegisterPageAdmin />}

          {/* Link to RegisterAdmin page */}
          {act === "login" ? (
            <div className={styles.registerLink}>
              Belum memiliki akun?{" "}
              <p>
                Silahkan klik <button onClick={() => setAct("regis")}>Register</button>
              </p>
            </div>
          ) : (
            <div className={styles.registerLink}>
              Sudah memiliki akun?{" "}
              <p>
                Silahkan klik <button onClick={() => setAct("login")}>Login</button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;

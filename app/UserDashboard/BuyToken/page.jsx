"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "@/app/UI/UserDashboard/PembelianToken/BeliToken.module.css";
import pilihanstyles from "@/app/UI/UserDashboard/Pilihan/pilihan.module.css";
import menustyles from "@/app/UI/UserDashboard/PembelianToken/Menu.module.css";
import Image from "next/image";

const Pilihan = ({ amount, debit, onClick, isSelected }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    onClick(amount);
    setTimeout(() => setIsClicked(false), 200); // Reset click animation after 200ms
  };
  const containerClass = `${pilihanstyles.container} ${isSelected ? pilihanstyles.selected : ""} ${isClicked ? pilihanstyles.clicked : ""}`;

  return (
    <div className={containerClass} onClick={handleClick}>
      <div className={pilihanstyles.texts}>
        <span className={pilihanstyles.title}>Rp</span>
        <span className={pilihanstyles.amount}>{amount}</span>
        <span className={pilihanstyles.debit}>{debit} m&sup3;</span>
      </div>
    </div>
  );
};

const Buy = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [findMeterId, setFindMeterId] = useState("");
  const [userData, setUserData] = useState(null);
  const [buttonPressed, setButtonPressed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [error, setError] = useState("");
  const [debit_beli, setDebitBeli] = useState("");
  const [harga_beli, setHargaBeli] = useState("0");
  const [localUser, setLocalUser] = useState(null);
  const [tanggal, setTanggal] = useState(new Date().toISOString().split("T")[0]);
  const [waktu, setWaktu] = useState(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }));
  const [selectedAmount, setSelectedAmount] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setLocalUser(storedUser);
    }
  }, []);

  useEffect(() => {
    const updateDate = setInterval(() => {
      setTanggal(new Date().toISOString().split("T")[0]);
      setWaktu(new Date().toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false }));
    }, 1000);

    return () => clearInterval(updateDate);
  }, []);

  useEffect(() => {
    const loadMidtransScript = () => {
      const script = document.createElement("script");
      script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", "SB-Mid-client-kL6WRm236IR4zm93");
      script.async = true;
      document.body.appendChild(script);
    };

    loadMidtransScript();

    return () => {
      const script = document.querySelector('script[src="https://app.sandbox.midtrans.com/snap/snap.js"]');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []);

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    setIsNotFound(false);
    setError("");

    try {
      console.log(`Fetching data for meter ID: ${findMeterId}`);
      const result = await axios.get(`http://localhost:8000/api/users2/${findMeterId}`);
      console.log("Full API response:", result.data.users);

      const userDataFromApi = result.data.users;

      if (!userDataFromApi) {
        console.log("API Response Problem: No user data found");
        setUserData(null);
        setIsNotFound(true);
      } else {
        console.log("User data found:", userDataFromApi);
        setUserData(userDataFromApi);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setUserData(null);
      setIsNotFound(true);
      setError("Data Not Found");
    } finally {
      setIsLoading(false);
    }
  }, [findMeterId]);

  useEffect(() => {
    if (isChecked) {
      fetchUser();
    }
  }, [isChecked, fetchUser]);

  const handleCheck = async () => {
    setIsChecked(true);
    await fetchUser();
    setButtonPressed(false);
  };

  const handlePress = () => {
    if (userData && userData.status === "0") {
      alert("Peringatan, Nomor Meter ini sudah tidak dinyatakan sebagai pelanggan PDAM");
    } else {
      setButtonPressed(true);
    }
  };

  const buttonInfoColor = buttonPressed ? styles.buttonInfoPressed : styles.buttonInfo;

  const handlePilihanClick = (amount) => {
    setSelectedAmount(amount);
    setHargaBeli(amount);

    const amountInt = parseInt(amount, 10);
    const hargabagi = amountInt / 5000;
    const hargabagiStr = hargabagi.toString();

    setDebitBeli(hargabagiStr);
  };

  const onSubmitChange = async () => {
    console.log("Mengirim data ke server...");
    const userField = {
      id_user: localUser.id_user,
      id_plgn: userData.id_plgn,
      name: userData.name,
      meter_id: userData.meter_id,
      debit_beli: debit_beli,
      harga_beli: harga_beli,
      item_name: "Beli Token",
      waktu_beli: `${tanggal} ${waktu}`,
    };

    try {
      const response = await axios.post("http://localhost:8000/api/transaksi", userField);
      console.log("Respon dari server:", response);
      const { id_transaksi, redirect_url, token } = response.data.users;

      localStorage.setItem("payment", JSON.stringify({ id_transaksi, redirect_url, token }));
      setHargaBeli("0");

      if (typeof window.snap !== "undefined" && typeof window.snap.pay === "function") {
        window.snap.pay(token, {
          onSuccess: function (result) {
            console.log(result);
            window.location.href = "/UserDashboard/BuyToken/Pembayaran";
          },
          onPending: function (result) {
            console.log(result);
            window.location.href = "/UserDashboard/BuyToken/Pembayaran";
          },
          onError: function (result) {
            console.log(result);
            alert("Payment error");
          },
          onClose: function () {
            alert("Payment popup closed without finishing the payment");
          },
        });
      } else {
        console.error("Snap.js is not loaded or window.snap.pay is not available.");
        alert("Payment gateway is not available. Please try again later.");
      }
    } catch (err) {
      console.log("Terjadi kesalahan:", err);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.ikon}>
        <Image className={styles.logo} src="/Hydrosync.png" alt="Logo" width="900" height="250" />
      </div>
      <form className={styles.form}>
        <label>Nomor Meter</label>
        <input type="text" placeholder="Nomor Meter..." name="Nomor Meter" value={findMeterId} onChange={(e) => setFindMeterId(e.target.value)} required />
      </form>
      <button type="button" className={styles.buttonCheck} onClick={handleCheck}>
        {isLoading ? "Checking..." : "Check"}
      </button>

      {isChecked && isNotFound && (
        <div className={styles.errorMessage}>
          <p>Meter ID not found. Please try again.</p>
        </div>
      )}

      {isChecked && error && (
        <div className={styles.errorMessage}>
          <p>{error}</p>
        </div>
      )}

      {isChecked && userData && (
        <div className={styles.userInfo}>
          <button className={buttonInfoColor} onClick={handlePress}>
            <span>{userData.meter_id}</span>
            <span>{userData.name}</span>
          </button>
        </div>
      )}
      <div className={menustyles.Menu}>
        <div className={menustyles.pilihan}>
          <Pilihan amount="5000" debit="1" onClick={handlePilihanClick} isSelected={selectedAmount === "5000"} />
          <Pilihan amount="10000" debit="2" onClick={handlePilihanClick} isSelected={selectedAmount === "10000"} />
          <Pilihan amount="15000" debit="3" onClick={handlePilihanClick} isSelected={selectedAmount === "15000"} />
        </div>
        <div className={menustyles.addPilihan}>
          <Pilihan amount="35000" debit="7" onClick={handlePilihanClick} isSelected={selectedAmount === "35000"} />
          <Pilihan amount="50000" debit="10" onClick={handlePilihanClick} isSelected={selectedAmount === "50000"} />
          <Pilihan amount="100000" debit="20" onClick={handlePilihanClick} isSelected={selectedAmount === "100000"} />
        </div>
      </div>

      {selectedAmount && (
        <div className={`${styles.selectedAmount} ${styles.animate}`}>
          <p>Harga yang dipilih: Rp {selectedAmount}</p>
        </div>
      )}

      <button type="button" className={menustyles.button} onClick={onSubmitChange}>
        Beli
      </button>
    </div>
  );
};

export default Buy;

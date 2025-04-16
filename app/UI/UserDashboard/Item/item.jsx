import Link from 'next/link';
import styles from './item.module.css'
import {MdOutlineWallet, MdReceiptLong, MdOutlineSettings,  MdHelpCenter} from "react-icons/md";

export const Item = () => {
    return (
        <Link href="/UserDashboard/BuyToken" passHref>
            <div className={styles.container}>
                <MdOutlineWallet size={45} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Beli Token</span>
                </div>
            </div>
        </Link>
    );
}

export const Item2 = () => {
    return (
        <Link href="/UserDashboard/HistoryBuy" passHref>
            <div className={styles.container}>
                <MdReceiptLong size={45} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Riwayat Transaksi</span>
                </div>
            </div>
        </Link>
    );
}

export const Item3 = () => {
    return (
        <Link href="/UserDashboard/Pengaturan" passHref>
            <div className={styles.container}>
                <MdOutlineSettings size={45} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Pengaturan</span>
                </div>
            </div>
        </Link>
    );
}

export const Item4 = () => {
    return (
        <Link href="/UserDashboard/Bantuan" passHref>
            <div className={styles.container}>
                <MdHelpCenter  size={45} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Bantuan</span>
                </div>
            </div>
        </Link>
    );
}
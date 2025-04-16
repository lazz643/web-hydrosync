import Link from 'next/link';
import styles from './item.module.css'
import {MdPeople, MdPersonAddAlt1, MdOutlineCallMissedOutgoing, MdHelpCenter, MdOutlineSettings} from "react-icons/md";

export const Item = () => {
    return (
        <Link href="/Dashboard/Pelanggan" passHref>
            <div className={styles.container}>
                <MdPeople size={35} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Pelanggan</span>
                    <span className={styles.ammount}>5.000 Orang</span>
                    <span className={styles.detail}>
                        <span className={styles.positive}>12%</span> lebih banyak dari minggu sebelumnya
                    </span>
                </div>
            </div>
        </Link>
    );
}

export const Item2 = () => {
    return (
        <Link href="/Dashboard/PelangganBaru" passHref>
            <div className={styles.container}>
                <MdPersonAddAlt1 size={35} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Pelanggan Baru</span>
                    <span className={styles.ammount}>10.000 Orang</span>
                    <span className={styles.detail}>
                        <span className={styles.positive}>12%</span> lebih banyak dari minggu sebelumnya
                    </span>
                </div>
            </div>
        </Link>
    );
}

export const Item3 = () => {
    return (
        <Link href="/Dashboard/Report" passHref>
            <div className={styles.container}>
                <MdOutlineCallMissedOutgoing size={35} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Report</span>
                    <span className={styles.ammount}>15.000 Orang</span>
                    <span className={styles.detail}>
                        <span className={styles.positive}>12%</span> lebih banyak dari minggu sebelumnya
                    </span>
                </div>
            </div>
        </Link>
    );
}

export const Item4 = () => {
    return (
        <Link href="/Dashboard/Pengaturan" passHref>
            <div className={styles.container}>
                <MdOutlineSettings size={35} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Pengaturan</span>
                </div>
            </div>
        </Link>
    );
}

export const Item5 = () => {
    return (
        <Link href="/Dashboard/Bantuan" passHref>
            <div className={styles.container}>
                <MdHelpCenter size={35} color='white'/>
                <div className={styles.texts}>
                    <span className={styles.title}>Bantuan</span>
                </div>
            </div>
        </Link>
    );
}

import styles from './rightbar.module.css'
import {MdHelpCenter, MdOutlineSettings} from "react-icons/md";

const rightbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                </div>
                <div className={styles.texts}>
                    <MdHelpCenter size={35} color='white'/>
                    <span className={styles.isi}>Bantuan</span>
                </div>
            </div>
            <div className={styles.item}>
                <div className={styles.bgContainer}>
                </div>
                <div className={styles.texts}>
                    <MdOutlineSettings size={35} color='white'/>
                    <span className={styles.isi}>Pengaturan</span>
                </div>
            </div>
        </div>
    );
}

export default rightbar
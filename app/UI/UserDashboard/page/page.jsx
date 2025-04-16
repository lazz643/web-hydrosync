import styles from "./page.module.css"

const Halaman = () => {
    return (
        <div className={styles.container}>
            <button className={styles.button} disabled>Sebelumnya</button>
            <button className={styles.button}>Selanjutnya</button>
        </div>
    )
}

export default Halaman
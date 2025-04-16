import styles from "./pagination.module.css"

const Pagination = () => {
    return (
        <div className={styles.container}>
            <button className={styles.button} disabled>Sebelumnya</button>
            <button className={styles.button}>Selanjutnya</button>
        </div>
    )
}

export default Pagination
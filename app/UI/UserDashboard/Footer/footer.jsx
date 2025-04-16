import styles from './footer.module.css'

const Footer = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logo}>HydroSync</div>
            <div className={styles.texts}>All Right Reserved</div>
        </div>
    );
}

export default Footer
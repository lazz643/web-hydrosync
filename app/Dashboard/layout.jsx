import Navbar from "../UI/Dashboard/navbar/navbar";
import Sidebar from "../UI/Dashboard/sidebar/sidebar";
import styles from "../UI/Dashboard/dashboard.module.css";
import Footer from "../UI/Dashboard/footer/footer";
const layout = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar/>
            </div>
            <div className={styles.content}>
                <Navbar/>
                {children}
                <Footer/>
            </div>
        </div>
    );
}

export default layout
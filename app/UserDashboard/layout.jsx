import styles from "../UI/UserDashboard/UserDashboard.module.css";
import Footer from "../UI/UserDashboard/Footer/footer";
import Navbar from "../UI/UserDashboard/Navbar/navbar";
import Sidebar from "../UI/UserDashboard/Sidebar/sidebar";

const Layout = ({children}) => {
    return (
        <div className={styles.container}>
            <div className={styles.menu}>
                <Sidebar />
            </div>
            <div className={styles.content}>
                <Navbar />
                {children}
                <Footer />
            </div>
        </div>
    );
}

export default Layout
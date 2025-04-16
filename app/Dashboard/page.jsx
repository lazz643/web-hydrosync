import { Item, Item2, Item3 } from '../UI/Dashboard/item/item'
import Chart from '../UI/Dashboard/chart/chart'
import styles from '..//UI/Dashboard/dashboard.module.css'
import Rightbar from '../UI/Dashboard/rightbar/rightbar'
const Dashboard = () => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.main}>
                <div className={styles.items}>
                    <Item/>
                    <Item2/>
                    <Item3/>
                </div>
                <Chart/>
            </div>
            <div className={styles.side}>
                <Rightbar/>
            </div>
        </div>
    );
}

export default Dashboard

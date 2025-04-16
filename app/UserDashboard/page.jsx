import styles from '../UI/UserDashboard/UserDashboard.module.css';
import { Item, Item2, Item3, Item4 } from '../UI/UserDashboard/Item/item';


const UserDashboard = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.items}>
          <Item/>
          <Item2/>
          <Item3/>
        </div>
        <div className={styles.addItems}>
          <Item4/>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;

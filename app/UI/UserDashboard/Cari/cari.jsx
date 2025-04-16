import React from "react";
import { MdSearch } from 'react-icons/md';
import styles from './cari.module.css'

const Cari = ({placeholder,onSearch}) => {
    const handleInputChange =(event) => {
        onSearch(event.target.value);
    }
    return (
        <div className={styles.container}>
            <MdSearch color='black'/>
            <input 
                type="text"
                className={styles.input}
                placeholder={placeholder} 
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Cari
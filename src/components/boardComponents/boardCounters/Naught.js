import React from "react";
import styles from './naught.module.css';

const Naught = () => {

    return (
        <div  className={styles.outside_circle}>
            <div className={styles.inside_circle}></div>
        </div>
    )
}

export default Naught;

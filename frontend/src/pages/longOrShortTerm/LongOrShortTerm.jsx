import React from 'react';
import styles from './longorshort.module.css';

function LongOrShortTerm() {
  return (
    <div>
         <div className={styles.container}>
      <h2 className={styles.heading}>Choose your option</h2>
      <div className={styles.options}>
        <div className={styles.option}>
          <input type="radio" id="longTerm" name="relationship" value="longTerm" />
          <label htmlFor="longTerm">Long term relationship</label>
        </div>
        <div className={styles.option}>
          <input type="radio" id="shortTerm" name="relationship" value="shortTerm" />
          <label htmlFor="shortTerm">Short term relationship</label>
        </div>
      </div>
      <button className={styles.button}>Next</button>
    </div>
    </div>
  )
}

export default LongOrShortTerm
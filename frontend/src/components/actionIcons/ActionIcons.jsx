import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEnvelope, faPaperPlane, faCheck, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './actionicons.module.css';

function ActionIcons () {
    console.log("ActionIcons component rendered");
  return (
    <div className={styles.iconContainer}>
      
      <FontAwesomeIcon icon={faHeart} className={styles.icon} title="Shortlist" />
      <FontAwesomeIcon icon={faEnvelope} className={styles.icon} title="Messages" />
      <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} title="Request Sent" />
      <FontAwesomeIcon icon={faCheck} className={styles.icon} title="Request Accepted" />
      <FontAwesomeIcon icon={faEyeSlash} className={styles.icon} title="Don't Show Profile" />
    </div>
  );
};

export default ActionIcons;

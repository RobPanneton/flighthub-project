import React from "react";

import styles from "./TripHeading.module.scss";

export const TripHeading: React.FC<{
  price: string;
}> = ({ price }) => {
  // cart logic would be called here
  const handleSelect = () => 0;

  return (
    <div className={styles.tripHeading}>
      <div className={styles.price}>
        <h3>CAD {price}</h3>
        <span>Final total price (taxes included)</span>
      </div>
      <button type='button' onClick={handleSelect}>
        <span>SELECT</span> <span>{">"}</span>
      </button>
    </div>
  );
};

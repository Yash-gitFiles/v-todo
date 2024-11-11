import React, { useEffect, useState } from "react";
import styles from "../styles/pages/previwePage.module.css"

function PreviewPage() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("formData")) || [];
    setFormData(storedForms);
  }, []);

  return (
    <div className={styles.container}>
      <h1  className={styles.title}>Preview Page</h1>
      {formData.length === 0 ? (
        <p>No data available.</p>
      ) : (
        <div> 
          {formData.map((form, index) => (
            <div key={index} className={styles.formContainer}>
              <h3 className={styles.formTitle}>Form {index + 1}</h3>
              <p className={styles.formItem}><strong>Name:</strong> {form.name}</p>
              <p className={styles.formItem}><strong>Gender:</strong> {form.gender}</p>
              <p className={styles.formItem}><strong>Vehicles:</strong></p>
              <ul className={styles.vehiclesList}>
                <li>Bike: {form.vehicles.bike ? "Yes" : "No"}</li>
                <li>Car: {form.vehicles.car ? "Yes" : "No"}</li>
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PreviewPage;

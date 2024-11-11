import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/pages/mainCard.module.css";

function MainCard() {
  const [forms, setForms] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const storedForms = JSON.parse(localStorage.getItem("formData")) || [];
    setForms(storedForms);
  }, []);

  function handleChange(index, e) {
    const { name, value, type, checked } = e.target;

    setForms((prevForms) => {
      const updatedForms = [...prevForms];
      if (name === "name") {
        updatedForms[index].name = value;
      } else if (name.startsWith("gender")) {
        updatedForms[index].gender = value;
      } else if (type === "checkbox") {
        updatedForms[index].vehicles[value] = checked;
      }
      localStorage.setItem("formData", JSON.stringify(updatedForms));
      return updatedForms;
    });
  }

  function addForm() {
    const newForm = {
      name: "",
      gender: "male",
      vehicles: {
        bike: false,
        car: false,
      },
    };

    setForms((prevForms) => {
      const updatedForms = [...prevForms, newForm];
      localStorage.setItem("formData", JSON.stringify(updatedForms));
      return updatedForms;
    });
  }

  function handleDelete(index) {
    setForms((prevForms) => {
      const updatedForms = prevForms.filter((_, i) => i !== index);
      localStorage.setItem("formData", JSON.stringify(updatedForms));
      return updatedForms;
    });
  }

  function saveData() {
    const allFilled = forms.every((form) => {
      return (
        form.name && form.gender && (form.vehicles.bike || form.vehicles.car)
      );
    });

    if (allFilled) {
      navigate("/previewPage");
    } else {
      alert("Please fill all fields");
    }
  }

  return (
    <div className={styles.container}>
      <button className={styles.button} onClick={addForm}>
        Add +
      </button>
      {forms.map((form, index) => (
        <form key={index} className={styles.form}>
          <label htmlFor={`name-${index}`} className={styles.label}>
            Name:
          </label>
          <input
            type="text"
            name="name"
            id={`name-${index}`}
            className={styles.input}
            onChange={(e) => handleChange(index, e)}
            value={form.name}
          />
          <div className={styles.radioGroup}>
            <label>Gender:</label>
            <input
              type="radio"
              id={`male-${index}`}
              name={`gender-${index}`}
              value="male"
              checked={form.gender === "male"}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`male-${index}`}>Male</label>
            <input
              type="radio"
              id={`female-${index}`}
              name={`gender-${index}`}
              value="female"
              checked={form.gender === "female"}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`female-${index}`}>Female</label>
          </div>
          <div>
            <input
              type="checkbox"
              id={`vehicle1-${index}`}
              name="vehicle1"
              value="bike"
              className={styles.checkbox}
              checked={form.vehicles.bike}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`vehicle1-${index}`}> I have a bike</label>
            <input
              type="checkbox"
              id={`vehicle2-${index}`}
              name="vehicle2"
              value="car"
              className={styles.checkbox}
              checked={form.vehicles.car}
              onChange={(e) => handleChange(index, e)}
            />
            <label htmlFor={`vehicle2-${index}`}> I have a car</label>
          </div>
          {index > 0 && (
            <button
              type="button"
              className={styles.button}
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          )}
        </form>
      ))}
      <button onClick={saveData} className={styles.button}>
        Save
      </button>
    </div>
  );
}

export default MainCard;

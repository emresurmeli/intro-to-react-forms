import { useState } from "react";
import "./App.css";

const App = () => {
  // add placeholder text for the title
  // we'll use the form to update this state by the end of this lesson
  const [title, setTitle] = useState("The full name will appear here.");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
  });

  const formIsInvalid = Object.values(errors).some(Boolean);
  const formHasMissingData = !Object.values(formData).every(Boolean);

  const handleSubmit = (event) => {
    event.preventDefault();
    setTitle(`Hi there, ${formData.firstName} ${formData.lastName}`);
    setFormData({ firstName: "", lastName: "" });
  };

  const handleFormChange = (event) => {
    setFormData({
      ...formData, // Maintains existing form data
      [event.target.name]: event.target.value, // Updates only the input that's being changed
    });
    checkErrors(event);
  };

  const checkErrors = ({ target }) => {
    if (target.name === "firstName" || target.name === "lastName") {
      setErrors({
        ...errors,
        [target.name]:
          target.value.length < 2
            ? "Must be at least two characters long."
            : "",
      });
    }
  };

  return (
    <>
      <h2>{title}</h2>
      <form>
        <label htmlFor="firstName">First Name: </label>
        {errors.firstName && <p>{errors.firstName}</p>}
        <br />
        <input
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={handleFormChange}
        />
        <br />
        <label htmlFor="lastName">Last Name: </label>
        {errors.lastName ? errors.lastName : ""}
        <br />
        <input
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={handleFormChange}
        />
        <br />
        <button
          type="submit"
          onClick={handleSubmit}
          disabled={formIsInvalid || formHasMissingData}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default App;

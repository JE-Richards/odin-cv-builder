import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/PersonalSummary.css';

export default function PersonalSummary(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    profession: '',
    professionalSummary: '',
  });

  // Form validation and error messages for each input
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
        // Further validation prevents invalid characters, but keep error in as a failsafe
        if (!/^[a-zA-z'-]*$/.test(value) && value !== '')
          error =
            'First name can only contain letters, hyphens, and apostrophes.';
        else if (!value.trim()) error = 'First name is required.';
        break;
      case 'lastName':
        if (!/^[a-zA-z'-]*$/.test(value) && value !== '')
          error =
            'Last name can only contain letters, hyphens, and apostraphes.';
        else if (!value.trim()) error = 'Last name is required.';
        break;
      case 'profession':
        if (!/^[a-zA-z'-]*$/.test(value) && value !== '')
          error =
            'Profession can only contain letters, hyphens, and apostraphes.';
        else if (!value.trim()) error = 'Profession is required.';
        break;
      case 'professionalSummary':
        if (!value.trim()) error = 'Professional summary is required.';
        else if (value.length < 50 && value !== '')
          error = 'Professional summary should be at least 50 characters long.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleInputChanges = (e) => {
    const { name, value } = e.target;

    // Prevent invalid characters in some inputs
    if (['firstName', 'lastName', 'profession'].includes(name)) {
      const regex = /^[a-zA-Z'-]*$/; // Allow only a-z, A-Z, -, and '
      const errNames = {
        firstName: 'First name',
        lastName: 'Last name',
        profession: 'Profession',
      };
      // Display error message if invalid character entered and remove invalid character from input value
      if (!regex.test(value) && value !== '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: `${errNames[name]} can only contain letters, hyphens, and apostrophes.`,
        }));
        return; // Prevent invalid input
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: '',
        }));
      }
    }

    handleChanges({ [name]: value });
  };

  // Validate input when focus is removed - ensures error appears if required input is blank
  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value); // Validate when input loses focus
  };

  return (
    <form className="form form--personal-summary">
      <label className="form__label">
        First name<span className="input__label--required">*</span>
        <input
          type="text"
          name="firstName"
          placeholder="John"
          className={`form__input ${
            errors.firstName ? 'form__input--error' : ''
          }`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.firstName}
          required
        />
        {errors.firstName && (
          <p className="form__error-message">{errors.firstName}</p>
        )}
      </label>
      <label className="form__label">
        Last name<span className="input__label--required">*</span>
        <input
          type="text"
          name="lastName"
          placeholder="Doe"
          className={`form__input ${
            errors.lastName ? 'form__input--error' : ''
          }`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.lastName}
          required
        />
        {errors.lastName && (
          <p className="form__error-message">{errors.lastName}</p>
        )}
      </label>
      <label className="form__label">
        Profession<span className="input__label--required">*</span>
        <input
          type="text"
          name="profession"
          placeholder="Web Developer"
          className={`form__input ${
            errors.profession ? 'form__input--error' : ''
          }`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.profession}
          required
        />
        {errors.profession && (
          <p className="form__error-message">{errors.profession}</p>
        )}
      </label>
      <label className="form__label">
        Professional summary<span className="input__label--required">*</span>
        <textarea
          name="professionalSummary"
          placeholder="A summary of your career and aspirations"
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          rows="5"
          cols="50"
          className={`form__input form__input--text-area ${
            errors.professionalSummary ? 'form__input--error' : ''
          }`}
          value={data.professionalSummary}
          required
          minLength="50"
        ></textarea>
        {errors.professionalSummary && (
          <p className="form__error-message">{errors.professionalSummary}</p>
        )}
      </label>
    </form>
  );
}

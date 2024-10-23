import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/ContactDetails.css';

export default function ContactDetails(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState({
    email: '',
    mobile: '',
    linkedIn: '',
    portfolio: '',
  });

  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'email':
        // ^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+ - match valid characters before @
        // @[a-zA-Z0-9.-]+ - to match domain names
        // \.[a-zA-Z]{2,}$ - to match top level domain, at least 2 chars e.g. .co
        if (
          !/^[a-zA-Z0-9.!#$%&'*+/=?^_{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            value
          ) &&
          value !== ''
        ) {
          error = 'Please enter a valid email address.';
        } else if (!value.trim()) error = 'Email is required.';
        break;
      case 'mobile':
        if (!/^\d{10,11}$/.test(value) && value !== '') {
          error = 'Please enter a valid 10 or 11 digit UK mobile number.';
        } else if (!value.trim()) error = 'Mobile number is required.';
        break;
      case 'linkedIn':
        // www. is optional
        // linkedin.com/in/ is required
        // the profile url section can contain letters, numbers, hyphens, be 3-100 characters long, and can't contain linkedin
        if (
          !/^(www\.)?linkedin\.com\/in\/(?!.*linkedin)[a-zA-Z0-9-]{3,100}$/.test(
            value
          ) &&
          value !== ''
        ) {
          error =
            'Please enter a valid linkedIn profile URL. The URL format should look like www.linkedin.com/in/{your profile name here}';
        }
        break;
      case 'portfolio':
        if (
          // www. optional
          // matches the domain allowing for characters, numbers, and hyphens
          // allows subdomains
          // allows top-level domains of at least 2 characters
          // allows for optional paths after top-level domain
          !/^(www\.)?([a-z0-9\-]+\.)+[a-z]{2,}(:\d+)?(\/[^\s]*)?$/i.test(
            value
          ) &&
          value !== ''
        ) {
          error = 'Please enter a valid URL.';
        }
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

    if (name === 'mobile') {
      const regex = /^\d+$/; // allows digits only
      if (!regex.test(value) && value !== '') {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: 'Mobile can only contain numeric digits.',
        }));
        // validateField(name, value);
        return; // prevent invalid input
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          mobile: '',
        }));
      }
    }

    handleChanges({ [name]: value });
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  return (
    <form className="form form--contact-details">
      <label className="form__label">
        Email<span className="input__label--required">*</span>
        <input
          type="email"
          name="email"
          placeholder="john.doe@domain.com"
          className={`form__input ${errors.email ? 'form__input--error' : ''}`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.email}
          required
        />
        {errors.email && <p className="form__error-message">{errors.email}</p>}
      </label>
      <label className="form__label">
        Mobile<span className="input__label--required">*</span>
        <input
          type="tel"
          name="mobile"
          placeholder="01234567890"
          className={`form__input ${errors.mobile ? 'form__input--error' : ''}`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.mobile}
          required
          minLength="10"
          maxLength="11"
        />
        {errors.mobile && (
          <p className="form__error-message">{errors.mobile}</p>
        )}
      </label>
      <label className="form__label">
        LinkedIn profile
        <input
          type="url"
          name="linkedIn"
          placeholder="www.linkedin.com/in/John-Doe"
          className={`form__input ${
            errors.linkedIn ? 'form__input--error' : ''
          }`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.linkedIn}
        />
        {errors.linkedIn && (
          <p className="form__error-message">{errors.linkedIn}</p>
        )}
      </label>
      <label className="form__label">
        Portfolio
        <input
          type="url"
          name="portfolio"
          placeholder="www.myportfolio.com"
          className={`form__input ${
            errors.portfolio ? 'form__input--error' : ''
          }`}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          value={data.portfolio}
        />
        {errors.portfolio && (
          <p className="form__error-message">{errors.portfolio}</p>
        )}
      </label>
    </form>
  );
}

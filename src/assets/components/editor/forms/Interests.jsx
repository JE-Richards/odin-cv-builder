import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/Interests.css';

export default function Interests(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState(data.map(() => ''));

  const validateField = (index, value) => {
    let error = '';

    if (!value.trim()) error = 'A hobby or interest is required.';

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = error;
      return updatedErrors;
    });
  };

  const addInterest = () => {
    const updatedInterests = [...data, ''];
    handleChanges(updatedInterests);

    setErrors((prevErrors) => [...prevErrors, '']);
  };

  const deleteInterest = (index) => {
    const updatedInterests = [...data];
    updatedInterests.splice(index, 1);
    handleChanges(updatedInterests);

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(index, 1);
      return updatedErrors;
    });
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = data.map((interest, interestIndex) =>
      interestIndex === index ? value : interest
    );

    handleChanges(updatedInterests);
  };

  const handleInputBlur = (index, e) => {
    validateField(index, e.target.value);
  };

  return (
    <form className="form form--interests">
      <button
        type="button"
        className="form__btn form__btn--interests"
        onClick={addInterest}
      >
        + Interest
      </button>
      <fieldset className="fieldset form--interests__inputs">
        <legend className="fieldset__legend visually-hidden">
          Hobbies & Interests
        </legend>
        {data.map((interest, interestIndex) => (
          <label
            className="form__label form__label--interest"
            key={interestIndex}
          >
            <span className="visually-hidden">{`Interest ${
              interestIndex + 1
            }`}</span>
            <div className="interest-container">
              <input
                type="text"
                className={`form__input ${
                  errors[interestIndex] ? 'form__input--error' : ''
                }`}
                placeholder={`Interest ${interestIndex + 1}`}
                value={interest}
                onChange={(e) =>
                  handleInterestChange(interestIndex, e.target.value)
                }
                onBlur={(e) => handleInputBlur(interestIndex, e)}
              />
              <button
                type="button"
                className="form__btn form__btn--delete-interest"
                onClick={() => deleteInterest(interestIndex)}
                disabled={data.length === 1}
              >
                Delete
              </button>
            </div>
            {errors[interestIndex] && (
              <p className="form__error-message">{errors[interestIndex]}</p>
            )}
          </label>
        ))}
      </fieldset>
    </form>
  );
}

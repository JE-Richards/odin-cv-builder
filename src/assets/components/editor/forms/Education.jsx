import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/Education.css';

export default function Education(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState(
    data.map(() => ({
      institute: '',
      qualification: '',
      dateFrom: '',
      dateTo: '',
    }))
  );

  const validateField = (index, name, value) => {
    let error = '';

    switch (name) {
      case 'institute':
        if (!value.trim()) error = 'Institute name is required.';
        break;
      case 'qualification':
        if (!value.trim()) error = 'Qualification achieved is required.';
        break;
      case 'dateFrom':
        if (!/^(0[1-9]|1[0-2])\/[12]\d{3}/.test(value) && value !== '') {
          error =
            'The date must be in the format MM/YYYY where both M and Y are digits, and MM must be between 01 and 12.';
        } else if (!value.trim())
          error = 'The date you started this qualification is required.';
        break;
      case 'dateTo':
        if (!/^(0[1-9]|1[0-2])\/[12]\d{3}/.test(value) && value !== '') {
          error =
            'The date must be in the format MM/YYYY where both M and Y are digits, and MM must be between 01 and 12.';
        } else if (!value.trim())
          error = 'The date you finished this qualification is required.';
        break;
      default:
        break;
    }

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = {
        ...updatedErrors[index],
        [name]: error,
      };
      return updatedErrors;
    });
  };

  const addEducation = () => {
    const updatedEducation = [
      ...data,
      {
        institute: '',
        qualification: '',
        dateFrom: '',
        dateTo: '',
      },
    ];

    handleChanges(updatedEducation);

    setErrors((prevErrors) => [
      ...prevErrors,
      {
        institute: '',
        qualification: '',
        dateFrom: '',
        dateTo: '',
      },
    ]);
  };

  const handleEducationChange = (index, name, value) => {
    if (['dateFrom', 'dateTo'].includes(name)) {
      if (!/^[0-9/]+$/.test(value) && value !== '') {
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors];
          updatedErrors[index] = {
            ...updatedErrors[index],
            [name]: 'The date can only contain digits and /',
          };
          return updatedErrors;
        });
        return; // prevent invalid input characters
      } else {
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors];
          updatedErrors[index] = {
            ...prevErrors[index],
            [name]: '',
          };
          return updatedErrors;
        });
      }
    }

    const updatedEducation = data.map((education, educationIndex) =>
      educationIndex === index ? { ...education, [name]: value } : education
    );

    handleChanges(updatedEducation);
  };

  const handleInputBlur = (index, e) => {
    const { name, value } = e.target;
    validateField(index, name, value);
  };

  return (
    <form action="" className="form form--education">
      <button
        type="button"
        className="form__btn form__btn--education"
        onClick={addEducation}
      >
        + Education
      </button>
      {data.map((education, educationIndex) => (
        <fieldset key={educationIndex} className="fieldset fieldset--education">
          <legend className="fieldset__legend visually-hidden">
            {`Education ${educationIndex + 1} Details`}
          </legend>
          <label className="form__label">
            Institute name<span className="input__label--required">*</span>
            <input
              type="text"
              name="institute"
              placeholder="Institute name"
              className={`form__input ${
                errors[educationIndex].institute ? 'form__input--error' : ''
              }`}
              value={education.institute}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(educationIndex, e)}
              required
            />
            {errors[educationIndex].institute && (
              <p className="form__error-message">
                {errors[educationIndex].institute}
              </p>
            )}
          </label>
          <label className="form__label">
            Qualification achieved
            <span className="input__label--required">*</span>
            <input
              type="text"
              name="qualification"
              placeholder="Qualification achieved"
              className={`form__input ${
                errors[educationIndex].qualification ? 'form__input--error' : ''
              }`}
              value={education.qualification}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(educationIndex, e)}
              required
            />
            {errors[educationIndex].qualification && (
              <p className="form__error-message">
                {errors[educationIndex].qualification}
              </p>
            )}
          </label>
          <label className="form__label">
            Date from<span className="input__label--required">*</span>
            <input
              type="text"
              name="dateFrom"
              className={`form__input ${
                errors[educationIndex].dateFrom ? 'form__input--error' : ''
              }`}
              value={education.dateFrom}
              placeholder="MM/YYYY"
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(educationIndex, e)}
              required
              minLength="7"
              maxLength="7"
            />
            {errors[educationIndex].dateFrom && (
              <p className="form__error-message">
                {errors[educationIndex].dateFrom}
              </p>
            )}
          </label>
          <label className="form__label">
            Date to<span className="input__label--required">*</span>
            <input
              type="text"
              name="dateTo"
              className={`form__input ${
                errors[educationIndex].dateTo ? 'form__input--error' : ''
              }`}
              value={education.dateTo}
              placeholder="MM/YYYY"
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(educationIndex, e)}
              required
              minLength="7"
              maxLength="7"
            />
            {errors[educationIndex].dateTo && (
              <p className="form__error-message">
                {errors[educationIndex].dateTo}
              </p>
            )}
          </label>
        </fieldset>
      ))}
    </form>
  );
}

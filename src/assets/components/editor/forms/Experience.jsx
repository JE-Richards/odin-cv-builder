import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/Experience.css';

export default function Experience(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState(
    data.map(() => ({
      company: '',
      role: '',
      dateFrom: '',
      dateTo: '',
      responsibilities: [''],
    }))
  );

  const validateField = (index, name, value) => {
    let error = '';

    switch (name) {
      case 'company':
        if (!value.trim()) error = 'Company name is required.';
        break;
      case 'role':
        if (!value.trim()) error = 'Role title is required.';
        break;
      case 'dateFrom':
        if (!/^(0[1-9]|1[0-2])\/[12]\d{3}/.test(value) && value !== '') {
          error =
            'The date must be in the format MM/YYYY where both M and Y are digits, and MM must be between 01 and 12.';
        } else if (!value.trim())
          error = 'The date you started this role is required.';
        break;
      case 'dateTo':
        if (!/^(0[1-9]|1[0-2])\/[12]\d{3}/.test(value) && value !== '') {
          error =
            'The date must be in the format MM/YYYY where both M and Y are digits, and MM must be between 01 and 12.';
        } else if (!value.trim())
          error = 'The date you finished this role is required.';
        break;
      case 'responsibilities':
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

  const addExperience = () => {
    const updatedExperience = [
      ...data,
      {
        company: '',
        role: '',
        dateFrom: '',
        dateTo: '',
        responsibilities: [''],
      },
    ];

    handleChanges(updatedExperience);
    setErrors((prevErrors) => [
      ...prevErrors,
      {
        company: '',
        role: '',
        dateFrom: '',
        dateTo: '',
        responsibilities: [''],
      },
    ]);
  };

  const deleteExperience = (index) => {
    const updatedExperience = [...data];
    updatedExperience.splice(index, 1);
    handleChanges(updatedExperience);
    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(index, 1);
      return updatedErrors;
    });
  };

  const addResponsibility = (index) => {
    const updatedExperience = data.map((experience, experienceIndex) =>
      experienceIndex === index
        ? {
            ...experience,
            responsibilities: [...experience.responsibilities, ''],
          }
        : experience
    );

    handleChanges(updatedExperience);
  };

  const deleteResponsibility = (expIndex, respIndex) => {
    const updatedExperience = [...data];
    updatedExperience[expIndex].responsibilities.splice(respIndex, 1);

    handleChanges(updatedExperience);
  };

  const handleExperienceChange = (index, name, value) => {
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
        return;
      } else {
        setErrors((prevErrors) => {
          const updatedErrors = [...prevErrors];
          updatedErrors[index] = {
            ...updatedErrors[index],
            [name]: '',
          };
          return updatedErrors;
        });
      }
    }

    const updatedExperience = data.map((experience, experienceIndex) => {
      return experienceIndex === index
        ? { ...experience, [name]: value }
        : experience;
    });

    handleChanges(updatedExperience);
  };

  const handleResponsibilityChange = (
    experienceIndex,
    responsibilityIndex,
    value
  ) => {
    const updatedExperience = data.map((experience, eIndex) => {
      if (experienceIndex === eIndex) {
        const updatedResponsibilities = experience.responsibilities.map(
          (responsibility, rIndex) =>
            responsibilityIndex === rIndex ? value : responsibility
        );

        return { ...experience, responsibilities: updatedResponsibilities };
      }
      return experience;
    });
    handleChanges(updatedExperience);
  };

  const handleInputBlur = (index, e) => {
    const { name, value } = e.target;
    validateField(index, name, value);
  };

  return (
    <form action="" className="form form--experiences">
      <button
        type="button"
        className="form__btn form__btn--experience"
        onClick={addExperience}
      >
        + Experience
      </button>
      {data.map((experience, experienceIndex) => (
        <fieldset
          key={experienceIndex}
          className="fieldset fieldset--experience"
        >
          <legend className="fieldset__legend">
            {`Experience ${experienceIndex + 1} Details`}
          </legend>
          <div className="form__btn-container">
            <button
              type="button"
              className="form__btn form__btn--delete-experience"
              onClick={() => deleteExperience(experienceIndex)}
              disabled={data.length === 1}
            >
              Delete experience
            </button>
          </div>
          <label className="form__label">
            Company name<span className="input__label--required">*</span>
            <input
              type="text"
              name="company"
              placeholder="Company name"
              className={`form__input ${
                errors[experienceIndex].company ? 'form__input--error' : ''
              }`}
              value={experience.company}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(experienceIndex, e)}
              required
            />
            {errors[experienceIndex].company && (
              <p className="form__error-message">
                {errors[experienceIndex].company}
              </p>
            )}
          </label>
          <label className="form__label">
            Role title<span className="input__label--required">*</span>
            <input
              type="text"
              name="role"
              placeholder="Role title"
              className={`form__input ${
                errors[experienceIndex].role ? 'form__input--error' : ''
              }`}
              value={experience.role}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(experienceIndex, e)}
              required
            />
            {errors[experienceIndex].role && (
              <p className="form__error-message">
                {errors[experienceIndex].role}
              </p>
            )}
          </label>
          <label className="form__label">
            Date from<span className="input__label--required">*</span>
            <input
              type="text"
              name="dateFrom"
              placeholder="MM/YYYY"
              className={`form__input ${
                errors[experienceIndex].dateFrom ? 'form__input--error' : ''
              }`}
              value={experience.dateFrom}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(experienceIndex, e)}
              required
              minLength="7"
              maxLength="7"
            />
            {errors[experienceIndex].dateFrom && (
              <p className="form__error-message">
                {errors[experienceIndex].dateFrom}
              </p>
            )}
          </label>
          <label className="form__label">
            Date to<span className="input__label--required">*</span>
            <input
              type="text"
              name="dateTo"
              placeholder="MM/YYYY"
              className={`form__input ${
                errors[experienceIndex].dateTo ? 'form__input--error' : ''
              }`}
              value={experience.dateTo}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
              onBlur={(e) => handleInputBlur(experienceIndex, e)}
              required
              minLength="7"
              maxLength="7"
            />
            {errors[experienceIndex].dateTo && (
              <p className="form__error-message">
                {errors[experienceIndex].dateTo}
              </p>
            )}
          </label>
          <fieldset className="fieldset fieldset--experience__responsibility">
            <legend className="fieldset__legend">Role responsibilities</legend>
            <button
              type="button"
              onClick={() => addResponsibility(experienceIndex)}
              className="form__btn form__btn--responsibility"
            >
              + Responsibility
            </button>
            {experience.responsibilities.map((resp, respIndex) => (
              <label
                className="form__label form__label--responsibility"
                key={respIndex}
              >
                <span className="visually-hidden">{`Responsibility ${
                  respIndex + 1
                }`}</span>
                <input
                  type="text"
                  className="form__input"
                  placeholder={`Responsibility ${respIndex + 1}`}
                  value={resp}
                  onChange={(e) =>
                    handleResponsibilityChange(
                      experienceIndex,
                      respIndex,
                      e.target.value
                    )
                  }
                  onBlur={handleInputBlur}
                />
                <button
                  type="button"
                  className="form__btn form__btn--delete-responsibility"
                  onClick={() =>
                    deleteResponsibility(experienceIndex, respIndex)
                  }
                  disabled={data[experienceIndex].responsibilities.length === 1}
                >
                  Delete
                </button>
              </label>
            ))}
          </fieldset>
        </fieldset>
      ))}
    </form>
  );
}

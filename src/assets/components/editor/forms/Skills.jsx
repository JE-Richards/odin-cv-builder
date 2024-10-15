import { useState } from 'react';
import './styles/shared-styles.css';
import './styles/Skills.css';

export default function Skills(props) {
  const { data, handleChanges } = props;

  const [errors, setErrors] = useState(data.map(() => ''));

  const validateField = (index, value) => {
    let error = '';

    if (!value.trim()) error = 'A skill is required.';

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = error;
      return updatedErrors;
    });
  };

  const addSkill = () => {
    const updatedSkills = [...data, ''];
    handleChanges(updatedSkills);

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors, ''];
      return updatedErrors;
    });
  };

  const deleteSkill = (index) => {
    const updatedSkills = [...data];
    updatedSkills.splice(index, 1);
    handleChanges(updatedSkills);

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors.splice(index);
      return updatedErrors;
    });
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = data.map((skill, skillIndex) =>
      skillIndex === index ? value : skill
    );
    handleChanges(updatedSkills);
  };

  const handleInputBlur = (index, e) => {
    validateField(index, e.target.value);
  };

  return (
    <form className="form form--skills">
      <button
        type="button"
        className="form__btn form__btn--skills"
        onClick={addSkill}
      >
        + Skill
      </button>
      <fieldset className="fieldset form--skills__inputs">
        <legend className="fieldset__legend visually-hidden">
          Skills<span className="input__label--required">*</span>
        </legend>
        {data.map((skill, skillIndex) => (
          <label className="form__label form__label--skill" key={skillIndex}>
            <span className="visually-hidden">{`Skill ${skillIndex + 1}`}</span>
            <div className="skill-container">
              <input
                type="text"
                className={`form__input ${
                  errors[skillIndex] ? 'form__input--error' : ''
                }`}
                placeholder={`Skill ${skillIndex + 1}`}
                value={skill}
                onChange={(e) => handleSkillChange(skillIndex, e.target.value)}
                onBlur={(e) => handleInputBlur(skillIndex, e)}
              />
              <button
                type="button"
                className="form__btn form__btn--delete-skill"
                onClick={() => deleteSkill(skillIndex)}
                disabled={data.length === 1}
              >
                Delete
              </button>
            </div>
            {errors[skillIndex] && (
              <p className="form__error-message">{errors[skillIndex]}</p>
            )}
          </label>
        ))}
      </fieldset>
    </form>
  );
}

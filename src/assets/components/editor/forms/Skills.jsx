import './styles/shared-styles.css';
import './styles/Skills.css';

export default function Skills(props) {
  const { data, handleChanges } = props;

  const addSkill = () => {
    const updatedSkills = [...data, ''];
    handleChanges(updatedSkills);
  };

  const handleSkillChange = (index, value) => {
    const updatedSkills = data.map((skill, skillIndex) =>
      skillIndex === index ? value : skill
    );
    handleChanges(updatedSkills);
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
        <legend className="fieldset__legend visually-hidden">Skills</legend>
        {data.map((skill, skillIndex) => (
          <input
            type="text"
            className="form__input"
            key={skillIndex}
            placeholder={`Skill ${skillIndex + 1}`}
            value={skill}
            onChange={(e) => handleSkillChange(skillIndex, e.target.value)}
          />
        ))}
      </fieldset>
    </form>
  );
}

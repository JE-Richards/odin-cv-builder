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
      <button type="button" className="form--skills__btn" onClick={addSkill}>
        + Skill
      </button>
      <fieldset className="form--skills__inputs">
        <legend className="visually-hidden">Skills</legend>
        {data.map((skill, skillIndex) => (
          <input
            type="text"
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

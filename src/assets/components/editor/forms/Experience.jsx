import './styles/shared-styles.css';
import './styles/Experience.css';

export default function Experience(props) {
  const { data, handleChanges } = props;

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

  const handleExperienceChange = (index, name, value) => {
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
          <legend className="fieldset__legend visually-hidden">
            {`Experience ${experienceIndex + 1} Details`}
          </legend>
          <label className="form__label">
            Company name
            <input
              type="text"
              name="company"
              placeholder="Company name"
              className="form__input"
              value={experience.company}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
          </label>
          <label className="form__label">
            Role title
            <input
              type="text"
              name="role"
              placeholder="Role title"
              className="form__input"
              value={experience.role}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
          </label>
          <label className="form__label">
            Date from
            <input
              type="date"
              name="dateFrom"
              className="form__input"
              value={experience.dateFrom}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
          </label>
          <label className="form__label">
            Date to
            <input
              type="date"
              name="dateTo"
              className="form__input"
              value={experience.dateTo}
              onChange={(e) =>
                handleExperienceChange(
                  experienceIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
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
              <input
                type="text"
                className="form__input"
                key={respIndex}
                placeholder={`Responsibility ${respIndex + 1}`}
                value={resp}
                onChange={(e) =>
                  handleResponsibilityChange(
                    experienceIndex,
                    respIndex,
                    e.target.value
                  )
                }
              />
            ))}
          </fieldset>
        </fieldset>
      ))}
    </form>
  );
}

import './styles/shared-styles.css';
import './styles/Education.css';

export default function Education(props) {
  const { data, handleChanges } = props;

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
  };

  const handleEducationChange = (index, name, value) => {
    const updatedEducation = data.map((education, educationIndex) =>
      educationIndex === index ? { ...education, [name]: value } : education
    );

    handleChanges(updatedEducation);
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
            Institute name
            <input
              type="text"
              name="institute"
              placeholder="Institute name"
              className="form__input"
              value={education.institute}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
          </label>
          <label className="form__label">
            Qualification achieved
            <input
              type="text"
              name="qualification"
              placeholder="Qualification achieved"
              className="form__input"
              value={education.qualification}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
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
              value={education.dateFrom}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
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
              value={education.dateTo}
              onChange={(e) =>
                handleEducationChange(
                  educationIndex,
                  e.target.name,
                  e.target.value
                )
              }
            />
          </label>
        </fieldset>
      ))}
    </form>
  );
}

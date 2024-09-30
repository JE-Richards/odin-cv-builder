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
        className="form--education__btn"
        onClick={addEducation}
      >
        + Education
      </button>
      {data.map((education, educationIndex) => (
        <fieldset key={educationIndex}>
          <legend className="visually-hidden">
            {`Education ${educationIndex + 1} Details`}
          </legend>
          <label className="form__label">
            Institute name
            <input
              type="text"
              name="institute"
              placeholder="Institute name"
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

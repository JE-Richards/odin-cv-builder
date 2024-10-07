import './styles/shared-styles.css';
import './styles/PersonalSummary.css';

export default function PersonalSummary(props) {
  const { data, handleChanges } = props;

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    handleChanges({ [name]: value });
  };

  return (
    <form className="form form--personal-summary">
      <label className="form__label">
        First name
        <input
          type="text"
          name="firstName"
          placeholder="John"
          className="form__input"
          onChange={handleInputChanges}
          value={data.firstName}
        />
      </label>
      <label className="form__label">
        Last name
        <input
          type="text"
          name="lastName"
          placeholder="Doe"
          className="form__input"
          onChange={handleInputChanges}
          value={data.lastName}
        />
      </label>
      <label className="form__label">
        Profession
        <input
          type="text"
          name="profession"
          placeholder="Web Developer"
          className="form__input"
          onChange={handleInputChanges}
          value={data.profession}
        />
      </label>
      <label className="form__label">
        Professional summary
        <textarea
          name="professionalSummary"
          placeholder="A summary of your career and aspirations"
          onChange={handleInputChanges}
          rows="5"
          cols="50"
          className="form__input form__input--text-area"
          value={data.professionalSummary}
        ></textarea>
      </label>
    </form>
  );
}

import './styles/shared-styles.css';
import './styles/Interests.css';

export default function Interests(props) {
  const { data, handleChanges } = props;

  const addInterest = () => {
    const updatedInterests = [...data, ''];
    handleChanges(updatedInterests);
  };

  const handleInterestChange = (index, value) => {
    const updatedInterests = data.map((interest, interestIndex) =>
      interestIndex === index ? value : interest
    );

    handleChanges(updatedInterests);
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
          <input
            type="text"
            className="form__input"
            key={interestIndex}
            placeholder={`Interest ${interestIndex + 1}`}
            value={interest}
            onChange={(e) =>
              handleInterestChange(interestIndex, e.target.value)
            }
          />
        ))}
      </fieldset>
    </form>
  );
}

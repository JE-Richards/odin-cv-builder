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
        className="form--interests__btn"
        onClick={addInterest}
      >
        + Interest
      </button>
      <fieldset className="form--interests__inputs">
        <legend className="visually-hidden">Hobbies & Interests</legend>
        {data.map((interest, interestIndex) => (
          <input
            type="text"
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

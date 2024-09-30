export default function ContactDetails(props) {
  const { data, handleChanges } = props;

  const handleInputChanges = (e) => {
    const { name, value } = e.target;
    handleChanges({ [name]: value });
  };

  return (
    <form className="form form--contact-details">
      <label className="form__label">
        Email
        <input
          type="email"
          name="email"
          placeholder="john.doe@domain.com"
          onChange={handleInputChanges}
          value={data.email}
        />
      </label>
      <label className="form__label">
        Mobile
        <input
          type="tel"
          name="mobile"
          placeholder="01234567890"
          onChange={handleInputChanges}
          value={data.mobile}
        />
      </label>
      <label className="form__label">
        LinkedIn profile name
        <input
          type="text"
          name="linkedIn"
          placeholder="John-Doe"
          onChange={handleInputChanges}
          value={data.linkedIn}
        />
      </label>
      <label className="form__label">
        Portfolio
        <input
          type="url"
          name="portfolio"
          placeholder="www.myportfolio.com"
          onChange={handleInputChanges}
          value={data.portfolio}
        />
      </label>
    </form>
  );
}
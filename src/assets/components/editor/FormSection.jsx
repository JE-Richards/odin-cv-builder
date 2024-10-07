import './styles/FormSection.css';

export default function FormSection(props) {
  const { title, description, form } = props;

  return (
    <>
      <section className="form-section">
        <div className="form-description">
          <h2 className="form-description__title">{title}</h2>
          <p className="form-description__p">{description}</p>
        </div>
        <div className="form-container">{form}</div>
      </section>
    </>
  );
}

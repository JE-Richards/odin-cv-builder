import './styles/Editor.css';
import PersonalSummary from './forms/PersonalSummary.jsx';
import ContactDetails from './forms/ContactDetails.jsx';
import Experience from './forms/Experience.jsx';
import Education from './forms/Education.jsx';
import Skills from './forms/Skills.jsx';
import Interests from './forms/Interests.jsx';
import FormSection from './FormSection.jsx';

export default function Editor(props) {
  const { formData, formDetails, handleChanges } = props;

  const personalSummary = (
    <PersonalSummary
      data={formData.personalSummary}
      handleChanges={handleChanges.personalSummaryChanges}
    />
  );
  const contactDetails = (
    <ContactDetails
      data={formData.contactDetails}
      handleChanges={handleChanges.contactDetailsChanges}
    />
  );
  const experience = (
    <Experience
      data={formData.experience}
      handleChanges={handleChanges.experienceChanges}
    />
  );
  const education = (
    <Education
      data={formData.education}
      handleChanges={handleChanges.educationChanges}
    />
  );
  const skills = (
    <Skills
      data={formData.skills}
      handleChanges={handleChanges.skillsChanges}
    />
  );
  const interests = (
    <Interests
      data={formData.interests}
      handleChanges={handleChanges.interestsChanges}
    />
  );

  return (
    <section className="editor">
      <div className="editor__details">
        <h1 className="editor__details__title">{formDetails.editor.title}</h1>
        <p className="editor__details__text">
          {formDetails.editor.description}
        </p>
      </div>

      <FormSection
        title={formDetails.personalSummary.title}
        description={formDetails.personalSummary.description}
        form={personalSummary}
      />

      <FormSection
        title={formDetails.contactDetails.title}
        description={formDetails.contactDetails.description}
        form={contactDetails}
      />

      <FormSection
        title={formDetails.experience.title}
        description={formDetails.experience.description}
        form={experience}
      />

      <FormSection
        title={formDetails.education.title}
        description={formDetails.education.description}
        form={education}
      />

      <FormSection
        title={formDetails.skills.title}
        description={formDetails.skills.description}
        form={skills}
      />

      <FormSection
        title={formDetails.interests.title}
        description={formDetails.interests.description}
        form={interests}
      />
    </section>
  );
}

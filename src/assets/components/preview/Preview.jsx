import './styles/Preview.css';
import Icon from '@mdi/react';
import { mdiEmailOutline, mdiPhoneOutline, mdiBriefcaseOutline } from '@mdi/js';

export default function Preview(props) {
  const { cvData } = props;

  // Only render if at least 1 input from experience is populated
  const experience = cvData.experience
    .filter(
      (exp) =>
        exp.company ||
        exp.role ||
        exp.dateFrom ||
        exp.dateTo ||
        (exp.responsibilities && exp.responsibilities.length > 1)
    )
    .map((exp, expIndex) => (
      <div className="experience-item" key={expIndex}>
        <div className="experience__company__head">
          <h3 className="experience__company">{exp.company}</h3>
          <div className="experience__role__dates">
            <p>{`${exp.dateFrom} - ${exp.dateTo}`}</p>
          </div>
        </div>
        <h4 className="experience__role">{exp.role}</h4>
        <ul className="experience__responsibilities">
          {exp.responsibilities.map((resp, respIndex) => (
            <li className="experience__responsibilities__item" key={respIndex}>
              {resp}
            </li>
          ))}
        </ul>
      </div>
    ));

  // only render if at least 1 input from education is populated
  const education = cvData.education
    .filter(
      (edu) => edu.institute || edu.qualification || edu.dateFrom || edu.dateTo
    )
    .map((edu, eduIndex) => (
      <div className="education-item" key={eduIndex}>
        <h3>{edu.institute}</h3>
        <h4>{edu.qualification}</h4>
        <div>
          <p>{`${edu.dateFrom} - ${edu.dateTo}`}</p>
        </div>
      </div>
    ));

  const skills = cvData.skills
    .filter((skill) => skill !== '')
    .map((skill, skillIndex) => (
      <li className="skill--item" key={skillIndex}>
        {skill}
      </li>
    ));

  const interests = cvData.interests
    .filter((interest) => interest !== '')
    .map((interest, interestIndex) => (
      <li className="interest--item" key={interestIndex}>
        {interest}
      </li>
    ));

  return (
    <div className="preview-container">
      <section className="preview">
        <div className="preview__details-personal">
          <h1 className="name">
            {cvData.personalSummary.firstName +
              ' ' +
              cvData.personalSummary.lastName}
          </h1>
          <h2 className="profession">{cvData.personalSummary.profession}</h2>
          <p className="professional-summary">
            {cvData.personalSummary.professionalSummary}
          </p>
        </div>
        <div className="preview__details-contact">
          {cvData.contactDetails.email && (
            <div className="contact-container">
              <Icon path={mdiEmailOutline} size={1} />
              <p>{cvData.contactDetails.email}</p>
            </div>
          )}
          {cvData.contactDetails.mobile && (
            <div className="contact-container">
              <Icon path={mdiPhoneOutline} size={1} />
              <p>{cvData.contactDetails.mobile}</p>
            </div>
          )}
          {cvData.contactDetails.linkedIn && (
            <div className="contact-container">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="linkedIn-icon"
              >
                <title>linkedin</title>
                <path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17A1.4 1.4 0 0 1 15.71 13.57V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19A1.69 1.69 0 0 0 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56M8.27 18.5V10.13H5.5V18.5H8.27Z" />
              </svg>
              <p>
                {
                  cvData.contactDetails.linkedIn.match(
                    /(www\.linkedin\.com\/in\/)(.*)/
                  )[1]
                }
                <br />
                {
                  cvData.contactDetails.linkedIn.match(
                    /(www\.linkedin\.com\/in\/)(.*)/
                  )[2]
                }
              </p>
            </div>
          )}
          {cvData.contactDetails.portfolio && (
            <div className="contact-container">
              <Icon path={mdiBriefcaseOutline} size={1} />
              <p>{cvData.contactDetails.portfolio}</p>
            </div>
          )}
        </div>
        <div className="preview__history">
          <div className="preview__history__experience">
            <h2 className="preview__heading">Experience</h2>
            <div className="experience-container">{experience}</div>
          </div>
          <div className="preview__history__education">
            <h2 className="preview__heading">Education</h2>
            <div className="education-container">{education}</div>
          </div>
        </div>

        <div className="preview__side">
          <div className="preview__skills">
            <h2 className="preview__heading">Skills</h2>
            <ul className="preview__side__list">{skills}</ul>
          </div>
          <div className="preview__interests">
            <h2 className="preview__heading">Hobbies & Interests</h2>
            <ul className="preview__side__list">{interests}</ul>
          </div>
        </div>
      </section>
    </div>
  );
}

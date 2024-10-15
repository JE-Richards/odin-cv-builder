import './styles/App.css';
import Editor from './assets/components/editor/Editor.jsx';
import { useState } from 'react';

function App() {
  const emptyData = {
    personalSummary: {
      firstName: '',
      lastName: '',
      profession: '',
      professionalSummary: '',
    },
    contactDetails: {
      email: '',
      mobile: '',
      linkedIn: '',
      portfolio: '',
    },
    experience: [
      {
        company: '',
        role: '',
        dateFrom: '',
        dateTo: '',
        responsibilities: [''],
      },
    ],
    education: [
      {
        institute: '',
        qualification: '',
        dateFrom: '',
        dateTo: '',
      },
    ],
    skills: [''],
    interests: [''],
  };

  const [formData, setFormData] = useState(emptyData);

  const clearForms = () => setFormData(emptyData);

  const formDetails = {
    editor: {
      title: 'CV Builder',
      description:
        'This app lets you create a simple one-page CV. Fill out each of the forms below to populate the CV.',
    },
    personalSummary: {
      title: '1. Personal Details',
      description:
        'This critical part of your CV gives potential employers a glimpse of who you are. Think of it as an opportunity to introduce yourself, highlight some of your skills, and provide a brief summary of your career and goals.',
    },
    contactDetails: {
      title: '2. Contact Details',
      description:
        "It's important to leave your contact details so employers have multiple ways to get back in touch with you.",
    },
    experience: {
      title: '3. Professional Experience',
      description: [
        'This is where you can showcase your professional experience and accomplishments to help demonstrate what you could contribute to your potential employer.',
        <br />,
        "Don't forget to include a brief description of your duties and accomplishments in the responsibility section. This helps employers understand the scope of your responsibilities and the impact it had.",
      ],
    },
    education: {
      title: '4. Education History',
      description: [
        'Your education history demonstrates your existing qualifications in addition to your commitment to learning and willingess to acquire new skills.',
        <br />,
        'If you have multiple qualifications, list them in reverse chronological order with the most recent qualification listed first.',
        <br />,
        "If you don't have any formal education, include any relevant certficates or training you may have received.",
      ],
    },
    skills: {
      title: '5. Skills',
      description:
        "This is an opportunity for you to showcase your job-relevant skills, abilities, and qualifications. Be specific about your skills and match them to the requirements of the job you're applying for and don't forget to include both hard and soft skills.",
    },
    interests: {
      title: '6. Hobbies & Interests',
      description: [
        'Your hobbies and interests can give employers a better sense of who you are and what motivates you.',
        <br />,
        'Make sure to list hobbies and interests that are ',
        <strong>relevant</strong>,
        " to the job you're applying for, and that highlight your personality, skills, and values. For example, if you're applying for a job in tech, you might consider including interests such as AI or cybersecurity.",
      ],
    },
  };

  const handlePersonalSummaryChanges = (changes) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      personalSummary: {
        ...prevFormData.personalSummary,
        ...changes,
      },
    }));
  };

  const handleContactDetailsChanges = (changes) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      contactDetails: {
        ...prevFormData.contactDetails,
        ...changes,
      },
    }));
  };

  const handleExperienceChanges = (updatedExperience) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      experience: updatedExperience,
    }));
  };

  const handleEducationChanges = (updatedEducation) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      education: updatedEducation,
    }));
  };

  const handleSkillsChanges = (updatedSkills) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      skills: updatedSkills,
    }));
  };

  const handleInterestsChanges = (updatedInterests) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      interests: updatedInterests,
    }));
  };

  const handleChangesFns = {
    clearForms: clearForms,
    personalSummaryChanges: handlePersonalSummaryChanges,
    contactDetailsChanges: handleContactDetailsChanges,
    experienceChanges: handleExperienceChanges,
    educationChanges: handleEducationChanges,
    skillsChanges: handleSkillsChanges,
    interestsChanges: handleInterestsChanges,
  };

  return (
    <>
      <div className="container">
        <Editor
          formData={formData}
          formDetails={formDetails}
          handleChanges={handleChangesFns}
        />
      </div>
    </>
  );
}

export default App;

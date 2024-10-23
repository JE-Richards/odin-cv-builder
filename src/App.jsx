import './styles/App.css';
import Editor from './assets/components/editor/Editor.jsx';
import Header from './assets/components/header/Header.jsx';
import Preview from './assets/components/preview/Preview.jsx';
import Modal from './assets/components/modal/Modal.jsx';
import exportPDF from './util/exportPDF.jsx';
import { emptyData, exampleData } from './assets/data/data.js';
import { useState } from 'react';
import { debounce } from 'lodash';

function App() {
  const savedData = JSON.parse(localStorage.getItem('cvData')) || emptyData;

  const [formData, setFormData] = useState(savedData);
  const [previewMode, setPreviewMode] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const loadExample = () => {
    setModalOpen(true);
  };

  const loadPreview = () => {
    setPreviewMode(true);
  };

  const loadEditor = () => {
    setPreviewMode(false);
  };

  const handleExport = () => {
    exportPDF('.preview');
  };

  const modalConfirm = () => {
    setFormData(exampleData);
    saveToLocalStorage(exampleData);
    setModalOpen(false);
  };

  const modalDecline = () => {
    setModalOpen(false);
  };

  const modalMessage =
    'Are you sure you want to load the example CV? Doing so will erase any data you have input and it cannot be undone.';

  const clearForms = () => {
    setFormData(emptyData);
    saveToLocalStorage(emptyData);
  };

  const formDetails = {
    editor: {
      title: 'CV Editor',
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
      description: (
        <>
          This is where you can showcase your professional experience and
          accomplishments to help demonstrate what you could contribute to your
          potential employer.
          <br />
          Don't forget to include a brief description of your duties and
          accomplishments in the responsibility section. This helps employers
          understand the scope of your responsibilities and the impact it had.
        </>
      ),
    },
    education: {
      title: '4. Education History',
      description: (
        <>
          Your education history demonstrates your existing qualifications in
          addition to your commitment to learning and willingess to acquire new
          skills.
          <br /> If you have multiple qualifications, list them in reverse
          chronological order with the most recent qualification listed first.
          <br />
          If you don't have any formal education, include any relevant
          certficates or training you may have received.
        </>
      ),
    },
    skills: {
      title: '5. Skills',
      description:
        "This is an opportunity for you to showcase your job-relevant skills, abilities, and qualifications. Be specific about your skills and match them to the requirements of the job you're applying for and don't forget to include both hard and soft skills.",
    },
    interests: {
      title: '6. Hobbies & Interests',
      description: (
        <>
          Your hobbies and interests can give employers a better sense of who
          you are and what motivates you.
          <br />
          Make sure to list hobbies and interests that are{' '}
          <strong>relevant</strong> to the job you're applying for, and that
          highlight your personality, skills, and values. For example, if you're
          applying for a job in tech, you might consider including interests
          such as AI or cybersecurity.
        </>
      ),
    },
  };

  // Use debounce to delay saving for 500ms
  const saveToLocalStorage = debounce((data) => {
    localStorage.setItem('cvData', JSON.stringify(data));
  }, 500);

  const handlePersonalSummaryChanges = (changes) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        personalSummary: {
          ...prevFormData.personalSummary,
          ...changes,
        },
      };

      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
  };

  const handleContactDetailsChanges = (changes) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        contactDetails: {
          ...prevFormData.contactDetails,
          ...changes,
        },
      };
      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
  };

  const handleExperienceChanges = (updatedExperience) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        experience: updatedExperience,
      };
      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
  };

  const handleEducationChanges = (updatedEducation) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        education: updatedEducation,
      };
      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
  };

  const handleSkillsChanges = (updatedSkills) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        skills: updatedSkills,
      };
      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
  };

  const handleInterestsChanges = (updatedInterests) => {
    setFormData((prevFormData) => {
      const updatedFormData = {
        ...prevFormData,
        interests: updatedInterests,
      };
      saveToLocalStorage(updatedFormData);
      return updatedFormData;
    });
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

  const headerFuncs = {
    loadExample: loadExample,
    loadPreview: loadPreview,
    loadEditor: loadEditor,
    exportPDF: handleExport,
  };

  return (
    <>
      <Header funcs={headerFuncs} isPreviewMode={previewMode} />
      <Modal
        isOpen={modalOpen}
        onConfirm={modalConfirm}
        onClose={modalDecline}
        message={modalMessage}
      />
      <div className="container">
        {previewMode ? (
          <Preview cvData={formData} />
        ) : (
          <Editor
            formData={formData}
            formDetails={formDetails}
            handleChanges={handleChangesFns}
          />
        )}
      </div>
    </>
  );
}

export default App;

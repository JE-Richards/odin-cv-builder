import App from '../App.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { useState } from 'react';

// Mock of each component to test App independently of them
jest.mock(
  '../assets/components/editor/Editor.jsx',
  () =>
    ({ formData, formDetails, handleChanges }) => {
      return (
        <div>
          <h1>{formDetails.editor.title}</h1>

          {/* buttons to simulate calling the handleChanges functions */}
          <button onClick={handleChanges.clearForms}>Clear forms</button>

          <button
            onClick={() =>
              handleChanges.personalSummaryChanges({ firstName: 'Test' })
            }
          >
            Update Personal Summary
          </button>

          <button
            onClick={() =>
              handleChanges.contactDetailsChanges({ email: 'test@test.com' })
            }
          >
            Update Contact Details
          </button>

          <button
            onClick={() =>
              handleChanges.experienceChanges([
                {
                  company: 'Test co',
                  role: '',
                  dateFrom: '',
                  dateTo: '',
                  responsibilities: [''],
                },
              ])
            }
          >
            Update Experience
          </button>

          <button
            onClick={() =>
              handleChanges.educationChanges([
                {
                  institute: 'Test Uni',
                  qualification: '',
                  dateFrom: '',
                  dateTo: '',
                },
              ])
            }
          >
            Update Education
          </button>

          <button
            onClick={() => handleChanges.skillsChanges(['testing skill'])}
          >
            Update Skills
          </button>

          <button
            onClick={() => handleChanges.interestsChanges(['reading tests'])}
          >
            Update Interests
          </button>

          {/* elements to render state data to test changes are retained */}
          <p>First name: {formData.personalSummary.firstName}</p>
          <p>Email: {formData.contactDetails.email}</p>
          <p>Company: {formData.experience[0].company}</p>
          <p>Institute: {formData.education[0].institute}</p>
          <p>Skills: {formData.skills[0]}</p>
          <p>Interests: {formData.interests[0]}</p>
        </div>
      );
    }
);

jest.mock(
  '../assets/components/header/Header.jsx',
  () =>
    ({ funcs, isPreviewMode }) => {
      return (
        <div>
          <button type="button" onClick={() => funcs.loadExample()}>
            Load example
          </button>
          <button type="button" onClick={() => funcs.loadPreview()}>
            Load preview
          </button>
          <button type="button" onClick={() => funcs.loadEditor()}>
            Load editor
          </button>
          <button type="button" onClick={() => funcs.exportPDF()}>
            Export pdf
          </button>
        </div>
      );
    }
);

jest.mock('../assets/components/preview/Preview.jsx', () => ({ cvData }) => {
  return (
    <div>
      <p>Test preview</p>
    </div>
  );
});

jest.mock(
  '../assets/components/modal/Modal.jsx',
  () =>
    ({ isOpen, onConfirm, onClose, message }) => {
      return (
        <>
          {isOpen && (
            <div>
              <p>Modal open test</p>
              <button type="button" onClick={onClose}>
                Close
              </button>
            </div>
          )}
        </>
      );
    }
);

jest.mock(
  '../util/exportPDF.jsx',
  () =>
    ({ elementClass }) =>
      jest.fn()
);

beforeEach(() => {
  jest.spyOn(window.localStorage.__proto__, 'getItem');
  jest.spyOn(window.localStorage.__proto__, 'setItem');

  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing App component', () => {
  describe('Testing initial render', () => {
    test('App renders without crashing', () => {
      render(<App />);
      expect(screen.getByText('CV Editor')).toBeInTheDocument();
    });

    test('Initial state is set correctly', () => {
      render(<App />);

      // Check header gets rendered
      expect(screen.getByText(/Load example/)).toBeInTheDocument();
      expect(screen.getByText(/Load preview/)).toBeInTheDocument();
      expect(screen.getByText(/Load editor/)).toBeInTheDocument();
      expect(screen.getByText(/Export pdf/)).toBeInTheDocument();

      // Check that the initial values are rendered correctly
      expect(screen.getByText(/First name:/)).toHaveTextContent('First name:');
      expect(screen.getByText(/Email:/)).toHaveTextContent('Email:');
      expect(screen.getByText(/Company:/)).toHaveTextContent('Company:');
      expect(screen.getByText(/Institute:/)).toHaveTextContent('Institute:');
      expect(screen.getByText(/Skills:/)).toHaveTextContent('Skills:');
      expect(screen.getByText(/Interests:/)).toHaveTextContent('Interests:');
    });
  });

  describe('Testing state changes', () => {
    test('handleChanges functions correctly update formData state', () => {
      render(<App />);

      // Test handlePersonalSummaryChanges
      const personalSummaryBtn = screen.getByRole('button', {
        name: /Update Personal Summary/,
      });
      const personalSummaryText = screen.getByText(/First name:/);
      fireEvent.click(personalSummaryBtn);
      expect(personalSummaryText).toHaveTextContent('First name: Test');

      // Test handleContactDetailsChanges
      const contactDetailsBtn = screen.getByRole('button', {
        name: /Update Contact Details/,
      });
      const contactDetailsText = screen.getByText(/Email:/);
      fireEvent.click(contactDetailsBtn);
      expect(contactDetailsText).toHaveTextContent('Email: test@test.com');

      // Test handleExperienceChanges
      const experienceBtn = screen.getByRole('button', {
        name: /Update Experience/,
      });
      const experienceText = screen.getByText(/Company:/);
      fireEvent.click(experienceBtn);
      expect(experienceText).toHaveTextContent('Company: Test co');

      // Test handleEducationChanges
      const educationBtn = screen.getByRole('button', {
        name: /Update Education/,
      });
      const educationText = screen.getByText(/Institute:/);
      fireEvent.click(educationBtn);
      expect(educationText).toHaveTextContent('Institute: Test Uni');

      // Test handleSkillsChanges
      const skillsBtn = screen.getByRole('button', {
        name: /Update Skills/,
      });
      const skillsText = screen.getByText(/Skills:/);
      fireEvent.click(skillsBtn);
      expect(skillsText).toHaveTextContent('Skills: testing skill');

      // Test handleInterestsChanges
      const interestsBtn = screen.getByRole('button', {
        name: /Update Interests/,
      });
      const interestsText = screen.getByText(/Interests:/);
      fireEvent.click(interestsBtn);
      expect(interestsText).toHaveTextContent('Interests: reading tests');

      // Test clearForms
      const clearFormsBtn = screen.getByRole('button', { name: 'Clear forms' });
      fireEvent.click(clearFormsBtn);
      expect(personalSummaryText).toHaveTextContent('First name:');
      expect(contactDetailsText).toHaveTextContent('Email:');
      expect(experienceText).toHaveTextContent('Company:');
      expect(educationText).toHaveTextContent('Institute:');
      expect(skillsText).toHaveTextContent('Skills:');
      expect(interestsText).toHaveTextContent('Interests:');
    });

    test('Display swaps between editor and preview as previewMode state changes', () => {
      render(<App />);

      const loadPreviewBtn = screen.getByRole('button', {
        name: 'Load preview',
      });
      const loadEditorBtn = screen.getByRole('button', { name: 'Load editor' });

      expect(screen.getByText(/First name:/)).toBeInTheDocument();

      fireEvent.click(loadPreviewBtn);

      expect(screen.getByText(/Test preview/)).toBeInTheDocument();

      fireEvent.click(loadEditorBtn);

      expect(screen.getByText(/First name:/)).toBeInTheDocument();
    });

    test('Modal renders when modalOpen state changes', () => {
      render(<App />);

      const loadExampleBtn = screen.getByRole('button', {
        name: 'Load example',
      });

      expect(screen.queryByText('Modal open test')).not.toBeInTheDocument();

      fireEvent.click(loadExampleBtn);

      expect(screen.queryByText('Modal open test')).toBeInTheDocument();
      const closeModalBtn = screen.getByRole('button', { name: 'Close' });

      fireEvent.click(closeModalBtn);

      expect(screen.queryByText('Modal open test')).not.toBeInTheDocument();
    });
  });

  describe('Testing local storage implementation', () => {
    const mockPopulatedData = JSON.stringify({
      personalSummary: {
        firstName: 'Person',
        lastName: '',
        profession: '',
        professionalSummary: '',
      },
      contactDetails: {
        email: 'email@email.com',
        mobile: '',
        linkedIn: '',
        portfolio: '',
      },
      experience: [
        {
          company: 'The Company',
          role: '',
          dateFrom: '',
          dateTo: '',
          responsibilities: [''],
        },
      ],
      education: [
        {
          institute: 'The Institute',
          qualification: '',
          dateFrom: '',
          dateTo: '',
        },
      ],
      skills: ['Robotics'],
      interests: ['Sleeping'],
    });

    test('Testing initial load from storage when storage is empty', () => {
      window.localStorage.getItem.mockReturnValueOnce(null);
      render(<App />);

      expect(screen.getByText(/First name:/)).toHaveTextContent('First name:');
      expect(screen.getByText(/Email:/)).toHaveTextContent('Email:');
      expect(screen.getByText(/Company:/)).toHaveTextContent('Company:');
      expect(screen.getByText(/Institute:/)).toHaveTextContent('Institute:');
      expect(screen.getByText(/Skills:/)).toHaveTextContent('Skills:');
      expect(screen.getByText(/Interests:/)).toHaveTextContent('Interests:');
    });

    test('Testing intitial load from storage when storage is populated', () => {
      window.localStorage.getItem.mockReturnValueOnce(mockPopulatedData);
      render(<App />);

      expect(screen.getByText(/First name:/)).toHaveTextContent(
        'First name: Person'
      );
      expect(screen.getByText(/Email:/)).toHaveTextContent(
        'Email: email@email.com'
      );
      expect(screen.getByText(/Company:/)).toHaveTextContent(
        'Company: The Company'
      );
      expect(screen.getByText(/Institute:/)).toHaveTextContent(
        'Institute: The Institute'
      );
      expect(screen.getByText(/Skills:/)).toHaveTextContent('Skills: Robotics');
      expect(screen.getByText(/Interests:/)).toHaveTextContent(
        'Interests: Sleeping'
      );
    });

    test('Saves form data to local storage on change with debounce', async () => {
      jest.useFakeTimers();
      window.localStorage.getItem.mockReturnValueOnce(null);
      render(<App />);

      const personalSummaryBtn = screen.getByRole('button', {
        name: /Update Personal Summary/,
      });
      fireEvent.click(personalSummaryBtn);

      // Fast-forward time to account for debounce delay
      jest.advanceTimersByTime(500);

      expect(localStorage.setItem).toHaveBeenCalledWith(
        'cvData',
        expect.stringContaining('"firstName":"Test"')
      );

      jest.useRealTimers();
    });
  });
});

import App from '../App.jsx';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { useState } from 'react';

// Mock of Editor component to test App independently of other components
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

beforeEach(() => {
  jest.clearAllMocks();

  render(<App />);
});

afterEach(cleanup);

describe('Testing App component', () => {
  describe('Testing initial render', () => {
    test('App renders without crashing', () => {
      expect(screen.getByText(/CV Builder/)).toBeInTheDocument();
    });

    test('Initial state is set correctly', () => {
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
    test('handleChanges functions correctly update state values', () => {
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
  });
});

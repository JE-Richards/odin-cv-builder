import Editor from '../Editor.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import FormSection from '../FormSection.jsx';
import PersonalSummary from '../forms/PersonalSummary.jsx';
import ContactDetails from '../forms/ContactDetails.jsx';
import Experience from '../forms/Experience.jsx';
import Education from '../forms/Education.jsx';
import Skills from '../forms/Skills.jsx';
import Interests from '../forms/Interests.jsx';

const mockData = {
  personalSummary: {
    firstName: 'Tester',
    lastName: 'Testing',
    profession: 'Senior Tester',
    professionalSummary: 'I test things',
  },
  contactDetails: {
    email: 'test@test.com',
    mobile: '22222222222',
    linkedIn: 'tester-testing',
    portfolio: 'www.fakedomain.com',
  },
  experience: [
    {
      company: 'Test inc',
      role: 'Teseter',
      dateFrom: '2022-01-01',
      dateTo: '2024-01-01',
      responsibilities: ['Testing', 'Coding'],
    },
  ],
  education: [
    {
      institute: 'Test School',
      qualification: 'Testing code',
      dateFrom: '2020-01-01',
      dateTo: '2021-01-01',
    },
  ],
  skills: ['Code', 'Testing'],
  interests: ['Coding', 'Music'],
};

const mockEmptyData = {
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

const mockDetails = {
  editor: { title: 'Editor title', details: 'Editor details here' },
  personalSummary: {
    title: 'Personal summary title',
    details: 'Personal summary details here',
  },
  contactDetails: {
    title: 'Contact details title',
    details: 'Contact details details here',
  },
  experience: { title: 'Experience title', details: 'Experience details here' },
  education: { title: 'Education title', details: 'Education details here' },
  skills: { title: 'Skills title', details: 'Skills details here' },
  interests: { title: 'Interests title', details: 'Interests details here' },
};

const mockEmptyDetails = {
  editor: { title: '', details: '' },
  personalSummary: { title: '', details: '' },
  contactDetails: { title: '', details: '' },
  experience: { title: '', details: '' },
  education: { title: '', details: '' },
  skills: { title: '', details: '' },
  interests: { title: '', details: '' },
};

const mockHandleChanges = {
  personalSummaryChanges: jest.fn(),
  contactDetailsChanges: jest.fn(),
  experienceChanges: jest.fn(),
  educationChanges: jest.fn(),
  skillsChanges: jest.fn(),
  interestsChanges: jest.fn(),
};

// Mock components called in Editor
jest.mock('../forms/PersonalSummary.jsx', () =>
  jest.fn(() => <div>Mocked PersonalSummary</div>)
);
jest.mock('../forms/ContactDetails.jsx', () =>
  jest.fn(() => <div>Mocked ContactDetails</div>)
);
jest.mock('../forms/Experience.jsx', () =>
  jest.fn(() => <div>Mocked Experience</div>)
);
jest.mock('../forms/Education.jsx', () =>
  jest.fn(() => <div>Mocked Education</div>)
);
jest.mock('../forms/Skills.jsx', () => jest.fn(() => <div>Mocked Skills</div>));
jest.mock('../forms/Interests.jsx', () =>
  jest.fn(() => <div>Mocked Interests</div>)
);

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Editor component', () => {
  describe('Testing the initial rendering', () => {
    test('Editor correctly renders', () => {
      render(
        <Editor
          formData={mockData}
          formDetails={mockDetails}
          handleChanges={mockHandleChanges}
        />
      );

      // Check render of Editor specific elements
      const editorTitle = screen.getByText('Editor title');
      const editorDescription = screen.getByText('Editor details here');
      expect(editorTitle).toBeInTheDocument();
      expect(editorDescription).toBeInTheDocument();

      // Check child components are rendered via mocks
      expect(screen.getByText('Mocked PersonalSummary')).toBeInTheDocument();
      expect(screen.getByText('Mocked ContactDetails')).toBeInTheDocument();
      expect(screen.getByText('Mocked Experience')).toBeInTheDocument();
      expect(screen.getByText('Mocked Education')).toBeInTheDocument();
      expect(screen.getByText('Mocked Skills')).toBeInTheDocument();
      expect(screen.getByText('Mocked Interests')).toBeInTheDocument();
    });
  });

  describe('Testing interaction with child components', () => {
    test('Props are being passed correctly to child components', () => {
      render(
        <Editor
          formData={mockData}
          formDetails={mockDetails}
          handleChanges={mockHandleChanges}
        />
      );

      // Check prop interaction via mocks
      expect(PersonalSummary).toHaveBeenCalledWith(
        {
          data: mockData.personalSummary,
          handleChanges: mockHandleChanges.personalSummaryChanges,
        },
        expect.anything()
      );

      expect(ContactDetails).toHaveBeenCalledWith(
        {
          data: mockData.contactDetails,
          handleChanges: mockHandleChanges.contactDetailsChanges,
        },
        expect.anything()
      );

      expect(Experience).toHaveBeenCalledWith(
        {
          data: mockData.experience,
          handleChanges: mockHandleChanges.experienceChanges,
        },
        expect.anything()
      );

      expect(Education).toHaveBeenCalledWith(
        {
          data: mockData.education,
          handleChanges: mockHandleChanges.educationChanges,
        },
        expect.anything()
      );

      expect(Skills).toHaveBeenCalledWith(
        {
          data: mockData.skills,
          handleChanges: mockHandleChanges.skillsChanges,
        },
        expect.anything()
      );

      expect(Interests).toHaveBeenCalledWith(
        {
          data: mockData.interests,
          handleChanges: mockHandleChanges.interestsChanges,
        },
        expect.anything()
      );
    });
  });
});

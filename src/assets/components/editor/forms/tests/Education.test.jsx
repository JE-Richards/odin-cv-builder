import Education from '../Education.jsx';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { TestEnvironment } from 'jest-environment-jsdom';
import { useState } from 'react';

const mockData = [
  {
    institute: 'Test',
    qualification: 'Test Cert',
    dateFrom: '09/2023',
    dateTo: '09/2024',
  },
];

const mockEmptyData = [
  {
    institute: '',
    qualification: '',
    dateFrom: '',
    dateTo: '',
  },
];

function MockParentComponent({ data }) {
  const [educationData, setEducationData] = useState(data);

  const handleChanges = (updatedEducation) => {
    setEducationData(updatedEducation);
  };

  return <Education data={educationData} handleChanges={handleChanges} />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Education component', () => {
  describe('Testing initial render', () => {
    test('Form correctly renders button and inputs (blank data)', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      // Button rendering
      const addEducationBtn = screen.getByRole('button', {
        name: /\+ Education/i,
      });
      expect(addEducationBtn).toBeInTheDocument();

      // Fieldset rendering
      const educationFieldset = screen.getByRole('group');
      expect(educationFieldset).toBeInTheDocument();

      // Check fieldset is the correct one via legend
      const legend = screen.getByText(/Education 1 Details/i);
      expect(legend).toBeInTheDocument();
      expect(educationFieldset).toContainElement(legend);

      // Ensure all inputs render
      const instituteInput = screen.getByPlaceholderText('Institute name');
      const qualificationInput = screen.getByPlaceholderText(
        'Qualification achieved'
      );
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      expect(instituteInput).toBeInTheDocument();
      expect(instituteInput.value).toBe('');
      expect(educationFieldset).toContainElement(instituteInput);

      expect(qualificationInput).toBeInTheDocument();
      expect(qualificationInput.value).toBe('');
      expect(educationFieldset).toContainElement(qualificationInput);

      expect(dateFromInput).toBeInTheDocument();
      expect(dateFromInput.value).toBe('');
      expect(educationFieldset).toContainElement(dateFromInput);

      expect(dateToInput).toBeInTheDocument();
      expect(dateToInput.value).toBe('');
      expect(educationFieldset).toContainElement(dateToInput);
    });

    test('Form correctly displays data values passed in via props', () => {
      render(<MockParentComponent data={mockData} />);

      const instituteInput = screen.getByPlaceholderText('Institute name');
      const qualificationInput = screen.getByPlaceholderText(
        'Qualification achieved'
      );
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      expect(instituteInput.value).toBe('Test');
      expect(qualificationInput.value).toBe('Test Cert');
      expect(dateFromInput.value).toBe('09/2023');
      expect(dateToInput.value).toBe('09/2024');
    });
  });

  describe('Testing form buttons and inputs', () => {
    test('Clicking the button adds a new education fieldset with no input values', () => {
      render(<MockParentComponent data={mockData} />);

      const addEducationBtn = screen.getByRole('button', {
        name: /\+ Education/i,
      });

      fireEvent.click(addEducationBtn);

      const fieldsets = screen.getAllByRole('group');
      expect(fieldsets.length).toBe(mockData.length + 1);

      // ensure inputs within new fieldset all render
      const instituteInput = within(fieldsets[1]).getByPlaceholderText(
        'Institute name'
      );
      const qualificationInput = within(fieldsets[1]).getByPlaceholderText(
        'Qualification achieved'
      );
      const dateFromInput = within(fieldsets[1]).getByLabelText(/Date from/i);
      const dateToInput = within(fieldsets[1]).getByLabelText(/Date to/i);

      expect(instituteInput).toBeInTheDocument();
      expect(qualificationInput).toBeInTheDocument();
      expect(dateFromInput).toBeInTheDocument();
      expect(dateToInput).toBeInTheDocument();

      expect(instituteInput.value).toBe('');
      expect(qualificationInput.value).toBe('');
      expect(dateFromInput.value).toBe('');
      expect(dateToInput.value).toBe('');
    });

    test('Changes to inputs correctly update values', () => {
      render(<MockParentComponent data={mockData} />);

      const instituteInput = screen.getByPlaceholderText('Institute name');
      const qualificationInput = screen.getByPlaceholderText(
        'Qualification achieved'
      );
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      fireEvent.change(instituteInput, { target: { value: 'Harvard' } });
      expect(instituteInput.value).toBe('Harvard');

      fireEvent.change(qualificationInput, { target: { value: 'BSc' } });
      expect(qualificationInput.value).toBe('BSc');

      fireEvent.change(dateFromInput, { target: { value: '01/2023' } });
      expect(dateFromInput.value).toBe('01/2023');

      fireEvent.change(dateToInput, { target: { value: '01/2024' } });
      expect(dateToInput.value).toBe('01/2024');
    });

    test('Changes are retained when a new education fieldset is added', () => {
      render(<MockParentComponent data={mockData} />);

      const addEducationBtn = screen.getByRole('button', {
        name: /\+ Education/i,
      });

      const instituteInput = screen.getByPlaceholderText('Institute name');
      fireEvent.change(instituteInput, { target: { value: 'Harvard' } });

      fireEvent.click(addEducationBtn);

      expect(instituteInput.value).toBe('Harvard');
    });
  });

  describe('Testing form validation', () => {
    test('Shows error message when input is required, has no input value, and is blurred', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const instituteInput = screen.getByPlaceholderText('Institute name');
      const qualificationInput = screen.getByPlaceholderText(
        'Qualification achieved'
      );
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      fireEvent.blur(instituteInput);
      expect(
        screen.getByText('Institute name is required.')
      ).toBeInTheDocument();

      fireEvent.blur(qualificationInput);
      expect(
        screen.getByText('Qualification achieved is required.')
      ).toBeInTheDocument();

      fireEvent.blur(dateFromInput);
      expect(
        screen.getByText('The date you started this qualification is required.')
      ).toBeInTheDocument();

      fireEvent.blur(dateToInput);
      expect(
        screen.getByText(
          'The date you finished this qualification is required.'
        )
      ).toBeInTheDocument();
    });

    test('Shows error when an invalid character is input into date from and date to', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const dateFromLabel = screen.getByText(/Date from/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToLabel = screen.getByText(/Date to/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      fireEvent.change(dateFromInput, { target: { value: '@' } });
      fireEvent.change(dateToInput, { target: { value: '@' } });

      const errMessages = screen.getAllByText(
        'The date can only contain digits and /'
      );

      expect(errMessages.length).toBe(2);
      expect(dateFromLabel).toContainElement(errMessages[0]);
      expect(dateToLabel).toContainElement(errMessages[1]);
    });

    test('Shows error when an invalid date format is entered', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const dateFromLabel = screen.getByText(/Date from/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToLabel = screen.getByText(/Date to/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      fireEvent.change(dateFromInput, { target: { value: '99/0000' } });
      fireEvent.blur(dateFromInput);
      fireEvent.change(dateToInput, { target: { value: '00/9999' } });
      fireEvent.blur(dateToInput);

      const errMessages = screen.getAllByText(
        'The date must be in the format MM/YYYY where both M and Y are digits, and MM must be between 01 and 12.'
      );

      expect(errMessages.length).toBe(2);
      expect(dateFromLabel).toContainElement(errMessages[0]);
      expect(dateToLabel).toContainElement(errMessages[1]);
    });

    test('Error states are unique to each set of instance of an education form', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addEducationBtn = screen.getByRole('button', {
        name: /\+ Education/i,
      });

      fireEvent.click(addEducationBtn);

      const instituteLabels = screen.getAllByText('Institute name');
      const qualificationLabels = screen.getAllByText('Qualification achieved');

      const instituteInputOne = within(instituteLabels[0]).getByPlaceholderText(
        'Institute name'
      );
      const qualificationInputTwo = within(
        qualificationLabels[1]
      ).getByPlaceholderText('Qualification achieved');

      // Check one doesn't effect two
      fireEvent.blur(instituteInputOne);

      const instituteError = screen.getByText('Institute name is required.'); // fails if there is more than one instance of this text
      const instituteOneErrorCheck =
        instituteLabels[0].contains(instituteError); // expect true
      const instituteTwoErrorCheck =
        instituteLabels[1].contains(instituteError); // expect false

      expect(instituteOneErrorCheck).toBe(true);
      expect(instituteTwoErrorCheck).toBe(false);

      // Check two doesn't effect one
      fireEvent.blur(qualificationInputTwo);

      const qualificationError = screen.getByText(
        'Qualification achieved is required.'
      );
      const qualificationOneErrorCheck =
        qualificationLabels[0].contains(qualificationError); // expect false
      const qualificationTwoErrorCheck =
        qualificationLabels[1].contains(qualificationError); // expect true

      expect(qualificationOneErrorCheck).toBe(false);
      expect(qualificationTwoErrorCheck).toBe(true);
    });
  });
});

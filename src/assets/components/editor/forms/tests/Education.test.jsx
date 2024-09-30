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
    dateFrom: '2023-09-27',
    dateTo: '2024-09-27',
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
      expect(dateFromInput.value).toBe('2023-09-27');
      expect(dateToInput.value).toBe('2024-09-27');
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

      fireEvent.change(dateFromInput, { target: { value: '2024-01-01' } });
      expect(dateFromInput.value).toBe('2024-01-01');

      fireEvent.change(dateToInput, { target: { value: '2023-01-01' } });
      expect(dateToInput.value).toBe('2023-01-01');
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
});

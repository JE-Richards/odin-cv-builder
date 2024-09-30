import PersonalSummary from '../PersonalSummary.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockData = {
  firstName: 'Test',
  lastName: 'McTester',
  profession: 'Professional Tester',
  professionalSummary: 'I test things.',
};

const mockEmptyData = {
  firstName: '',
  lastName: '',
  profession: '',
  professionalSummary: '',
};

const mockHandleChanges = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the PersonalSummary component', () => {
  describe('Testing initial rendering', () => {
    test('Form labels and inputs correctly render', () => {
      render(
        <PersonalSummary data={mockData} handleChanges={mockHandleChanges} />
      );

      const firstNameLabel = screen.getByText('First name');
      const firstNameInput = screen.getByPlaceholderText('John');

      const lastNameLabel = screen.getByText('Last name');
      const lastNameInput = screen.getByPlaceholderText('Doe');

      const professionLabel = screen.getByText('Profession');
      const professionInput = screen.getByPlaceholderText('Web Developer');

      const professionalSummaryLabel = screen.getByText('Professional summary');
      const professionalSummaryInput = screen.getByPlaceholderText(
        'A summary of your career and aspirations'
      );

      expect(firstNameLabel).toBeInTheDocument();
      expect(firstNameInput).toBeInTheDocument();
      expect(lastNameLabel).toBeInTheDocument();
      expect(lastNameInput).toBeInTheDocument();
      expect(professionLabel).toBeInTheDocument();
      expect(professionInput).toBeInTheDocument();
      expect(professionalSummaryLabel).toBeInTheDocument();
      expect(professionalSummaryInput).toBeInTheDocument();
    });

    test('Form inputs correctly display values from data received via props', () => {
      render(
        <PersonalSummary data={mockData} handleChanges={mockHandleChanges} />
      );
      const firstNameInput = screen.getByPlaceholderText('John');
      const lastNameInput = screen.getByPlaceholderText('Doe');
      const professionInput = screen.getByPlaceholderText('Web Developer');
      const professionalSummaryInput = screen.getByPlaceholderText(
        'A summary of your career and aspirations'
      );

      expect(firstNameInput.value).toBe('Test');
      expect(lastNameInput.value).toBe('McTester');
      expect(professionInput.value).toBe('Professional Tester');
      expect(professionalSummaryInput.value).toBe('I test things.');
    });

    test('Form inputs correctly display empty values', () => {
      render(
        <PersonalSummary
          data={mockEmptyData}
          handleChanges={mockHandleChanges}
        />
      );

      const firstNameInput = screen.getByPlaceholderText('John');
      const lastNameInput = screen.getByPlaceholderText('Doe');
      const professionInput = screen.getByPlaceholderText('Web Developer');
      const professionalSummaryInput = screen.getByPlaceholderText(
        'A summary of your career and aspirations'
      );

      expect(firstNameInput.value).toBe('');
      expect(lastNameInput.value).toBe('');
      expect(professionInput.value).toBe('');
      expect(professionalSummaryInput.value).toBe('');
    });
  });

  describe('Testing that inputs correctly handle changes', () => {
    beforeEach(() => {
      render(
        <PersonalSummary data={mockData} handleChanges={mockHandleChanges} />
      );
    });

    test('Inputs call handleChanges with the correct values on change', () => {
      const firstNameInput = screen.getByPlaceholderText('John');
      const lastNameInput = screen.getByPlaceholderText('Doe');
      const professionInput = screen.getByPlaceholderText('Web Developer');
      const professionalSummaryInput = screen.getByPlaceholderText(
        'A summary of your career and aspirations'
      );

      fireEvent.change(firstNameInput, { target: { value: 'Changed' } });
      expect(mockHandleChanges).toHaveBeenCalledWith(
        expect.objectContaining({ firstName: 'Changed' })
      );

      fireEvent.change(lastNameInput, { target: { value: 'Names' } });
      expect(mockHandleChanges).toHaveBeenCalledWith(
        expect.objectContaining({ lastName: 'Names' })
      );

      fireEvent.change(professionInput, { target: { value: 'CEO' } });
      expect(mockHandleChanges).toHaveBeenCalledWith(
        expect.objectContaining({ profession: 'CEO' })
      );

      fireEvent.change(professionalSummaryInput, {
        target: { value: 'I am the best.' },
      });
      expect(mockHandleChanges).toHaveBeenCalledWith(
        expect.objectContaining({ professionalSummary: 'I am the best.' })
      );
    });
  });
});

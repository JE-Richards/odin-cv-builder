import Interests from '../Interests.jsx';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { useState } from 'react';

const mockData = ['Coding', 'Reading', 'Writing'];

const mockEmptyData = [''];

function MockParentComponent({ data }) {
  const [interestsData, setInterestsData] = useState(data);

  const handleChanges = (updatedInterests) => {
    setInterestsData(updatedInterests);
  };

  return <Interests data={interestsData} handleChanges={handleChanges} />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Interests component', () => {
  describe('Testing initial render', () => {
    test('Form correctly renders button and single input (empty data)', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addInterestBtn = screen.getByRole('button', {
        name: /\+ Interest/i,
      });
      const interestOneInput = screen.getByPlaceholderText('Interest 1');

      expect(addInterestBtn).toBeInTheDocument();
      expect(interestOneInput).toBeInTheDocument();
      expect(interestOneInput.value).toBe('');
    });

    test('Form displays a unique input for each data element (array item) passed to the component', () => {
      render(<MockParentComponent data={mockData} />);

      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBe(mockData.length);

      const interestOneInput = screen.getByPlaceholderText('Interest 1');
      const interestTwoInput = screen.getByPlaceholderText('Interest 2');
      const interestThreeInput = screen.getByPlaceholderText('Interest 3');

      expect(interestOneInput.value).toBe('Coding');
      expect(interestTwoInput.value).toBe('Reading');
      expect(interestThreeInput.value).toBe('Writing');
    });
  });

  describe('Testing form buttons and inputs', () => {
    test('Clicking the button adds a new interest with no value', () => {
      render(<MockParentComponent data={mockData} />);

      const addInterestBtn = screen.getByRole('button', {
        name: /\+ Interest/i,
      });

      fireEvent.click(addInterestBtn);

      const newInput = screen.getByPlaceholderText(
        `Interest ${mockData.length + 1}`
      );
      expect(newInput).toBeInTheDocument();
      expect(newInput.value).toBe('');
    });

    test('Changes to form inputs correctly update values', () => {
      render(<MockParentComponent data={mockData} />);

      const interestOneInput = screen.getByPlaceholderText('Interest 1');
      const interestTwoInput = screen.getByPlaceholderText('Interest 2');
      const interestThreeInput = screen.getByPlaceholderText('Interest 3');

      fireEvent.change(interestOneInput, { target: { value: 'Walking' } });
      expect(interestOneInput.value).toBe('Walking');

      fireEvent.change(interestTwoInput, { target: { value: 'Sleeping' } });
      expect(interestTwoInput.value).toBe('Sleeping');

      fireEvent.change(interestThreeInput, { target: { value: 'Tennis' } });
      expect(interestThreeInput.value).toBe('Tennis');
    });

    test('Changes are retained when a new interest is added', () => {
      render(<MockParentComponent data={mockData} />);

      const addInterestBtn = screen.getByRole('button', {
        name: /\+ Interest/i,
      });

      const interestOneInput = screen.getByPlaceholderText('Interest 1');

      fireEvent.change(interestOneInput, { target: { value: 'Walking' } });
      fireEvent.click(addInterestBtn);

      expect(interestOneInput.value).toBe('Walking');
    });
  });

  describe('Testing form validation', () => {
    test('Shows error message when input is required, has no input value, and is blurred', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const interestOne = screen.getByPlaceholderText('Interest 1');

      fireEvent.blur(interestOne);

      expect(
        screen.getByText('A hobby or interest is required.')
      ).toBeInTheDocument();
    });

    test('Error states are unique to each instance of a skill input', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addInterestBtn = screen.getByRole('button', {
        name: /\+ Interest/i,
      });
      fireEvent.click(addInterestBtn);

      const interestOneInput = screen.getByPlaceholderText('Interest 1');
      const interestTwoInput = screen.getByPlaceholderText('Interest 2');
      const interestOneLabel = interestOneInput.closest('label');
      const interestTwoLabel = interestTwoInput.closest('label');

      fireEvent.blur(interestOneInput);
      const error = screen.getByText('A hobby or interest is required.');
      expect(interestOneLabel.contains(error)).toBe(true);
      expect(interestTwoLabel.contains(error)).toBe(false);
    });
  });
});

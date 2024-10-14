import Skills from '../Skills.jsx';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { useState } from 'react';

const mockData = ['HTML', 'CSS', 'JavaScript'];

const mockEmptyData = [''];

function MockParentComponent({ data }) {
  const [skillsData, setSkillsData] = useState(data);

  const handleChanges = (updatedSkills) => {
    setSkillsData(updatedSkills);
  };

  return <Skills data={skillsData} handleChanges={handleChanges} />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Skills component', () => {
  describe('Testing initial render', () => {
    test('Form correctly renders button and single input (empty data)', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addSkillsBtn = screen.getByRole('button', { name: /\+ Skill/i });
      const skillOneInput = screen.getByPlaceholderText('Skill 1');

      expect(addSkillsBtn).toBeInTheDocument();
      expect(skillOneInput).toBeInTheDocument();
      expect(skillOneInput.value).toBe('');
    });

    test('Form displays a unique input for each data element (array item) passed to the component', () => {
      render(<MockParentComponent data={mockData} />);

      // Check the number of inputs matches the length of mockData
      const inputs = screen.getAllByRole('textbox');
      expect(inputs.length).toBe(mockData.length);

      // ensure each input renders correctly
      const skillOneInput = screen.getByPlaceholderText('Skill 1');
      const skillTwoInput = screen.getByPlaceholderText('Skill 2');
      const skillThreeInput = screen.getByPlaceholderText('Skill 3');

      expect(skillOneInput.value).toBe('HTML');
      expect(skillTwoInput.value).toBe('CSS');
      expect(skillThreeInput.value).toBe('JavaScript');
    });
  });

  describe('Testing form buttons and inputs', () => {
    test('Clicking the button adds a new skill with no value', () => {
      render(<MockParentComponent data={mockData} />);

      const addSkillsBtn = screen.getByRole('button', { name: /\+ Skill/i });

      fireEvent.click(addSkillsBtn);

      const newInput = screen.getByPlaceholderText(
        `Skill ${mockData.length + 1}`
      );
      expect(newInput).toBeInTheDocument();
      expect(newInput.value).toBe('');
    });

    test('Changes to form inputs correctly update values', () => {
      render(<MockParentComponent data={mockData} />);

      const skillOneInput = screen.getByPlaceholderText('Skill 1');
      const skillTwoInput = screen.getByPlaceholderText('Skill 2');
      const skillThreeInput = screen.getByPlaceholderText('Skill 3');

      fireEvent.change(skillOneInput, { target: { value: 'Python' } });
      expect(skillOneInput.value).toBe('Python');

      fireEvent.change(skillTwoInput, { target: { value: 'R' } });
      expect(skillTwoInput.value).toBe('R');

      fireEvent.change(skillThreeInput, { target: { value: 'C' } });
      expect(skillThreeInput.value).toBe('C');
    });

    test('Changes are retained when a new skill is added', () => {
      render(<MockParentComponent data={mockData} />);

      const addSkillsBtn = screen.getByRole('button', { name: /\+ Skill/i });

      const skillOneInput = screen.getByPlaceholderText('Skill 1');
      fireEvent.change(skillOneInput, { target: { value: 'Python' } });

      fireEvent.click(addSkillsBtn);

      expect(skillOneInput.value).toBe('Python');
    });

    describe('Testing form validation', () => {
      test('Shows error message when input is required, has no input value, and is blurred', () => {
        render(<MockParentComponent data={mockEmptyData} />);

        const skillInput = screen.getByPlaceholderText('Skill 1');

        fireEvent.blur(skillInput);

        expect(screen.getByText('A skill is required.')).toBeInTheDocument();
      });

      test('Error states are unique to each instance of a skill input', () => {
        render(<MockParentComponent data={mockEmptyData} />);

        const addSkillsBtn = screen.getByRole('button', { name: /\+ Skill/i });
        fireEvent.click(addSkillsBtn);

        const skillOneInput = screen.getByPlaceholderText('Skill 1');
        const skillTwoInput = screen.getByPlaceholderText('Skill 2');
        const skillOneLabel = skillOneInput.closest('label');
        const skillTwoLabel = skillTwoInput.closest('label');

        fireEvent.blur(skillOneInput);
        const error = screen.getByText('A skill is required.');
        expect(skillOneLabel.contains(error)).toBe(true);
        expect(skillTwoLabel.contains(error)).toBe(false);
      });
    });
  });
});

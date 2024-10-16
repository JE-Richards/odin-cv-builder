import Experience from '../Experience.jsx';
import '@testing-library/jest-dom';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from '@testing-library/react';
import { useState } from 'react';

const mockData = [
  {
    company: 'Test inc',
    role: 'Tester',
    dateFrom: '09/2023',
    dateTo: '09/2024',
    responsibilities: ['Testing code', 'Build UI'],
  },
];

const mockEmptyData = [
  {
    company: '',
    role: '',
    dateFrom: '',
    dateTo: '',
    responsibilities: [''],
  },
];

function MockParentComponent({ data }) {
  const [experienceData, setExperienceData] = useState(data);

  const handleChanges = (updatedExperience) => {
    setExperienceData(updatedExperience);
  };

  return <Experience data={experienceData} handleChanges={handleChanges} />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Experience component', () => {
  describe('Testing initial render', () => {
    test('Form correctly renders buttons and inputs (blank data)', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      // Button to add new experience rendering
      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });
      expect(addExperienceBtn).toBeInTheDocument();

      // Experience and responsibilities fieldsets rendering
      const delExpBtn = screen.getByRole('button', {
        name: 'Delete experience',
      });
      const fieldsets = screen.getAllByRole('group');
      const experienceFieldset = fieldsets[0];
      const responsibilitiesFieldset = fieldsets[1];
      const expFieldsetLegend = screen.getByText(/Experience 1 Details/i);
      const respFieldsetLegend = screen.getByText(/Role responsibilities/i);
      expect(delExpBtn).toBeInTheDocument();
      expect(experienceFieldset).toBeInTheDocument();
      expect(responsibilitiesFieldset).toBeInTheDocument();
      expect(experienceFieldset).toContainElement(delExpBtn);
      expect(experienceFieldset).toContainElement(expFieldsetLegend);
      expect(experienceFieldset).toContainElement(responsibilitiesFieldset);
      expect(responsibilitiesFieldset).toContainElement(respFieldsetLegend);

      // Ensure all experience inputs render
      const companyNameInput = screen.getByLabelText(/Company name/i);
      const roleTitleInput = screen.getByLabelText(/Role title/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      expect(companyNameInput).toBeInTheDocument();
      expect(companyNameInput.value).toBe('');
      expect(experienceFieldset).toContainElement(companyNameInput);

      expect(roleTitleInput).toBeInTheDocument();
      expect(roleTitleInput.value).toBe('');
      expect(experienceFieldset).toContainElement(roleTitleInput);

      expect(dateFromInput).toBeInTheDocument();
      expect(dateFromInput.value).toBe('');
      expect(experienceFieldset).toContainElement(dateFromInput);

      expect(dateToInput).toBeInTheDocument();
      expect(dateToInput.value).toBe('');
      expect(experienceFieldset).toContainElement(dateToInput);

      // Check responsibility button input renders
      const addResponsibilityBtn = screen.getByRole('button', {
        name: /\+ Responsibility/i,
      });
      const respOneInput = screen.getByPlaceholderText(/Responsibility 1/i);
      const respOneDelBtn = screen.getByRole('button', { name: 'Delete' });

      expect(addResponsibilityBtn).toBeInTheDocument();
      expect(responsibilitiesFieldset).toContainElement(addResponsibilityBtn);
      expect(respOneInput).toBeInTheDocument();
      expect(respOneInput.value).toBe('');
      expect(responsibilitiesFieldset).toContainElement(respOneInput);
      expect(respOneDelBtn).toBeInTheDocument();
      expect(responsibilitiesFieldset).toContainElement(respOneDelBtn);
    });

    test('Form correctly displays data values passed in via props', () => {
      render(<MockParentComponent data={mockData} />);

      const companyNameInput = screen.getByLabelText(/Company name/i);
      const roleTitleInput = screen.getByLabelText(/Role title/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);
      const respOneInput = screen.getByPlaceholderText(/Responsibility 1/i);
      const respTwoInput = screen.getByPlaceholderText(/Responsibility 2/i);

      expect(companyNameInput.value).toBe('Test inc');
      expect(roleTitleInput.value).toBe('Tester');
      expect(dateFromInput.value).toBe('09/2023');
      expect(dateToInput.value).toBe('09/2024');
      expect(respOneInput.value).toBe('Testing code');
      expect(respTwoInput.value).toBe('Build UI');
    });
  });

  describe('Testing buttons and inputs', () => {
    test('Clicking the add experience buttons adds a new experience fieldset', () => {
      render(<MockParentComponent data={mockData} />);

      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });

      fireEvent.click(addExperienceBtn);

      const fieldsets = screen.getAllByRole('group');
      // 2 original fieldsets, + 2 on addition
      expect(fieldsets.length).toBe(4);

      const newExpFieldset = fieldsets[2];
      expect(newExpFieldset).toBeInTheDocument();

      // testing the inputs render with no values
      const companyNameInput =
        within(newExpFieldset).getByLabelText(/Company name/i);
      const roleTitleInput =
        within(newExpFieldset).getByLabelText(/Role title/i);
      const dateFromInput = within(newExpFieldset).getByLabelText(/Date from/i);
      const dateToInput = within(newExpFieldset).getByLabelText(/Date to/i);
      const respOneInput =
        within(newExpFieldset).getByPlaceholderText(/Responsibility 1/i);

      expect(companyNameInput).toBeInTheDocument();
      expect(companyNameInput.value).toBe('');
      expect(roleTitleInput).toBeInTheDocument();
      expect(roleTitleInput.value).toBe('');
      expect(dateFromInput).toBeInTheDocument();
      expect(dateFromInput.value).toBe('');
      expect(dateToInput).toBeInTheDocument();
      expect(dateToInput.value).toBe('');
      expect(respOneInput).toBeInTheDocument();
      expect(respOneInput.value).toBe('');
    });

    test('Clicking the add responsibility button adds a new responsibility input', () => {
      render(<MockParentComponent data={mockData} />);

      const addResponsibilityBtn = screen.getByRole('button', {
        name: /\+ Responsibility/i,
      });

      fireEvent.click(addResponsibilityBtn);

      const fieldsets = screen.getAllByRole('group');
      const respFieldset = fieldsets[1];

      const newResponsibility =
        screen.getByPlaceholderText(/Responsibility 3/i);
      expect(newResponsibility).toBeInTheDocument();
      expect(newResponsibility.value).toBe('');
      expect(respFieldset).toContainElement(newResponsibility);
    });

    test('Changes to inputs correctly update values', () => {
      render(<MockParentComponent data={mockData} />);

      const companyNameInput = screen.getByLabelText(/Company name/i);
      const roleTitleInput = screen.getByLabelText(/Role title/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);
      const respOneInput = screen.getByPlaceholderText(/Responsibility 1/i);

      fireEvent.change(companyNameInput, { target: { value: 'Fake company' } });
      expect(companyNameInput.value).toBe('Fake company');

      fireEvent.change(roleTitleInput, { target: { value: 'CEO' } });
      expect(roleTitleInput.value).toBe('CEO');

      fireEvent.change(dateFromInput, { target: { value: '01/2020' } });
      expect(dateFromInput.value).toBe('01/2020');

      fireEvent.change(dateToInput, { target: { value: '01/2022' } });
      expect(dateToInput.value).toBe('01/2022');

      fireEvent.change(respOneInput, { target: { value: 'Sleeping' } });
      expect(respOneInput.value).toBe('Sleeping');
    });

    test('Changes are retained when a new experience fieldset is added', () => {
      render(<MockParentComponent data={mockData} />);

      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });
      const companyNameInput = screen.getByLabelText(/Company name/i);

      fireEvent.change(companyNameInput, { target: { value: 'Fake company' } });
      fireEvent.click(addExperienceBtn);

      expect(companyNameInput.value).toBe('Fake company');
    });

    test('Clicking delete experience button deletes an experience', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });
      fireEvent.click(addExperienceBtn);
      const fieldsets = screen.getAllByRole('group');
      expect(fieldsets.length).toBe(4);

      const delExperienceBtns = screen.getAllByRole('button', {
        name: 'Delete experience',
      });
      const delExperienceTwoBtn = delExperienceBtns[1];
      fireEvent.click(delExperienceTwoBtn);

      const updatedFieldsets = screen.getAllByRole('group');
      // 2 original fieldsets, the only others should be deleted
      expect(updatedFieldsets.length).toBe(2);
    });

    test('Clicking delete experience deletes the correct experience instance', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });
      fireEvent.click(addExperienceBtn);
      fireEvent.click(addExperienceBtn);

      const fieldsets = screen.getAllByRole('group');
      expect(fieldsets.length).toBe(6);

      const expOne = fieldsets[0];
      const expTwo = fieldsets[2];
      const expThree = fieldsets[4];
      const expOneCompany = within(expOne).getByLabelText(/Company name/i);
      const expTwoCompany = within(expTwo).getByLabelText(/Company name/i);
      const expThreeCompany = within(expThree).getByLabelText(/Company name/i);

      fireEvent.change(expOneCompany, { target: { value: 'Comp 1' } });
      fireEvent.change(expTwoCompany, { target: { value: 'Comp 2' } });
      fireEvent.change(expThreeCompany, { target: { value: 'Comp 3' } });
      expect(screen.getByDisplayValue('Comp 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Comp 2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Comp 3')).toBeInTheDocument();

      const expTwoDelBtn = within(expTwo).getByRole('button', {
        name: 'Delete experience',
      });
      fireEvent.click(expTwoDelBtn);

      const updatedExpTwoCompany = screen.queryByDisplayValue('Comp 2');
      expect(screen.getByDisplayValue('Comp 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Comp 3')).toBeInTheDocument();
      expect(updatedExpTwoCompany).not.toBeInTheDocument();
    });

    test('Clicking delete responsibility button deletes a responsibility', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addResponsibilityBtn = screen.getByRole('button', {
        name: /\+ Responsibility/i,
      });
      fireEvent.click(addResponsibilityBtn);

      // Select the responsibility inputs
      const respInputs = screen.getAllByLabelText(/Responsibility \d/i);
      expect(respInputs.length).toBe(2);

      // First input -> select label -> get delete button
      const respOneLabel = respInputs[0].closest('label');
      const respOneDelBtn = within(respOneLabel).getByRole('button', {
        name: 'Delete',
      });

      fireEvent.click(respOneDelBtn);
      const updatedRespInputs = screen.getAllByLabelText(/Responsibility \d/i);
      expect(updatedRespInputs.length).toBe(1);
    });

    test('Clicking delete responsibility deletes the correct responsibility', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const addResponsibilityBtn = screen.getByRole('button', {
        name: /\+ Responsibility/i,
      });
      fireEvent.click(addResponsibilityBtn);
      fireEvent.click(addResponsibilityBtn);

      const respInputs = screen.getAllByLabelText(/Responsibility \d/i);
      expect(respInputs.length).toBe(3);

      const respOne = respInputs[0];
      const respTwo = respInputs[1];
      const respThree = respInputs[2];
      fireEvent.change(respOne, { target: { value: 'Resp 1' } });
      fireEvent.change(respTwo, { target: { value: 'Resp 2' } });
      fireEvent.change(respThree, { target: { value: 'Resp 3' } });
      expect(screen.getByDisplayValue('Resp 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Resp 2')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Resp 3')).toBeInTheDocument();

      const respTwoDelBtn = within(respTwo.closest('label')).getByRole(
        'button',
        { name: 'Delete' }
      );
      fireEvent.click(respTwoDelBtn);

      const updatedRespInputs = screen.getAllByLabelText(/Responsibility \d/i);
      expect(updatedRespInputs.length).toBe(2);
      const updatedRespTwo = screen.queryByDisplayValue('Resp 2');
      expect(screen.getByDisplayValue('Resp 1')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Resp 3')).toBeInTheDocument();
      expect(updatedRespTwo).not.toBeInTheDocument();
    });
  });

  describe('Testing form validation', () => {
    test('Shows error message when input is required, has no input value, and is blurred', () => {
      render(<MockParentComponent data={mockEmptyData} />);

      const companyNameInput = screen.getByLabelText(/Company name/i);
      const roleTitleInput = screen.getByLabelText(/Role title/i);
      const dateFromInput = screen.getByLabelText(/Date from/i);
      const dateToInput = screen.getByLabelText(/Date to/i);

      fireEvent.blur(companyNameInput);
      expect(screen.getByText('Company name is required.')).toBeInTheDocument();

      fireEvent.blur(roleTitleInput);
      expect(screen.getByText('Role title is required.')).toBeInTheDocument();

      fireEvent.blur(dateFromInput);
      expect(
        screen.getByText('The date you started this role is required.')
      ).toBeInTheDocument();

      fireEvent.blur(dateToInput);
      expect(
        screen.getByText('The date you finished this role is required.')
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

      const addExperienceBtn = screen.getByRole('button', {
        name: /\+ Experience/i,
      });

      fireEvent.click(addExperienceBtn);

      const companyLabels = screen.getAllByText('Company name');
      const roleLabels = screen.getAllByText('Role title');

      const companyInputOne = within(companyLabels[0]).getByPlaceholderText(
        'Company name'
      );
      const roleInputTwo = within(roleLabels[1]).getByPlaceholderText(
        'Role title'
      );

      // Check one doesn't effect two
      fireEvent.blur(companyInputOne);

      const companyError = screen.getByText('Company name is required.'); // fails if more than one instance of the text
      const companyOneErrorCheck = companyLabels[0].contains(companyError); // expect true
      const companyTwoErrorCheck = companyLabels[1].contains(companyError); // expect false
      expect(companyOneErrorCheck).toBe(true);
      expect(companyTwoErrorCheck).toBe(false);

      // check two doesn't effect one
      fireEvent.blur(roleInputTwo);

      const roleError = screen.getByText('Role title is required.');
      const roleOneErrorCheck = roleLabels[0].contains(roleError); // expect false
      const roleTwoErrorCheck = roleLabels[1].contains(roleError); // expect true
      expect(roleOneErrorCheck).toBe(false);
      expect(roleTwoErrorCheck).toBe(true);
    });
  });
});

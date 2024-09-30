import ContactDetails from '../ContactDetails.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockData = {
  email: 'test@testing.com',
  mobile: '00000000000',
  linkedIn: 'tester',
  portfolio: 'www.test.com',
};

const mockEmptyData = {
  email: '',
  mobile: '',
  linkedIn: '',
  portfolio: '',
};

const mockHandleChanges = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing ContactDetails component', () => {
  describe('Testing initial rendering', () => {
    test('Form label and inputs correctly render', () => {
      render(
        <ContactDetails data={mockData} handleChanges={mockHandleChanges} />
      );

      const emailLabel = screen.getByText('Email');
      const emailInput = screen.getByPlaceholderText('john.doe@domain.com');

      const mobileLabel = screen.getByText('Mobile');
      const mobileInput = screen.getByPlaceholderText('01234567890');

      const linkedInLabel = screen.getByText('LinkedIn profile name');
      const linkedInInput = screen.getByPlaceholderText('John-Doe');

      const portfolioLabel = screen.getByText('Portfolio');
      const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

      expect(emailLabel).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(mobileLabel).toBeInTheDocument();
      expect(mobileInput).toBeInTheDocument();
      expect(linkedInLabel).toBeInTheDocument();
      expect(linkedInInput).toBeInTheDocument();
      expect(portfolioLabel).toBeInTheDocument();
      expect(portfolioInput).toBeInTheDocument();
    });

    test('Form correctly displays data received via props', () => {
      render(
        <ContactDetails data={mockData} handleChanges={mockHandleChanges} />
      );

      const emailInput = screen.getByPlaceholderText('john.doe@domain.com');
      const mobileInput = screen.getByPlaceholderText('01234567890');
      const linkedInInput = screen.getByPlaceholderText('John-Doe');
      const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

      expect(emailInput.value).toBe('test@testing.com');
      expect(mobileInput.value).toBe('00000000000');
      expect(linkedInInput.value).toBe('tester');
      expect(portfolioInput.value).toBe('www.test.com');
    });

    test('Form correctly displays empy values', () => {
      render(
        <ContactDetails
          data={mockEmptyData}
          handleChanges={mockHandleChanges}
        />
      );

      const emailInput = screen.getByPlaceholderText('john.doe@domain.com');
      const mobileInput = screen.getByPlaceholderText('01234567890');
      const linkedInInput = screen.getByPlaceholderText('John-Doe');
      const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

      expect(emailInput.value).toBe('');
      expect(mobileInput.value).toBe('');
      expect(linkedInInput.value).toBe('');
      expect(portfolioInput.value).toBe('');
    });
  });

  test('Inputs call handleChanges with correct values on change', () => {
    render(
      <ContactDetails data={mockData} handleChanges={mockHandleChanges} />
    );

    const emailInput = screen.getByPlaceholderText('john.doe@domain.com');
    const mobileInput = screen.getByPlaceholderText('01234567890');
    const linkedInInput = screen.getByPlaceholderText('John-Doe');
    const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

    fireEvent.change(emailInput, {
      target: { value: 'changed.email@domain.com' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      email: 'changed.email@domain.com',
    });

    fireEvent.change(mobileInput, {
      target: { value: '09876543210' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      mobile: '09876543210',
    });

    fireEvent.change(linkedInInput, {
      target: { value: 'the-fake-john-doe' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      linkedIn: 'the-fake-john-doe',
    });

    fireEvent.change(portfolioInput, {
      target: { value: 'www.changeddomain.com' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      portfolio: 'www.changeddomain.com',
    });
  });
});

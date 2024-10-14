import ContactDetails from '../ContactDetails.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockData = {
  email: 'test@testing.com',
  mobile: '00000000000',
  linkedIn: 'www.linkedin.com/in/tester',
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

      const linkedInLabel = screen.getByText('LinkedIn profile');
      const linkedInInput = screen.getByPlaceholderText(
        'www.linkedin.com/in/John-Doe'
      );

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
      const linkedInInput = screen.getByPlaceholderText(
        'www.linkedin.com/in/John-Doe'
      );
      const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

      expect(emailInput.value).toBe('test@testing.com');
      expect(mobileInput.value).toBe('00000000000');
      expect(linkedInInput.value).toBe('www.linkedin.com/in/tester');
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
      const linkedInInput = screen.getByPlaceholderText(
        'www.linkedin.com/in/John-Doe'
      );
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
    const linkedInInput = screen.getByPlaceholderText(
      'www.linkedin.com/in/John-Doe'
    );
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
      target: { value: 'www.linkedin.com/in/the-fake-john-doe' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      linkedIn: 'www.linkedin.com/in/the-fake-john-doe',
    });

    fireEvent.change(portfolioInput, {
      target: { value: 'www.changeddomain.com' },
    });
    expect(mockHandleChanges).toHaveBeenCalledWith({
      portfolio: 'www.changeddomain.com',
    });
  });

  describe('Testing form validation', () => {
    test('Shows error message when input is required, has no value input, and is blurred', () => {
      render(
        <ContactDetails
          data={mockEmptyData}
          handleChanges={mockHandleChanges}
        />
      );

      const emailInput = screen.getByPlaceholderText('john.doe@domain.com');
      const mobileInput = screen.getByPlaceholderText('01234567890');

      fireEvent.blur(emailInput);
      expect(screen.getByText('Email is required.')).toBeInTheDocument();

      fireEvent.blur(mobileInput);
      expect(
        screen.getByText('Mobile number is required.')
      ).toBeInTheDocument();
    });

    test('Shows error message when invalid character is input to mobile', () => {
      render(
        <ContactDetails
          data={mockEmptyData}
          handleChanges={mockHandleChanges}
        />
      );

      const mobileInput = screen.getByPlaceholderText('01234567890');

      fireEvent.change(mobileInput, { target: { value: 'w' } });
      expect(
        screen.getByText('Mobile can only contain numeric digits.')
      ).toBeInTheDocument();
    });

    test('Shows error for invalid inputs (incorrect length or format)', () => {
      render(
        <ContactDetails
          data={{
            email: 'test.com',
            mobile: '123',
            linkedIn: 'www.linkedin.com',
            portfolio: 'www.testing..com',
          }}
          handleChanges={mockHandleChanges}
        />
      );

      const emailInput = screen.getByPlaceholderText('john.doe@domain.com');
      const mobileInput = screen.getByPlaceholderText('01234567890');
      const linkedInInput = screen.getByPlaceholderText(
        'www.linkedin.com/in/John-Doe'
      );
      const portfolioInput = screen.getByPlaceholderText('www.myportfolio.com');

      const emailErr = 'Please enter a valid email address.';
      const mobileErr = 'Please enter a valid 10 or 11 digit UK mobile number.';
      const linkedInErr =
        'Please enter a valid linkedIn profile URL. The URL format should look like www.linkedin.com/in/{your profile name here}';
      const portfolioErr = 'Please enter a valid URL.';

      fireEvent.blur(emailInput);
      expect(screen.getByText(emailErr)).toBeInTheDocument();

      fireEvent.blur(mobileInput);
      expect(screen.getByText(mobileErr)).toBeInTheDocument();

      fireEvent.blur(linkedInInput);
      expect(screen.getByText(linkedInErr)).toBeInTheDocument();

      fireEvent.blur(portfolioInput);
      expect(screen.getByText(portfolioErr)).toBeInTheDocument();
    });
  });
});

import FormSection from '../../FormSection.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';

beforeEach(() => {
  jest.clearAllMocks();
});

const mockProps = {
  title: 'Test Title',
  description: 'Test description',
  form: <p>Child element</p>,
};

describe('FormSection component testing', () => {
  test('The FormSection elements are correctly rendered', () => {
    render(
      <FormSection
        title={mockProps.title}
        description={mockProps.description}
        form={mockProps.form}
      />
    );

    const title = screen.getByText('Test Title');
    const description = screen.getByText('Test description');
    const childElement = screen.getByText('Child element');

    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(childElement).toBeInTheDocument();
  });
});

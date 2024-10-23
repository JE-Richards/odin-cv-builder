import Modal from '../Modal.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const onConfirm = jest.fn();
const onClose = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing Modal component', () => {
  describe('Testing Modal rendering', () => {
    test('Nothing is rendered when isOpen is false', () => {
      render(
        <Modal
          isOpen={false}
          onConfirm={onConfirm}
          onClose={onClose}
          message={''}
        />
      );

      const modalTitle = screen.queryByText('Confirmation');
      expect(modalTitle).not.toBeInTheDocument();
    });

    test('Modal is rendered when isOpen is true', () => {
      render(
        <Modal
          isOpen={true}
          onConfirm={onConfirm}
          onClose={onClose}
          message={''}
        />
      );

      const modalTitle = screen.queryByText('Confirmation');
      expect(modalTitle).toBeInTheDocument();
    });

    test('Each element of the model correctly renders', () => {
      render(
        <Modal
          isOpen={true}
          onConfirm={onConfirm}
          onClose={onClose}
          message={'test message'}
        />
      );

      const modalTitle = screen.getByText('Confirmation');
      const modal = modalTitle.closest('div');
      const modalMessage = screen.getByText('test message');
      const yesBtn = screen.getByRole('button', { name: 'Yes' });
      const noBtn = screen.getByRole('button', { name: 'No' });

      expect(modal).toBeInTheDocument();
      expect(modalTitle).toBeInTheDocument();
      expect(modal).toContainElement(modalTitle);
      expect(modalMessage).toBeInTheDocument();
      expect(modal).toContainElement(modalMessage);
      expect(yesBtn).toBeInTheDocument();
      expect(modal).toContainElement(yesBtn);
      expect(noBtn).toBeInTheDocument();
      expect(modal).toContainElement(noBtn);
    });
  });

  describe('Testing button functionality', () => {
    test('Functions are called on button click', () => {
      render(
        <Modal
          isOpen={true}
          onConfirm={onConfirm}
          onClose={onClose}
          message={''}
        />
      );

      const yesBtn = screen.getByRole('button', { name: 'Yes' });
      const noBtn = screen.getByRole('button', { name: 'No' });

      fireEvent.click(yesBtn);
      fireEvent.click(noBtn);

      expect(onConfirm).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});

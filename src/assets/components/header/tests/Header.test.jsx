import Header from '../Header.jsx';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockFuncs = {
  loadExample: jest.fn(),
  loadPreview: jest.fn(),
  loadEditor: jest.fn(),
  exportPDF: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Header component', () => {
  describe('Testing component render', () => {
    test('Testing component render - preview mode false', () => {
      render(<Header funcs={mockFuncs} isPreviewMode={false} />);

      const title = screen.getByText('Simple CV Builder');
      const subtitle = screen.getByText('Created by');
      const subtitleLink = screen.getByRole('link', { name: 'JE Richards' });
      const btns = screen.getAllByRole('button');

      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
      expect(subtitleLink).toBeInTheDocument();
      expect(subtitleLink).toHaveAttribute(
        'href',
        'https://github.com/JE-Richards'
      );
      expect(btns.length).toBe(3);
      btns.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
      expect(btns[1].textContent).toBe('View preview');
    });

    test('Testing component render - preview mode true', () => {
      render(<Header funcs={mockFuncs} isPreviewMode={true} />);

      const title = screen.getByText('Simple CV Builder');
      const subtitle = screen.getByText('Created by');
      const subtitleLink = screen.getByRole('link', { name: 'JE Richards' });
      const btns = screen.getAllByRole('button');

      expect(title).toBeInTheDocument();
      expect(subtitle).toBeInTheDocument();
      expect(subtitleLink).toBeInTheDocument();
      expect(subtitleLink).toHaveAttribute(
        'href',
        'https://github.com/JE-Richards'
      );
      expect(btns.length).toBe(3);
      btns.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
      expect(btns[1].textContent).toBe('View editor');
    });
  });

  describe('Testing button functionality', () => {
    test('Buttons trigger their functions on click - preview mode false', () => {
      render(<Header funcs={mockFuncs} isPreviewMode={false} />);

      const btns = screen.getAllByRole('button');

      btns.forEach((button) => {
        fireEvent.click(button);
      });

      expect(mockFuncs.loadExample).toHaveBeenCalledTimes(1);
      expect(mockFuncs.loadPreview).toHaveBeenCalledTimes(1);
      expect(mockFuncs.loadEditor).toHaveBeenCalledTimes(0);
      expect(mockFuncs.exportPDF).toHaveBeenCalledTimes(1);
    });

    test('Buttons trigger their functions on click - preview mode false', () => {
      render(<Header funcs={mockFuncs} isPreviewMode={true} />);

      const btns = screen.getAllByRole('button');

      btns.forEach((button) => {
        fireEvent.click(button);
      });

      expect(mockFuncs.loadExample).toHaveBeenCalledTimes(1);
      expect(mockFuncs.loadPreview).toHaveBeenCalledTimes(0);
      expect(mockFuncs.loadEditor).toHaveBeenCalledTimes(1);
      expect(mockFuncs.exportPDF).toHaveBeenCalledTimes(1);
    });
  });
});

import Header from '../Header.jsx';
import '@testing-library/jest-dom';
import { useState } from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';

const mockFuncs = {
  loadExample: jest.fn(),
  loadPreview: jest.fn(),
  loadEditor: jest.fn(),
  exportPDF: jest.fn(),
};

function MockParentComponent({ isPreviewMode }) {
  const [previewMode, setPreviewMode] = useState(isPreviewMode);

  const funcs = {
    loadExample: () => {
      mockFuncs.loadExample();
      // If you want to use this function, implement any state change as needed.
    },
    loadPreview: () => {
      mockFuncs.loadPreview();
      setPreviewMode(true); // Or use your toggle logic
    },
    loadEditor: () => {
      mockFuncs.loadEditor();
      setPreviewMode(false); // Or use your toggle logic
    },
    exportPDF: () => {
      mockFuncs.exportPDF();
    },
  };

  return <Header funcs={funcs} isPreviewMode={previewMode} />;
}

beforeEach(() => {
  jest.clearAllMocks();
});

afterEach(cleanup);

describe('Testing the Header component', () => {
  describe('Testing component render', () => {
    test('Testing component render - preview mode false', () => {
      render(<MockParentComponent isPreviewMode={false} />);

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
      expect(btns.length).toBe(2);
      btns.forEach((button) => {
        expect(button).toBeInTheDocument();
      });
      expect(btns[1].textContent).toBe('View preview');
    });

    test('Testing component render - preview mode true', () => {
      render(<MockParentComponent isPreviewMode={true} />);

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
      render(<MockParentComponent isPreviewMode={false} />);

      // In editor mode, only 2 buttons available
      fireEvent.click(screen.getByRole('button', { name: 'Fill Example CV' }));
      fireEvent.click(screen.getByRole('button', { name: 'View preview' }));

      expect(mockFuncs.loadExample).toHaveBeenCalledTimes(1);
      expect(mockFuncs.loadPreview).toHaveBeenCalledTimes(1);
    });

    test('Buttons trigger their functions on click - preview mode false', () => {
      render(<MockParentComponent isPreviewMode={true} />);

      // In preview mode, 3 buttons are available
      fireEvent.click(screen.getByRole('button', { name: 'Fill Example CV' }));
      fireEvent.click(screen.getByRole('button', { name: 'Export PDF' }));
      fireEvent.click(screen.getByRole('button', { name: 'View editor' }));

      expect(mockFuncs.loadExample).toHaveBeenCalledTimes(1);
      expect(mockFuncs.loadEditor).toHaveBeenCalledTimes(1);
      expect(mockFuncs.exportPDF).toHaveBeenCalledTimes(1);
    });
  });

  describe('Testing conditional rendering', () => {
    test('In editor mode, only load example cv and view preview buttons are rendered', () => {
      render(<MockParentComponent isPreviewMode={false} />);

      const fillExampleBtn = screen.queryByRole('button', {
        name: 'Fill Example CV',
      });
      const loadPreviewBtn = screen.queryByRole('button', {
        name: 'View preview',
      });
      const loadEditorBtn = screen.queryByRole('button', {
        name: 'View editor',
      });
      const exportPDFBtn = screen.queryByRole('button', { name: 'Export PDF' });

      expect(fillExampleBtn).toBeInTheDocument();
      expect(loadPreviewBtn).toBeInTheDocument();
      expect(loadEditorBtn).not.toBeInTheDocument();
      expect(exportPDFBtn).not.toBeInTheDocument();
    });

    test('In preview mode, only load example cv, view editor, and export pdf buttons are rendered', () => {
      render(<MockParentComponent funcs={mockFuncs} isPreviewMode={true} />);

      const fillExampleBtn = screen.queryByRole('button', {
        name: 'Fill Example CV',
      });
      const loadPreviewBtn = screen.queryByRole('button', {
        name: 'View preview',
      });
      const loadEditorBtn = screen.queryByRole('button', {
        name: 'View editor',
      });
      const exportPDFBtn = screen.queryByRole('button', { name: 'Export PDF' });

      expect(fillExampleBtn).toBeInTheDocument();
      expect(loadPreviewBtn).not.toBeInTheDocument();
      expect(loadEditorBtn).toBeInTheDocument();
      expect(exportPDFBtn).toBeInTheDocument();
    });

    test('Changing from editor to preview changes the buttons displayed', () => {
      render(<MockParentComponent isPreviewMode={false} />);

      expect(
        screen.queryByRole('button', {
          name: 'Fill Example CV',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View preview',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View editor',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Export PDF' })
      ).not.toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'View preview' }));

      expect(
        screen.queryByRole('button', {
          name: 'Fill Example CV',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View preview',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View editor',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Export PDF' })
      ).toBeInTheDocument();
    });

    test('Changing from preview to editor changes the buttons displayed', () => {
      render(<MockParentComponent isPreviewMode={true} />);

      expect(
        screen.queryByRole('button', {
          name: 'Fill Example CV',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View preview',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View editor',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Export PDF' })
      ).toBeInTheDocument();

      fireEvent.click(screen.getByRole('button', { name: 'View editor' }));

      expect(
        screen.queryByRole('button', {
          name: 'Fill Example CV',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View preview',
        })
      ).toBeInTheDocument();
      expect(
        screen.queryByRole('button', {
          name: 'View editor',
        })
      ).not.toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'Export PDF' })
      ).not.toBeInTheDocument();
    });
  });
});

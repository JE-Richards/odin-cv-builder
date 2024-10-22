import exportPDF from '../exportPDF.jsx';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

jest.mock('html2canvas');
jest.mock('jspdf');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Testing the exportPDF function', () => {
  test('If no element is found, an error should be logged', () => {
    console.error = jest.fn();

    document.querySelector = jest.fn().mockReturnValue(null);
    exportPDF('.non-existent');

    expect(console.error).toHaveBeenCalledWith('Element not found');
  });

  // html2canvas is async
  test('If an element exists, a pdf should be generated', async () => {
    const mockCanvas = {
      toDataURL: jest.fn().mockReturnValue('mock-image-data'),
    };
    const mockAddImage = jest.fn();
    const mockSave = jest.fn();

    // Mock html2canvas returning a fake canvas
    html2canvas.mockResolvedValue(mockCanvas);

    // Mock jsPDF methods
    jsPDF.mockImplementation(() => ({
      addImage: mockAddImage,
      save: mockSave,
    }));

    // Mock document querySelector to return a fake element
    document.querySelector = jest.fn().mockReturnValue({});

    await exportPDF('.existing-class');

    expect(html2canvas).toHaveBeenCalledWith({}, { scale: 2 });
    expect(mockAddImage).toHaveBeenCalledWith(
      'mock-image-data',
      'PNG',
      0,
      0,
      595.28,
      841.89
    );
    expect(mockSave).toHaveBeenCalledWith('basic-cv.pdf');
  });

  //   test('should handle html2canvas errors gracefully', async () => {
  //     console.error = jest.fn();
  //     html2canvas.mockRejectedValue(new Error('html2canvas failed'));

  //     document.querySelector = jest.fn().mockReturnValue({});

  //     await exportPDF('.existing-class');

  //     expect(console.error).toHaveBeenCalledWith(
  //       'Error generating PDF:',
  //       expect.any(Error)
  //     );
  //   });
});

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export default function exportPDF(elementClass) {
  const input = document.querySelector(elementClass);

  if (!input) {
    console.error('Element not found');
    return;
  }

  const a4WidthPx = 595.28; // A4 width in PDF points
  const a4HeightPx = 841.89; // A4 height in PDF points

  html2canvas(input, { scale: 2 })
    .then((canvas) => {
      // Convert the input to a 'snapshot'
      const imgData = canvas.toDataURL('image/png');

      // create pdf in portrait, measured in points, and size a4
      const pdf = new jsPDF('p', 'pt', 'a4');

      // Force the image to fit within the A4 page dimensions (last 2 arguments)
      pdf.addImage(imgData, 'PNG', 0, 0, a4WidthPx, a4HeightPx);

      pdf.save('basic-cv.pdf');
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
    });
}

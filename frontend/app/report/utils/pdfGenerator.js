import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export const generatePDF = async (reportRef, options = { download: false }) => {
  if (!reportRef) return;

  const pdf = new jsPDF({
    orientation: 'p',
    unit: 'mm',
    format: 'a4',
    compress: true,
    precision: 2, // Reduce precision for smaller file size
  });

  const sections = Array.from(reportRef.children);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const margins = {
    top: 15,
    right: 15,
    bottom: 15,
    left: 15
  };

  let currentPage = 1;

  // Add header to each page
  const addHeader = (pageNumber) => {
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    const headerText = 'STEM Profile Analysis Report';
    pdf.text(headerText, margins.left, 10);
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margins.left, 12, pdfWidth - margins.right, 12);
  };

  // Add footer with logo and page numbers
  const addFooter = (pageNumber, totalPages) => {
    pdf.setFontSize(10);
    pdf.setTextColor(128, 128, 128);
    const date = new Date().toLocaleDateString();
    pdf.text(`Generated on: ${date}`, margins.left, pdfHeight - 10);
    pdf.text(`Page ${pageNumber} of ${totalPages}`, pdfWidth - margins.right, pdfHeight - 10, { align: 'right' });
  };

  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    
    // Store original background
    const originalBg = section.style.backgroundColor;
    section.style.backgroundColor = 'white';
    
    try {
      const canvas = await html2canvas(section, {
        scale: 2, // Reduced from 3 to 2 for better size/quality balance
        logging: false,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        letterRendering: true,
        imageTimeout: 0,
        removeContainer: true,
        // Optimize canvas rendering
        canvas: null,
        onclone: (clonedDoc) => {
          const element = clonedDoc.querySelector(`#section-${i}`);
          if (element) {
            element.style.margin = '0';
            element.style.padding = '20px';
            // Remove any unused styles
            Array.from(element.classList).forEach(cls => {
              if (cls.includes('hover:') || cls.includes('focus:')) {
                element.classList.remove(cls);
              }
            });
          }
        }
      });

      const imgWidth = pdfWidth - (margins.left + margins.right);
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (currentPage > 1) {
        pdf.addPage();
      }

      // Add image with optimized compression
      pdf.addImage(
        canvas.toDataURL('image/jpeg', 0.7), // Reduced quality to 70%
        'JPEG',
        margins.left,
        margins.top,
        imgWidth,
        imgHeight,
        `section-${i}`,
        'FAST',
        // Optimize image compression
        {
          compress: true,
          imageQuality: 0.7,
          optimization: true
        }
      );

      addHeader(currentPage);
      addFooter(currentPage, sections.length);

      currentPage++;
    } finally {
      // Restore original background
      section.style.backgroundColor = originalBg;
    }
  }

  // Set PDF metadata
  pdf.setProperties({
    title: 'STEM Profile Analysis Report',
    subject: 'Personal STEM trait analysis and career recommendations',
    creator: 'Coneixement STEM Consulting',
    author: 'Coneixement',
    keywords: 'STEM, career guidance, education',
    creationDate: new Date(),
    compress: true,
    putOnlyUsedFonts: true,
    floatPrecision: 2
  });

  if (options.download) {
    // For direct download
    pdf.save('stem-profile-report.pdf');
    return;
  }

  // For email attachment
  const pdfBuffer = pdf.output('arraybuffer');
  const base64String = Buffer.from(pdfBuffer).toString('base64');
  return optimizePDFSize(base64String);
};

const optimizePDFSize = (base64String) => {
  return base64String.trim().replace(/\s/g, '');
};

const PrintStyles = () => (
  <style jsx global>{`
    @media print {
      @page {
        margin: 20mm;
        size: A4;
      }
      
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }

      .print-section {
        page-break-inside: avoid;
        margin-bottom: 30px;
      }

      .print-header {
        position: running(header);
      }

      .print-footer {
        position: running(footer);
      }

      .no-print {
        display: none !important;
      }

      .print-chart {
        max-height: 500px;
        width: 100%;
        page-break-inside: avoid;
      }

      .print-text {
        font-size: 12pt;
        line-height: 1.5;
      }

      .print-heading {
        font-size: 24pt;
        color: #1e40af !important;
        margin-bottom: 15px;
      }

      .print-subheading {
        font-size: 18pt;
        color: #1e40af !important;
        margin-bottom: 10px;
      }
    }
  `}</style>
);

export default PrintStyles;

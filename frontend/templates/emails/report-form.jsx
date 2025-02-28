const ReportFormEmail = ({ name, email, reportData }) => (
  <div>
    <h1>Your STEM Profile Analysis Report</h1>
    <p>Dear {name},</p>
    <p>Thank you for using our STEM Profile Analysis tool. Please find your report attached.</p>
  </div>
);

export default ReportFormEmail;

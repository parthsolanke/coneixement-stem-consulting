import { 
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Preview,
  Heading,
} from '@react-email/components';

const ReportFormEmail = ({ name, email }) => (
  <Html>
    <Head />
    <Preview>Your STEM Profile Analysis Report is ready</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>STEM Profile Analysis Report</Heading>
        
        <Section style={section}>
          <Text style={greeting}>Dear {name},</Text>
          <Text style={paragraph}>
            Thank you for using our STEM Profile Analysis tool. Your personalized report is now ready and attached to this email.
          </Text>
          <Text style={paragraph}>
            This comprehensive report includes:
          </Text>
          <ul style={listStyle}>
            <li style={listItem}>Detailed STEM profile analysis</li>
            <li style={listItem}>Personalized recommendations</li>
            <li style={listItem}>Career path insights</li>
            <li style={listItem}>Skill development suggestions</li>
          </ul>
          <Text style={paragraph}>
            If you have any questions about your report or need clarification, our team is here to help.
          </Text>
          <Text style={signature}>
            Best regards,<br />
            <span style={teamName}>STEM Profile Analysis Team</span>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '600px',
};

const h1 = {
  color: '#1a365d',
  fontSize: '28px',
  fontWeight: 'bold',
  textAlign: 'center',
  margin: '0 0 30px',
  padding: '20px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const section = {
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to bottom right, white, #f8fafc)',
};

const greeting = {
  fontSize: '18px',
  color: '#2d3748',
  marginBottom: '24px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#4a5568',
  marginBottom: '16px',
};

const listStyle = {
  margin: '16px 0',
  paddingLeft: '20px',
};

const listItem = {
  color: '#4a5568',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '8px 0',
};

const signature = {
  marginTop: '32px',
  fontSize: '16px',
  color: '#2d3748',
};

const teamName = {
  color: '#1a365d',
  fontWeight: 'bold',
};

export default ReportFormEmail;

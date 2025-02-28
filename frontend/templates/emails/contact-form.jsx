import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';

const ContactFormEmail = ({ name, email, message }) => (
  <Html>
    <Head />
    <Preview>New contact form submission from {name}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>New Contact Form Submission</Heading>
        
        <Section style={section}>
          <Text style={text}>
            <strong style={labelStyle}>From:</strong> {name}
          </Text>
          <Text style={text}>
            <strong style={labelStyle}>Email:</strong> {email}
          </Text>
        </Section>

        <Section style={messageSection}>
          <Text style={messageLabel}>Message:</Text>
          <Text style={messageBox}>{message}</Text>
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
  marginBottom: '20px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const messageSection = {
  padding: '30px',
  backgroundColor: 'white',
  borderRadius: '12px',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(to bottom right, white, #f8fafc)',
};

const text = {
  margin: '12px 0',
  color: '#2d3748',
  fontSize: '16px',
  lineHeight: '24px',
};

const labelStyle = {
  color: '#4a5568',
  marginRight: '8px',
};

const messageLabel = {
  color: '#4a5568',
  fontSize: '16px',
  fontWeight: 'bold',
  marginBottom: '16px',
};

const messageBox = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  whiteSpace: 'pre-wrap',
  fontSize: '16px',
  lineHeight: '24px',
  color: '#2d3748',
  border: '1px solid #e2e8f0',
};

export default ContactFormEmail;

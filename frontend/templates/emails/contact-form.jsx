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
            <strong>From:</strong> {name}
          </Text>
          <Text style={text}>
            <strong>Email:</strong> {email}
          </Text>
        </Section>

        <Section style={section}>
          <Text style={messageLabel}>Message:</Text>
          <Text style={messageBox}>{message}</Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: '#ffffff',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '580px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  padding: '16px 0',
  textAlign: 'center',
};

const section = {
  padding: '24px',
  backgroundColor: '#f7f7f7',
  borderRadius: '12px',
  marginBottom: '24px',
};

const text = {
  margin: '8px 0',
  color: '#333',
  fontSize: '16px',
  lineHeight: '24px',
};

const messageLabel = {
  ...text,
  fontWeight: 'bold',
  marginBottom: '12px',
};

const messageBox = {
  ...text,
  backgroundColor: '#ffffff',
  padding: '16px',
  borderRadius: '8px',
  whiteSpace: 'pre-wrap',
};

export default ContactFormEmail;

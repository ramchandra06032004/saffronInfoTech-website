import {
  Html,
  Head,
  Font,
  Preview,
  Heading,
  Row,
  Section,
  Text,
  Button,
  Body,
  Container,
  Link,
  Img,
} from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          webFont={{
            url: 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2',
            format: 'woff2',
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Here&apos;s your verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>
            {/* You can replace this with your own logo */}
            <Img src="https://www.saffroninfotech.com/images/logo.png" width="150" alt="Saffron InfoTech Logo" />
          </Section>
          <Heading style={h1}>Hello {username},</Heading>
          <Text style={text}>
            Thank you for registering with Saffron InfoTech. Please use the following verification
            code to complete your registration:
          </Text>
          <Section style={codeBox}>
            <Text style={code}>{otp}</Text>
          </Section>
          <Text style={text}>
            If you did not request this code, please ignore this email.
          </Text>
          <Section style={buttonContainer}>
            <Button style={button} href={`http://localhost:3000/verify/${username}`}>
              Verify Account
            </Button>
          </Section>
          <Text style={text}>
            Or, you can copy and paste this link into your browser:
            <br />
            <Link href={`http://localhost:3000/verify/${username}`} style={link}>
              http://localhost:3000/verify/{username}
            </Link>
          </Text>
          <Section>
            <Row style={footer}>
              <Text style={{ textAlign: 'center', color: '#706a7b' }}>
                © 2024 Saffron InfoTech, All Rights Reserved.
              </Text>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f0f0f0',
  color: '#404040',
  fontFamily: 'Roboto, Verdana, sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
};

const logoContainer = {
  padding: '20px 0',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#1d1c1d',
  fontSize: '36px',
  fontWeight: '700',
  margin: '30px 0',
  padding: '0 30px',
  textAlign: 'center' as const,
};

const text = {
  color: '#404040',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 30px',
};

const codeBox = {
  background: '#f0f0f0',
  borderRadius: '4px',
  margin: '30px auto',
  padding: '20px',
  width: '200px',
  textAlign: 'center' as const,
};

const code = {
  color: '#1d1c1d',
  fontSize: '32px',
  fontWeight: '700',
  letterSpacing: '4px',
  margin: '0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  marginTop: '30px',
};

const button = {
  backgroundColor: '#ff6f61',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '18px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '14px 30px',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const link = {
  color: '#ff6f61',
  textDecoration: 'underline',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '20px 30px 0 30px',
  borderTop: '1px solid #e6ebf1',
};
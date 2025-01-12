// components/OtpEmail.tsx
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Heading,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Email Verification</Heading>
          <Section>
            <Text style={styles.text}>Hi {username},</Text>
            <Text style={styles.text}>
              Thank you for registering! Please use the following One-Time
              Password (OTP) to verify your email address:
            </Text>
            <Text style={styles.otp}>{otp}</Text>
            <Text style={styles.text}>
              If you didn&apos;t request this, please ignore this email.
            </Text>
          </Section>
          <Section>
            <Text style={styles.footer}>
              Regards,
              <br />
              Mystery Message
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    fontFamily: '"Arial", sans-serif',
    backgroundColor: "#f9f9f9",
    margin: "0",
    padding: "20px",
  },
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    textAlign: "center" as const,
    color: "#333333",
    marginBottom: "20px",
  },
  text: {
    color: "#555555",
    lineHeight: "1.6",
    fontSize: "16px",
  },
  otp: {
    fontSize: "24px",
    fontWeight: "bold" as const,
    textAlign: "center" as const,
    color: "#2c7be5",
    margin: "20px 0",
  },
  footer: {
    color: "#999999",
    fontSize: "14px",
    marginTop: "20px",
    textAlign: "center" as const,
  },
};

import twilio from 'twilio';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceId = process.env.TWILIO_SERVICE_SID;

const client = twilio(accountSid, authToken);

export const sendVerification = async (phone) => {
  try {
    const formattedPhone = `+91${phone}`;
    const verification = await client.verify.v2.services(serviceId)
      .verifications
      .create({ to: formattedPhone, channel: 'sms' });
      

    return verification;
  } catch (error) {
    console.error('Error sending verification:', error);
    throw error;
  }
};

export const checkVerification = async (phone, code) => {
  try {
    const formattedPhone = `+91${phone}`;
    const verificationCheck = await client.verify.v2.services(serviceId)
      .verificationChecks
      .create({ to: formattedPhone, code});

    return verificationCheck;
  } catch (error) {
    console.error('Error checking verification:', error);
    throw error;
  }
};

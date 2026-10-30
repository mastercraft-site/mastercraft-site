import { site } from '../config.js';

export const ESTIMATE_SERVICES = ['Collision & Frame Repair', 'Custom Body & Paint', 'Mechanical & Diagnostics', 'Insurance Claim Help', 'Not Sure Yet'];
export const MAX_ESTIMATE_FILES = 10;
export const MAX_ESTIMATE_FILE_BYTES = 10 * 1024 * 1024;

export async function submitEstimateRequest({ service, vehicle, name, phone, email = '', callTime = '', insurer = '', details = '', honey = '', sms = false, files = [] }) {
  const data = new FormData();
  data.append('_subject', 'New Estimate Request: MasterCraft Website');
  data.append('_captcha', 'false');
  data.append('_template', 'table');
  data.append('_honey', honey);
  data.append('Service Needed', service);
  data.append('Vehicle', vehicle);
  data.append('Customer Name', name);
  data.append('Cell Phone', phone);
  data.append('Email', email);
  data.append('Best Time to Call', callTime || 'Any time');
  data.append('Insurance Company', insurer);
  data.append('Details', details);
  data.append('SMS Consent', sms ? 'Yes, customer opted in to SMS' : 'No');
  files.forEach((file) => data.append('Attachment', file));

  const response = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: 'POST',
    body: data,
    headers: { Accept: 'application/json' },
  });
  const result = await response.json();
  if (!response.ok || result.success === false || result.success === 'false') {
    throw new Error(result.message || 'Unable to send the estimate request.');
  }
}
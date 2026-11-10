import { web3FormsAccessKey } from "../config/env";

export interface DemoRequestPayload {
  fullName: string;
  salonName: string;
  email: string;
  whatsappNumber: string;
  preferredContactMethod: string;
  country: string;
  businessType: string;
  staffCount: string;
  challenge: string;
  consent: boolean;
  whatsappConsent: boolean;
}

export type DemoSubmissionResult =
  | { status: "sent" }
  | { status: "not-configured" };

const web3FormsEndpoint = "https://api.web3forms.com/submit";

interface Web3FormsResponse {
  success?: boolean;
  message?: string;
}

export async function submitDemoRequest(
  payload: DemoRequestPayload,
): Promise<DemoSubmissionResult> {
  if (!web3FormsAccessKey) {
    return { status: "not-configured" };
  }

  const {
    whatsappNumber,
    preferredContactMethod,
    whatsappConsent,
    ...existingFields
  } = payload;

  const response = await fetch(web3FormsEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      access_key: web3FormsAccessKey,
      subject: "New demo request — ServiceFlow AI marketing site",
      ...existingFields,
      "WhatsApp Number": whatsappNumber,
      "Preferred Contact Method": preferredContactMethod,
      "WhatsApp Contact Consent": whatsappConsent ? "Yes" : "No",
      source: "serviceflow-marketing",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Demo request failed with status ${response.status}.`);
  }

  let data: Web3FormsResponse;

  try {
    data = (await response.json()) as Web3FormsResponse;
  } catch {
    throw new Error("Demo request returned an invalid response.");
  }

  if (!data.success) {
    throw new Error(
      data.message || "Web3Forms did not confirm the demo request.",
    );
  }

  return { status: "sent" };
}

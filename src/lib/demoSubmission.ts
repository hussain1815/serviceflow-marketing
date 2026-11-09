import { demoFormEndpoint } from "../config/env";

export interface DemoRequestPayload {
  fullName: string;
  salonName: string;
  email: string;
  country: string;
  businessType: string;
  staffCount: string;
  challenge: string;
  consent: boolean;
}

export type DemoSubmissionResult =
  | { status: "sent" }
  | { status: "not-configured" };

export async function submitDemoRequest(
  payload: DemoRequestPayload,
): Promise<DemoSubmissionResult> {
  if (!demoFormEndpoint) {
    return { status: "not-configured" };
  }

  const response = await fetch(demoFormEndpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...payload,
      source: "serviceflow-marketing",
      submittedAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Demo request failed with status ${response.status}.`);
  }

  return { status: "sent" };
}

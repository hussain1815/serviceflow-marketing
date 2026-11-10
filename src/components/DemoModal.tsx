import {
  AlertCircle,
  CheckCircle2,
  Info,
  Loader2,
  X,
} from "lucide-react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import "react-phone-number-input/style.css";
import { useEffect, useRef, useState } from "react";
import type {
  ChangeEvent,
  FormEvent,
  MouseEvent as ReactMouseEvent,
} from "react";
import { baseUrl, isDemoFormConfigured } from "../config/env";
import { demoFormContent as copy } from "../content/siteContent";
import { submitDemoRequest } from "../lib/demoSubmission";
import type { DemoRequestPayload } from "../lib/demoSubmission";

interface DemoModalProps {
  open: boolean;
  onClose: () => void;
}

type FormValues = DemoRequestPayload;
type FormErrors = Partial<Record<keyof FormValues, string>>;
type FormStatus = "idle" | "loading" | "success" | "error" | "preview";

const emptyValues: FormValues = {
  fullName: "",
  salonName: "",
  email: "",
  whatsappNumber: "",
  preferredContactMethod: "",
  country: "",
  businessType: "",
  staffCount: "",
  challenge: "",
  consent: false,
  whatsappConsent: false,
};

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = copy.required;
  }

  if (!values.salonName.trim()) {
    errors.salonName = copy.required;
  }

  if (!values.email.trim()) {
    errors.email = copy.required;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = copy.invalidEmail;
  }

  if (!values.whatsappNumber.trim()) {
    errors.whatsappNumber = copy.required;
  } else if (!isValidPhoneNumber(values.whatsappNumber)) {
    errors.whatsappNumber = copy.invalidWhatsappNumber;
  }

  if (!values.preferredContactMethod) {
    errors.preferredContactMethod = copy.required;
  }

  if (!values.country) {
    errors.country = copy.required;
  }

  if (!values.businessType) {
    errors.businessType = copy.required;
  }

  if (!values.staffCount) {
    errors.staffCount = copy.required;
  }

  if (!values.consent) {
    errors.consent = copy.consentRequired;
  }

  return errors;
}

interface TextFieldProps {
  id: string;
  name: "fullName" | "salonName" | "email";
  label: string;
  value: string;
  error?: string;
  type?: "text" | "email";
  placeholder?: string;
  autoComplete?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function TextField({
  id,
  name,
  label,
  value,
  error,
  type = "text",
  placeholder,
  autoComplete,
  onChange,
}: TextFieldProps) {
  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
      />
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

interface SelectFieldProps {
  id: string;
  name:
    | "country"
    | "businessType"
    | "staffCount"
    | "preferredContactMethod";
  label: string;
  value: string;
  options: string[];
  error?: string;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

function SelectField({
  id,
  name,
  label,
  value,
  options,
  error,
  onChange,
}: SelectFieldProps) {
  return (
    <div className={`form-field${error ? " has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        value={value}
        required
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        onChange={onChange}
      >
        <option value="" disabled>
          {copy.placeholders.select}
        </option>
        {options.map((option) => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export function DemoModal({ open, onClose }: DemoModalProps) {
  const [values, setValues] = useState<FormValues>(emptyValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");
  const [serverError, setServerError] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    setValues({ ...emptyValues });
    setErrors({});
    setStatus("idle");
    setServerError("");
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      formRef.current?.querySelector<HTMLElement>("input, select, textarea")?.focus();
    }, 0);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) {
        return;
      }

      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );

      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    if (status === "success") {
      successHeadingRef.current?.focus();
    }
  }, [status]);

  if (!open) {
    return null;
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const target = event.target;
    const field = target.name;

    setValues((current) => {
      if (field === "consent" || field === "whatsappConsent") {
        return {
          ...current,
          [field]: target instanceof HTMLInputElement ? target.checked : false,
        } as FormValues;
      }

      return { ...current, [field]: target.value } as FormValues;
    });

    if (field in errors) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field as keyof FormValues];
        return next;
      });
    }

    if (status === "preview" || status === "error") {
      setStatus("idle");
      setServerError("");
    }
  };

  const handlePhoneChange = (value?: string) => {
    setValues((current) => ({
      ...current,
      whatsappNumber: value ?? "",
    }));

    if (errors.whatsappNumber) {
      setErrors((current) => {
        const next = { ...current };
        delete next.whatsappNumber;
        return next;
      });
    }

    if (status === "preview" || status === "error") {
      setStatus("idle");
      setServerError("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (status === "loading") {
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    const firstError = Object.keys(nextErrors)[0] as
      | keyof FormValues
      | undefined;

    if (firstError) {
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstError}"]`)
          ?.focus();
      });
      return;
    }

    if (!isDemoFormConfigured) {
      setServerError("");
      setStatus("preview");
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const result = await submitDemoRequest({
        ...values,
        fullName: values.fullName.trim(),
        salonName: values.salonName.trim(),
        email: values.email.trim(),
        challenge: values.challenge.trim(),
      });

      if (result.status === "not-configured") {
        setStatus("preview");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setServerError(copy.errorMessage);
    }
  };

  const handleBackdropMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const privacyHref = `${baseUrl}privacy.html`;

  return (
    <div className="modal-backdrop" onMouseDown={handleBackdropMouseDown}>
      <div
        className="demo-modal"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-form-title"
        aria-describedby="demo-form-description"
      >
        <button
          className="modal-close"
          type="button"
          onClick={onClose}
          aria-label="Close demo request form"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h2 id="demo-form-title">{copy.title}</h2>
          <p id="demo-form-description">{copy.description}</p>
        </div>

        {status === "success" ? (
          <div className="success-state">
            <span className="success-icon" aria-hidden="true">
              <CheckCircle2 size={30} />
            </span>
            <h3 ref={successHeadingRef} tabIndex={-1}>
              {copy.successTitle}
            </h3>
            <p>{copy.successMessage}</p>
            <button
              className="button button-primary"
              type="button"
              onClick={onClose}
            >
              {copy.successAction}
            </button>
          </div>
        ) : (
          <>
            {!isDemoFormConfigured && (
              <div className="form-preview-notice" role="note">
                <Info size={18} aria-hidden="true" />
                <div>
                  <strong>{copy.previewNoticeTitle}</strong>
                  <p>{copy.previewNotice}</p>
                </div>
              </div>
            )}

            <form className="demo-form" ref={formRef} noValidate onSubmit={handleSubmit}>
              <div className="form-grid">
                <TextField
                  id="demo-full-name"
                  name="fullName"
                  label={copy.fields.fullName}
                  value={values.fullName}
                  error={errors.fullName}
                  placeholder={copy.placeholders.fullName}
                  autoComplete="name"
                  onChange={handleChange}
                />
                <TextField
                  id="demo-salon-name"
                  name="salonName"
                  label={copy.fields.salonName}
                  value={values.salonName}
                  error={errors.salonName}
                  placeholder={copy.placeholders.salonName}
                  autoComplete="organization"
                  onChange={handleChange}
                />
                <TextField
                  id="demo-email"
                  name="email"
                  label={copy.fields.email}
                  value={values.email}
                  error={errors.email}
                  type="email"
                  placeholder={copy.placeholders.email}
                  autoComplete="email"
                  onChange={handleChange}
                />
                <div
                  className={`form-field${errors.whatsappNumber ? " has-error" : ""}`}
                >
                  <label htmlFor="demo-whatsapp-number">
                    {copy.fields.whatsappNumber}
                  </label>
                  <PhoneInput
                    id="demo-whatsapp-number"
                    name="whatsappNumber"
                    international
                    withCountryCallingCode
                    defaultCountry="DE"
                    value={values.whatsappNumber}
                    onChange={handlePhoneChange}
                    flags={flags}
                    placeholder={copy.placeholders.whatsappNumber}
                    autoComplete="tel"
                    required
                    aria-invalid={Boolean(errors.whatsappNumber)}
                    aria-describedby={
                      errors.whatsappNumber
                        ? "demo-whatsapp-number-error"
                        : undefined
                    }
                    countrySelectProps={{
                      "aria-label": copy.countrySelectLabel,
                    }}
                  />
                  {errors.whatsappNumber && (
                    <p className="field-error" id="demo-whatsapp-number-error">
                      {errors.whatsappNumber}
                    </p>
                  )}
                </div>
                <SelectField
                  id="demo-country"
                  name="country"
                  label={copy.fields.country}
                  value={values.country}
                  options={copy.countries}
                  error={errors.country}
                  onChange={handleChange}
                />
                <SelectField
                  id="demo-contact-method"
                  name="preferredContactMethod"
                  label={copy.fields.preferredContactMethod}
                  value={values.preferredContactMethod}
                  options={copy.preferredContactMethods}
                  error={errors.preferredContactMethod}
                  onChange={handleChange}
                />
                <SelectField
                  id="demo-business-type"
                  name="businessType"
                  label={copy.fields.businessType}
                  value={values.businessType}
                  options={copy.businessTypes}
                  error={errors.businessType}
                  onChange={handleChange}
                />
                <SelectField
                  id="demo-staff-count"
                  name="staffCount"
                  label={copy.fields.staffCount}
                  value={values.staffCount}
                  options={copy.staffCounts}
                  error={errors.staffCount}
                  onChange={handleChange}
                />
                <div className="form-field full">
                  <label htmlFor="demo-challenge">{copy.fields.challenge}</label>
                  <textarea
                    id="demo-challenge"
                    name="challenge"
                    rows={3}
                    value={values.challenge}
                    placeholder={copy.placeholders.challenge}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className={`consent-field${errors.consent ? " has-error" : ""}`}>
                <input
                  id="demo-consent"
                  name="consent"
                  type="checkbox"
                  checked={values.consent}
                  required
                  aria-invalid={Boolean(errors.consent)}
                  aria-describedby={
                    errors.consent
                      ? "demo-consent-detail demo-consent-error"
                      : "demo-consent-detail"
                  }
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="demo-consent">{copy.fields.consent}</label>
                  <p className="consent-detail" id="demo-consent-detail">
                    {copy.fields.consentDetail} {copy.privacyPrefix}{" "}
                    <a
                      href={privacyHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.privacyLinkLabel}
                    </a>{" "}
                    {copy.privacySuffix}
                  </p>
                </div>
              </div>
              {errors.consent && (
                <p className="field-error" id="demo-consent-error">
                  {errors.consent}
                </p>
              )}

              <div className="consent-field optional">
                <input
                  id="demo-whatsapp-consent"
                  name="whatsappConsent"
                  type="checkbox"
                  checked={values.whatsappConsent}
                  aria-describedby="demo-whatsapp-consent-detail"
                  onChange={handleChange}
                />
                <div>
                  <label htmlFor="demo-whatsapp-consent">
                    {copy.fields.whatsappConsent}
                  </label>
                  <p
                    className="consent-detail"
                    id="demo-whatsapp-consent-detail"
                  >
                    {copy.fields.whatsappConsentDetail}
                  </p>
                </div>
              </div>

              {status === "preview" && (
                <div className="form-status preview" role="status">
                  <Info size={18} aria-hidden="true" />
                  <div>
                    <strong>{copy.previewStateTitle}</strong>
                    <p>{copy.previewStateMessage}</p>
                  </div>
                </div>
              )}

              {status === "error" && (
                <div className="form-status error" role="alert">
                  <AlertCircle size={18} aria-hidden="true" />
                  <div>
                    <strong>{copy.errorTitle}</strong>
                    <p>{serverError || copy.errorMessage}</p>
                  </div>
                </div>
              )}

              <div className="form-actions">
                <p className="form-fineprint">{copy.finePrint}</p>
                <div className="form-buttons">
                  <button
                    className="button button-secondary"
                    type="button"
                    onClick={onClose}
                    disabled={status === "loading"}
                  >
                    {copy.cancel}
                  </button>
                  <button
                    className="button button-primary"
                    type="submit"
                    disabled={status === "loading"}
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="spin" size={16} aria-hidden="true" />
                        {copy.submitting}
                      </>
                    ) : isDemoFormConfigured ? (
                      copy.submit
                    ) : (
                      copy.submitPreview
                    )}
                  </button>
                </div>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

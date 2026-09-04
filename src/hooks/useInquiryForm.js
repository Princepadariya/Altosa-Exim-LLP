import { useCallback, useMemo, useRef, useState } from "react";

import siteConfig from "../data/siteConfig";
import company from "../data/company";
import { buildInitialValues, validateAll, validateField } from "../utils/validation";

/**
 * State machine for the buyer inquiry form.
 *
 * Handles values, touched state, per-field validation, submission status and
 * the honeypot. Delivery is deliberately pluggable:
 *
 *   1. `onSubmit` prop         — your own async handler (takes priority)
 *   2. `siteConfig.inquiryForm.endpoint` — JSON POST to any form service
 *   3. mailto fallback         — opens a prefilled email so nothing is lost
 *
 * Status is one of: "idle" | "submitting" | "success" | "error".
 */
export const useInquiryForm = ({ fields, onSubmit } = {}) => {
  const initialValues = useMemo(() => buildInitialValues(fields), [fields]);

  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus] = useState("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const [deliveredVia, setDeliveredVia] = useState(null);

  /** Bots fill hidden inputs; humans do not. */
  const honeypotRef = useRef("");

  const fieldsByName = useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, field])),
    [fields],
  );

  const setValue = useCallback(
    (name, value) => {
      setValues((previous) => {
        const next = { ...previous, [name]: value };

        // Re-validate a field that is already showing an error, so the message
        // clears as soon as the buyer fixes it rather than on blur.
        setErrors((currentErrors) => {
          if (!currentErrors[name]) return currentErrors;
          const error = validateField(fieldsByName[name], value, next);
          const updated = { ...currentErrors };
          if (error) updated[name] = error;
          else delete updated[name];
          return updated;
        });

        return next;
      });
    },
    [fieldsByName],
  );

  const toggleInGroup = useCallback(
    (name, option) => {
      setValues((previous) => {
        const current = previous[name] ?? [];
        const next = current.includes(option)
          ? current.filter((item) => item !== option)
          : [...current, option];
        return { ...previous, [name]: next };
      });
    },
    [],
  );

  const handleBlur = useCallback(
    (name) => {
      setTouched((previous) => ({ ...previous, [name]: true }));
      setErrors((previous) => {
        const error = validateField(fieldsByName[name], values[name], values);
        const updated = { ...previous };
        if (error) updated[name] = error;
        else delete updated[name];
        return updated;
      });
    },
    [fieldsByName, values],
  );

  const reset = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
    setStatusMessage("");
    setDeliveredVia(null);
  }, [initialValues]);

  const buildMailto = useCallback((payload) => {
    const body = Object.entries(payload)
      .filter(
        ([, value]) =>
          value !== "" && value !== false && value !== null && value?.length !== 0,
      )
      .map(([key, value]) => {
        const field = fieldsByName[key];
        const label = field?.label ?? key;

        /* A mailto URL cannot carry an attachment, so the file is named in the
           body and the buyer is asked to attach it. Dropping it silently would
           lose the drawing the whole inquiry is about. */
        if (typeof File !== "undefined" && value instanceof File) {
          return `${label}: ${value.name} — PLEASE ATTACH THIS FILE BEFORE SENDING`;
        }

        const printed = Array.isArray(value) ? value.join(", ") : value;
        return `${label}: ${printed}`;
      })
      .join("\n");

    const subject = `Sourcing inquiry — ${payload.company || payload.fullName || "New requirement"}`;
    return `mailto:${company.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }, [fieldsByName]);

  const handleSubmit = useCallback(
    async (event) => {
      event?.preventDefault?.();

      // Silently succeed for bots so they do not learn what failed.
      if (honeypotRef.current) {
        setStatus("success");
        setStatusMessage(siteConfig.inquiryForm.successMessage);
        return;
      }

      const nextErrors = validateAll(fields, values);
      setErrors(nextErrors);
      setTouched(Object.fromEntries(fields.map((field) => [field.name, true])));

      if (Object.keys(nextErrors).length > 0) {
        setStatus("idle");
        setStatusMessage("");

        const firstInvalid = fields.find((field) => nextErrors[field.name]);
        document
          .querySelector(`[name="${firstInvalid.name}"]`)
          ?.focus({ preventScroll: false });
        return;
      }

      setStatus("submitting");
      setStatusMessage("");

      const payload = {
        ...values,
        ...siteConfig.inquiryForm.extraFields,
        submittedAt: new Date().toISOString(),
        sourcePage: typeof window !== "undefined" ? window.location.pathname : "",
      };

      try {
        if (typeof onSubmit === "function") {
          await onSubmit(payload);
          setDeliveredVia("handler");
        } else if (siteConfig.inquiryForm.endpoint) {
          /*
           * JSON cannot carry a File, so an inquiry with an attachment is sent
           * as multipart instead. Content-Type is deliberately left unset in
           * that branch — the browser has to add its own multipart boundary,
           * and setting the header by hand strips it and breaks the parse at
           * the far end.
           */
          const hasFile = fields.some(
            (field) =>
              field.type === "file" &&
              typeof File !== "undefined" &&
              payload[field.name] instanceof File,
          );

          let request;

          if (hasFile) {
            const form = new FormData();
            Object.entries(payload).forEach(([key, value]) => {
              if (value === null || value === "" || value === false) return;
              if (Array.isArray(value)) form.append(key, value.join(", "));
              else form.append(key, value);
            });
            request = { body: form, headers: { Accept: "application/json" } };
          } else {
            request = {
              body: JSON.stringify(payload),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
            };
          }

          const response = await fetch(siteConfig.inquiryForm.endpoint, {
            method: siteConfig.inquiryForm.method,
            ...request,
          });

          if (!response.ok) throw new Error(`Request failed: ${response.status}`);
          setDeliveredVia("endpoint");
        } else {
          // Nothing wired yet — hand the buyer a prefilled email instead of
          // dropping the inquiry on the floor.
          window.location.href = buildMailto(payload);
          setDeliveredVia("mailto");
        }

        setStatus("success");
        setStatusMessage(siteConfig.inquiryForm.successMessage);
      } catch (error) {
        console.error("Inquiry submission failed", error);
        setStatus("error");
        setStatusMessage(siteConfig.inquiryForm.errorMessage);
      }
    },
    [buildMailto, fields, onSubmit, values],
  );

  return {
    values,
    errors,
    touched,
    status,
    statusMessage,
    deliveredVia,
    isSubmitting: status === "submitting",
    setValue,
    toggleInGroup,
    handleBlur,
    handleSubmit,
    reset,
    honeypotRef,
  };
};

export default useInquiryForm;

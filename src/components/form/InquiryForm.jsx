import { useEffect, useMemo, useRef } from "react";
import { useSearchParams } from "react-router-dom";

import company from "../../data/company";
import industries from "../../data/industries";
import {
  dataHandlingNotice,
  inquiryFieldGroups,
  rfqNextSteps,
} from "../../data/inquiryFields";
import products from "../../data/products";
import useInquiryForm from "../../hooks/useInquiryForm";
import cn from "../../utils/cn";
import Button from "../ui/Button";
import Icon from "../ui/Icon";
import FormField from "./FormField";
import styles from "./InquiryForm.module.css";

/**
 * Buyer inquiry form.
 *
 * The schema lives in data/inquiryFields.js, so questions can be added or
 * reordered without touching this component. Submission is pluggable:
 * pass `onSubmit` here, or set `siteConfig.inquiryForm.endpoint`. With
 * neither, it falls back to a prefilled email so no inquiry is lost.
 *
 * Deep links prefill context: /request-a-quote?industry=electrical
 * or ?product=castings arrive from the industry and product cards.
 */
const InquiryForm = ({ onSubmit }) => {
  const [searchParams] = useSearchParams();
  const successRef = useRef(null);

  // Industry options come from the industries data rather than being repeated
  // in the form schema, so the two can never drift apart.
  const fieldGroups = useMemo(
    () =>
      inquiryFieldGroups.map((group) => ({
        ...group,
        fields: group.fields.map((field) =>
          field.name === "industry"
            ? {
                ...field,
                options: [
                  ...industries.map((industry) => ({
                    value: industry.id,
                    label: industry.title,
                  })),
                  /* Industry is required, and the six sectors are where the
                     supplier base is strongest — not the limit of what can be
                     sourced. Without this option a buyer whose part sits
                     outside them cannot submit the form at all. */
                  { value: "other", label: "Other industrial requirement" },
                ],
              }
            : field,
        ),
      })),
    [],
  );

  const flatFields = useMemo(
    () => fieldGroups.flatMap((group) => group.fields),
    [fieldGroups],
  );

  const {
    values,
    errors,
    touched,
    status,
    statusMessage,
    deliveredVia,
    isSubmitting,
    setValue,
    toggleInGroup,
    handleBlur,
    handleSubmit,
    reset,
    honeypotRef,
  } = useInquiryForm({ fields: flatFields, onSubmit });

  // Prefill from the card the buyer arrived through.
  useEffect(() => {
    const industryParam = searchParams.get("industry");
    const productParam = searchParams.get("product");

    if (industryParam && industries.some((item) => item.id === industryParam)) {
      setValue("industry", industryParam);
    }

    if (productParam) {
      const product = products.find((item) => item.id === productParam);
      if (product) {
        setValue("productDescription", `${product.title} — `);
        if (!industryParam && product.industries?.[0]) {
          setValue("industry", product.industries[0]);
        }
      }
    }
    // Runs once per set of params; setValue is stable.
  }, [searchParams, setValue]);

  // Move focus to the confirmation so the outcome is announced.
  useEffect(() => {
    if (status === "success") successRef.current?.focus();
  }, [status]);

  if (status === "success") {
    return (
      <div
        className={styles.success}
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
      >
        <span className={styles.successBadge} aria-hidden="true">
          <Icon name="check" size={26} strokeWidth={2.5} />
        </span>

        <h2 className={styles.successTitle}>Requirement received</h2>
        <p className={styles.successBody}>{statusMessage}</p>

        {deliveredVia === "mailto" && (
          <p className={styles.successBody}>
            Your email client should have opened with the details prefilled. If it
            did not, send them to <strong>{company.contact.email}</strong>.
          </p>
        )}

        <div className={styles.successList}>
          {rfqNextSteps.map((step) => (
            <span key={step} className={styles.successItem}>
              <Icon name="check" size={15} className={styles.successTick} />
              {step}
            </span>
          ))}
        </div>

        <div className={styles.successActions}>
          <Button variant="secondary" onClick={reset} icon="plus">
            Send another requirement
          </Button>
          <Button variant="ghost" to="/how-we-work">
            See what happens next
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      {fieldGroups.map((group, groupIndex) => (
        <fieldset key={group.id} className={styles.group}>
          <legend className={styles.legend}>
            <span className={styles.step}>
              {String(groupIndex + 1).padStart(2, "0")}
            </span>
            {group.legend}
          </legend>

          {group.description && (
            <p className={styles.groupDescription}>{group.description}</p>
          )}

          <div className={styles.grid}>
            {group.fields.map((field) => (
              <FormField
                key={field.name}
                field={field}
                value={values[field.name]}
                error={errors[field.name]}
                touched={touched[field.name]}
                disabled={isSubmitting}
                onChange={setValue}
                onToggle={toggleInGroup}
                onBlur={handleBlur}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {/* Bots fill this; humans never see it. */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor="company-website">Company website</label>
        <input
          id="company-website"
          name="company-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          onChange={(event) => {
            honeypotRef.current = event.target.value;
          }}
        />
      </div>

      {status === "error" && (
        <div
          className={cn(styles.status, styles.statusError)}
          role="alert"
          aria-live="assertive"
        >
          <Icon name="plus" size={18} className={styles.statusIcon} style={{ transform: "rotate(45deg)" }} />
          <div>
            <p className={styles.statusTitle}>Could not send</p>
            <p>{statusMessage}</p>
          </div>
        </div>
      )}

      <div className={styles.footer}>
        <p className={styles.footerNote}>{dataHandlingNotice}</p>
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          aria-disabled={isSubmitting}
          icon={isSubmitting ? null : "arrow"}
          showIcon={!isSubmitting}
        >
          {isSubmitting ? "Sending…" : "Send requirement"}
        </Button>
      </div>
    </form>
  );
};

export default InquiryForm;

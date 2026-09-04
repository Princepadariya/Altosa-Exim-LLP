import cn from "../../utils/cn";
import Icon from "../ui/Icon";
import styles from "./FormField.module.css";

/**
 * Renders one field from the inquiry schema. Handles text, email, tel,
 * textarea, select, file, a single consent checkbox and a multi-select chip
 * group, wiring labels, hints and errors together for screen readers.
 */
const FormField = ({
  field,
  value,
  error,
  touched,
  disabled,
  onChange,
  onToggle,
  onBlur,
}) => {
  const id = `field-${field.name}`;
  const hintId = field.hint ? `${id}-hint` : undefined;
  const errorId = `${id}-error`;
  const showError = Boolean(error && touched);
  const describedBy = [hintId, showError ? errorId : null].filter(Boolean).join(" ");

  const shared = {
    id,
    name: field.name,
    disabled,
    "aria-invalid": showError || undefined,
    "aria-describedby": describedBy || undefined,
    onBlur: () => onBlur(field.name),
  };

  /* --- Consent checkbox --------------------------------------------------- */
  if (field.type === "checkbox") {
    return (
      <div className={cn(styles.field, styles.checkboxField)}>
        <label className={styles.checkboxRow} htmlFor={id}>
          <input
            {...shared}
            type="checkbox"
            className={styles.checkboxInput}
            checked={Boolean(value)}
            onChange={(event) => onChange(field.name, event.target.checked)}
          />
          <span className={styles.checkboxBox} aria-hidden="true">
            <Icon name="check" size={13} strokeWidth={3} />
          </span>
          <span className={styles.checkboxLabel}>{field.label}</span>
        </label>

        {showError && (
          <span className={styles.error} id={errorId} role="alert">
            <Icon name="plus" size={13} style={{ transform: "rotate(45deg)" }} />
            {error}
          </span>
        )}
      </div>
    );
  }

  /* --- Multi-select chip group -------------------------------------------- */
  if (field.type === "checkbox-group") {
    const selected = value ?? [];

    return (
      <fieldset
        className={cn(styles.field, styles.group)}
        aria-describedby={describedBy || undefined}
      >
        <legend className={styles.label}>
          {field.label}
          {!field.required && <span className={styles.optional}>Optional</span>}
        </legend>

        <div className={styles.chips}>
          {field.options.map((option) => {
            const isSelected = selected.includes(option);
            return (
              <label
                key={option}
                className={cn(styles.chip, isSelected && styles.chipSelected)}
              >
                <input
                  type="checkbox"
                  className={styles.chipInput}
                  name={field.name}
                  value={option}
                  checked={isSelected}
                  disabled={disabled}
                  onChange={() => onToggle(field.name, option)}
                />
                {/* Always rendered, so the label sits in the same place whether or
                    not the option is chosen, and so the control reads as a
                    checkbox rather than as a tag. */}
                <span className={styles.chipBox} aria-hidden="true">
                  <Icon
                    name="check"
                    size={12}
                    strokeWidth={3}
                    className={styles.chipTick}
                  />
                </span>
                {option}
              </label>
            );
          })}
        </div>

        {field.hint && (
          <span className={styles.hint} id={hintId}>
            {field.hint}
          </span>
        )}
      </fieldset>
    );
  }

  /* --- Text, email, tel, textarea, select --------------------------------- */
  const isWide =
    field.type === "textarea" || field.name === "productDescription";

  return (
    <div className={cn(styles.field, isWide && styles.span2)}>
      <label className={styles.label} htmlFor={id}>
        {field.label}
        {field.required ? (
          <span className={styles.required} aria-hidden="true">
            *
          </span>
        ) : (
          <span className={styles.optional}>Optional</span>
        )}
      </label>

      {field.type === "textarea" && (
        <textarea
          {...shared}
          className={cn(styles.control, showError && styles.invalid)}
          rows={field.rows ?? 4}
          placeholder={field.placeholder}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      )}

      {field.type === "select" && (
        <select
          {...shared}
          className={cn(styles.control, showError && styles.invalid)}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
        >
          <option value="">{field.placeholder ?? "Select an option"}</option>
          {field.options.map((option) => {
            const optionValue = typeof option === "string" ? option : option.value;
            const optionLabel = typeof option === "string" ? option : option.label;
            return (
              <option key={optionValue} value={optionValue}>
                {optionLabel}
              </option>
            );
          })}
        </select>
      )}

      {field.type === "file" && (
        <div className={styles.fileRow}>
          <input
            {...shared}
            type="file"
            className={styles.fileInput}
            accept={field.accept}
            onChange={(event) => onChange(field.name, event.target.files?.[0] ?? null)}
          />
          <label htmlFor={id} className={cn(styles.fileButton, showError && styles.invalid)}>
            <Icon name="plus" size={15} />
            {value ? "Choose a different file" : "Choose a file"}
          </label>
          {value && (
            <span className={styles.fileName}>
              {value.name} ({Math.max(1, Math.round(value.size / 1024))} KB)
            </span>
          )}
        </div>
      )}

      {!["textarea", "select", "file"].includes(field.type) && (
        <input
          {...shared}
          type={field.type}
          className={cn(styles.control, showError && styles.invalid)}
          placeholder={field.placeholder}
          autoComplete={field.autoComplete}
          value={value}
          onChange={(event) => onChange(field.name, event.target.value)}
        />
      )}

      {field.hint && !showError && (
        <span className={styles.hint} id={hintId}>
          {field.hint}
        </span>
      )}

      {showError && (
        <span className={styles.error} id={errorId} role="alert">
          <Icon name="plus" size={13} style={{ transform: "rotate(45deg)" }} />
          {error}
        </span>
      )}
    </div>
  );
};

export default FormField;

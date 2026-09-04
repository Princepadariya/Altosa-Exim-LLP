/** Small, dependency-free validators used by the inquiry form schema. */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;

export const isNotEmpty = (value) =>
  typeof value === "string" ? value.trim().length > 0 : Boolean(value);

export const isEmail = (value) =>
  typeof value === "string" && EMAIL_PATTERN.test(value.trim());

export const minLength = (value, length) =>
  typeof value === "string" && value.trim().length >= length;

/**
 * Runs a field schema against a value.
 * Required-ness is checked first so a schema only needs a `validate` for
 * rules beyond "must be filled in".
 */
export const validateField = (field, value, allValues) => {
  if (field.required && !isNotEmpty(value)) {
    return field.type === "checkbox"
      ? "Please confirm before sending."
      : `${field.label} is required.`;
  }

  if (!field.validate) return null;
  if (!field.required && !isNotEmpty(value)) return null;

  return field.validate(value, allValues) ?? null;
};

/** Validates every field in a flat schema, returning an errors object. */
export const validateAll = (fields, values) =>
  fields.reduce((errors, field) => {
    const error = validateField(field, values[field.name], values);
    if (error) errors[field.name] = error;
    return errors;
  }, {});

/** Blank starting value appropriate to each field type. */
export const initialValueFor = (field) => {
  if (field.type === "checkbox") return false;
  if (field.type === "checkbox-group") return [];
  /* A file field holds a File object or nothing; "" would look like a value. */
  if (field.type === "file") return null;
  return "";
};

export const buildInitialValues = (fields) =>
  fields.reduce((values, field) => {
    values[field.name] = initialValueFor(field);
    return values;
  }, {});

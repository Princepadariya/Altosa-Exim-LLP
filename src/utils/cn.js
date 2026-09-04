/** Joins truthy class names. Keeps conditional CSS Module classes readable. */
export const cn = (...classes) => classes.filter(Boolean).join(" ");

export default cn;

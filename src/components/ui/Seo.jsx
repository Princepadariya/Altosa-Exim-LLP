import { useLocation } from "react-router-dom";

import siteConfig from "../../data/siteConfig";
import { buildTitle, canonicalFor, organizationSchema } from "../../utils/seo";

/**
 * Page metadata. React 19 hoists <title>, <meta> and <link> rendered anywhere
 * in the tree into <head>, so no helmet dependency is needed.
 *
 * @param schema  optional JSON-LD object (or array) for this page
 */
const Seo = ({ title, description, image, noIndex = false, schema }) => {
  const { pathname } = useLocation();

  const fullTitle = buildTitle(title);
  const metaDescription = description ?? siteConfig.defaultDescription;
  const canonical = canonicalFor(pathname);
  const ogImage = `${siteConfig.siteUrl}${image ?? siteConfig.ogImage}`;

  const schemas = [organizationSchema(), ...(schema ? [].concat(schema) : [])];

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Altosa Exim LLP" />
      <meta property="og:locale" content={siteConfig.locale} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {schemas.map((entry, index) => (
        <script
          key={index}
          type="application/ld+json"
          // Structured data is built from local data files, never user input.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
    </>
  );
};

export default Seo;

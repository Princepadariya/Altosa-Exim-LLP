import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

/**
 * Routes. The homepage is bundled eagerly since it is the common entry point;
 * every other page is code-split so a first visit stays small.
 */
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Glossary = lazy(() => import("./pages/Glossary"));
const HowWeWork = lazy(() => import("./pages/HowWeWork"));
const IndustryDetail = lazy(() => import("./pages/IndustryDetail"));
const Industries = lazy(() => import("./pages/Industries"));
const LegalPage = lazy(() => import("./pages/LegalPage"));
const Markets = lazy(() => import("./pages/Markets"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Products = lazy(() => import("./pages/Products"));
const Quality = lazy(() => import("./pages/Quality"));
const RequestAQuote = lazy(() => import("./pages/RequestAQuote"));
const Resources = lazy(() => import("./pages/Resources"));
const ResourceArticle = lazy(() => import("./pages/ResourceArticle"));
const Services = lazy(() => import("./pages/Services"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const Standards = lazy(() => import("./pages/Standards"));

/** Reserves the viewport height so lazy pages do not collapse the layout. */
const RouteFallback = () => <div style={{ minHeight: "70svh" }} aria-hidden="true" />;

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/industries/:industryId" element={<IndustryDetail />} />
          <Route path="/products" element={<Products />} />
          <Route path="/services" element={<Services />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceArticle />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="/sitemap" element={<Sitemap />} />
          <Route path="/how-we-work" element={<HowWeWork />} />
          <Route path="/markets" element={<Markets />} />
          <Route path="/quality-and-compliance" element={<Quality />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-a-quote" element={<RequestAQuote />} />

          <Route path="/data-handling" element={<LegalPage slug="data-handling" />} />
          <Route path="/terms" element={<LegalPage slug="terms" />} />

          {/* Legacy path from the previous site. */}
          <Route path="/quality" element={<Navigate to="/quality-and-compliance" replace />} />

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  </BrowserRouter>
);

export default App;

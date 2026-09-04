import { Outlet } from "react-router-dom";

import useReveal from "../../hooks/useReveal";
import useSmoothScroll from "../../hooks/useSmoothScroll";
import FloatingActions from "./FloatingActions";
import Footer from "./Footer";
import Navbar from "./Navbar";
import ScrollToTop from "./ScrollToTop";

/**
 * App shell. The scroll-reveal observer is mounted once here and picks up
 * `[data-reveal]` elements from every page, including ones added later.
 */
const Layout = () => {
  useReveal();
  useSmoothScroll();

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>

      <ScrollToTop />
      <Navbar />

      <main id="main">
        <Outlet />
      </main>

      <Footer />
      <FloatingActions />
    </>
  );
};

export default Layout;

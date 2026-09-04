import { primaryNav } from "../data/navigation";
import Button from "../components/ui/Button";
import Icon from "../components/ui/Icon";
import Section from "../components/ui/Section";
import Seo from "../components/ui/Seo";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

const NotFound = () => (
  <>
    <Seo
      title="Page not found"
      description="That page does not exist. Start from the sourcing process, the industries we cover, or send a requirement directly."
      noIndex
    />

    <Section tone="dark" grid glow className={styles.section}>
      <div className={styles.inner}>
        <span className={styles.code}>404</span>
        <h1 className={styles.title}>That page does not exist.</h1>
        <p className={styles.lead}>
          The link may be out of date. Everything below is one click away — or
          send the requirement directly and skip the browsing.
        </p>

        <div className={styles.actions}>
          <Button to="/request-a-quote" size="lg">
            Send your requirement
          </Button>
          <Button to="/" variant="onDark" size="lg" showIcon={false}>
            Back to home
          </Button>
        </div>

        <nav className={styles.links} aria-label="Site sections">
          {primaryNav.map((item) => (
            <Link key={item.to} to={item.to} className={styles.link}>
              {item.label}
              <Icon name="arrowUpRight" size={14} />
            </Link>
          ))}
        </nav>
      </div>
    </Section>
  </>
);

export default NotFound;

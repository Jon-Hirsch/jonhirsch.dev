import { Link } from "gatsby";
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "@fontsource/quattrocento-sans";
import "@fontsource/quicksand";
import "@fontsource/roboto";
import "../styles/styles.scss";
import Helmet from "react-helmet";
import { CSSTransition } from "react-transition-group";

export default function Layout(props) {
  const [showMenu, setShowMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (!isScrolled && window.scrollY > 35) {
        setIsScrolled(true);
      } else if (isScrolled && window.scrollY <= 35) {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <>
      <div className="page">
        <Helmet>
          <title>JonHirsch.dev</title>
        </Helmet>
        <div
          className={isScrolled ? "page-header scrolled" : "page-header"}
          data-testid="page-header"
        >
          <Link className="home-link" to="/">
            jonhirsch.dev
          </Link>
          <div className="navigation">
            <Link to="/">Home</Link>
            <Link to="/personal-projects">Personal Projects</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/search">Search</Link>
          </div>
          <button
            className="nav-hamburger"
            aria-label="open navigation menu"
            data-testid="nav-button"
            onClick={() => setShowMenu(true)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
        <div className={isScrolled ? "page-content scrolled" : "page-content"}>
          {props.children}
        </div>
      </div>
      <CSSTransition
        in={showMenu}
        classNames="menu-transition"
        timeout={400}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        {/* disable a11y warnings on this line. The close button is included to handle a11y navigation */}
        {/* eslint-disable-next-line */}
        <div className="menu-overlay" onClick={() => setShowMenu(false)}>
          <div className="close-menu-button-container">
            <button
              className="close-menu-button"
              data-testid="close-menu-button"
              aria-label="close navigation menu"
              onClick={() => setShowMenu(false)}
            >
              <div className="close-button-line"></div>
              <div className="close-button-line"></div>
            </button>
          </div>
          <div className="menu-links" data-testid="menu-links">
            <Link to="/">Home</Link>
            <Link to="/personal-projects">Personal Projects</Link>
            <Link to="/articles">Articles</Link>
            <Link to="/search">Search</Link>
          </div>
        </div>
      </CSSTransition>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.array,
};

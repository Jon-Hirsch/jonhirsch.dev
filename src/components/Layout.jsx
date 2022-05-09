import { Link } from "gatsby";
import React, { useState } from "react";
import "@fontsource/quattrocento-sans";
import "@fontsource/quicksand";
import "@fontsource/roboto";
import "../styles/styles.scss";
import Helmet from "react-helmet";
import { CSSTransition } from "react-transition-group";

export default function Layout(props) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <div className="page">
        <Helmet>
          <title>JonHirsch.dev</title>
        </Helmet>
        <div className="page-header">
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
            role="button"
            aria-label="open navigation menu"
            onClick={() => setShowMenu(true)}
          >
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
            <div className="hamburger-line"></div>
          </button>
        </div>
        <div className="page-content">{props.children}</div>
      </div>
      <CSSTransition
        in={showMenu}
        classNames="menu-transition"
        timeout={400}
        mountOnEnter={true}
        unmountOnExit={true}
      >
        <div className="menu-overlay" onClick={() => setShowMenu(false)}>
          <div className="close-menu-button-container">
            <button
              className="close-menu-button"
              role="button"
              aria-label="close navigation menu"
              onClick={() => setShowMenu(false)}
            >
              <div className="close-button-line"></div>
              <div className="close-button-line"></div>
            </button>
          </div>
          <div className="menu-links">
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

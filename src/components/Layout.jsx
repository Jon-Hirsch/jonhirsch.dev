import { Link } from "gatsby";
import React from "react";
import "@fontsource/quattrocento-sans";
import "@fontsource/quicksand";
import "@fontsource/roboto";
import "../styles/styles.scss";
import Helmet from "react-helmet";

export default function Layout(props) {
  return (
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
        <button className="nav-hamburger" aria-label="open navigation menu">
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
      </div>
      <div className="page-content">{props.children}</div>
    </div>
  );
}

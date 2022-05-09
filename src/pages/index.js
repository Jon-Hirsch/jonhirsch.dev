import { Link } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React from "react";
import Layout from "../components/Layout";
import "../styles/homepage.scss";

export default function HomePage() {
  return (
    <Layout>
      <h1 className="content-header">Welcome to JonHirsch.dev</h1>
      <StaticImage className="side-image" alt="" src="../images/taj.jpg" />
      <p>
        Hey there! I'm Jon Hirsch and I've designed and built this website as a
        space to showcase some of my personal projects, as well as some
        programming tutorials I've written.{" "}
      </p>
      <p>
        To see some of my work, you can check out my{" "}
        <Link to="/personal-projects">Personal Projects</Link> section.
      </p>
      <p>
        You can also take a look at my <Link to="/articles">Articles</Link>{" "}
        section to read some of my React tutorials. I originally wrote these
        tutorials back in 2017 as an introduction to React for some of my
        coworkers. I've recently updated them from the older class based
        components to using function based components and hooks that were
        introduced to React version 16.8 in 2019.
      </p>
      <p>
        Finally, the source code for this side is available on Github here:{" "}
        <Link to="https://github.com/Jon-Hirsch/jonhirsch.dev">
          https://github.com/Jon-Hirsch/jonhirsch.dev
        </Link>
        . The first iteration of this site was built back in 2014 using the
        classic LAMP stack, but I've recently rebuilt it using React and Gatsby.
      </p>
    </Layout>
  );
}

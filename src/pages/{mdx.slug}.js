import * as React from "react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import Layout from "../components/Layout";
import Helmet from "react-helmet";

const ContentPage = ({ data }) => {
  const scripts = data.mdx.frontmatter.scripts;
  return (
    <Layout pageTitle={data.mdx.frontmatter.title}>
      <Helmet>
        {scripts.map((script) => (
          <script
            type="text/javascript"
            src={script}
            key={script}
            defer
          ></script>
        ))}
      </Helmet>
      <MDXRenderer>{data.mdx.body}</MDXRenderer>
    </Layout>
  );
};

export default ContentPage;

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      body
      frontmatter {
        title
        scripts
      }
    }
  }
`;

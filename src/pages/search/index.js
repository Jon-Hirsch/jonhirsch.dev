import { graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import Search from "../../components/Search";

export default function SearchPage({ data }) {
  return (
    <Layout>
      <h1 className="content-header">Personal Projects</h1>
      <Search nodes={data.allMdx.nodes} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(sort: { fields: frontmatter___title }) {
      nodes {
        frontmatter {
          title
          description
          category
        }
        id
        slug
      }
    }
  }
`;

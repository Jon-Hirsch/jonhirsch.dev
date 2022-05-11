import { graphql } from "gatsby";
import React from "react";
import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";

export default function Projects({ data }) {
  return (
    <Layout>
      <h1 className="content-header">Personal Projects</h1>
      <ArticleList nodes={data.allMdx.nodes} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: { frontmatter: { category: { eq: "projects" } } }
      sort: { fields: frontmatter___title }
    ) {
      nodes {
        frontmatter {
          title
          description
        }
        id
        slug
      }
    }
  }
`;

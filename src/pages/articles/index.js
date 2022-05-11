import { graphql } from "gatsby";
import React from "react";
import ArticleList from "../../components/ArticleList";
import Layout from "../../components/Layout";

export default function Articles({ data }) {
  return (
    <Layout>
      <h1 className="content-header">Articles</h1>
      <ArticleList nodes={data.allMdx.nodes} />
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(
      filter: { frontmatter: { category: { eq: "articles" } } }
      sort: { fields: frontmatter___displayOrder }
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

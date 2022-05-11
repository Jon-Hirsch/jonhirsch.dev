import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import "../../styles/articleList.scss";

export default function Articles({ data }) {
  return (
    <Layout>
      <h1 className="content-header">Articles</h1>
      <div className="articles-list">
        {data.allMdx.nodes.map((node) => (
          <div key={node.id} className="article-div">
            <h3 className="article-link">
              <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
            </h3>
            <p className="article-description">
              {node.frontmatter.description}
            </p>
          </div>
        ))}
      </div>
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

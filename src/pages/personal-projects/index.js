import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";
import "../../styles/articleList.scss";

export default function Projects({ data }) {
  return (
    <Layout>
      <h1 className="content-header">Personal Projects</h1>
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

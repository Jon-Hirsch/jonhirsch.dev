import { Link, graphql } from "gatsby";
import React from "react";
import Layout from "../../components/Layout";

export default function Articles({ data }) {
  console.log(data);
  return (
    <Layout>
      <h1 className="content-header">Articles</h1>
      {data.allMdx.nodes.map((node) => (
        <div key={node.id}>
          <h2>
            <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </h2>
        </div>
      ))}
    </Layout>
  );
}

export const query = graphql`
  query {
    allMdx(filter: { fileAbsolutePath: { regex: "/articles/" } }) {
      nodes {
        frontmatter {
          title
        }
        id
        slug
      }
    }
  }
`;

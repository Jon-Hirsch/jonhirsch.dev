import { Link } from "gatsby";
import React from "react";
import PropTypes from "prop-types";

export default function ArticleList(props) {
  return (
    <div className="articles-list">
      {props.nodes.map((node) => (
        <div key={node.id} className="article-div" data-testid="article-div">
          <h3 className="article-link">
            <Link to={`/${node.slug}`}>{node.frontmatter.title}</Link>
          </h3>
          <p className="article-description">{node.frontmatter.description}</p>
        </div>
      ))}
    </div>
  );
}

ArticleList.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

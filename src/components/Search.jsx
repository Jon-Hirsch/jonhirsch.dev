import React, { useState } from "react";
import PropTypes from "prop-types";
import ArticleList from "./ArticleList";

export default function Search(props) {
  const [category, setCategory] = useState("all");
  const [name, setName] = useState("");
  const [order, setOrder] = useState("asc");

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleOrderChange(e) {
    setOrder(e.target.value);
  }

  const filteredNodes = filterNodes(props.nodes, category, name, order);

  return (
    <div>
      <h2 className="search-options-header">Search Options</h2>
      <div className="search-options">
        <div className="option-div">
          <h4>Category</h4>
          <div>
            <label>
              <input
                type="radio"
                value="all"
                name="category"
                checked={category === "all"}
                onChange={handleCategoryChange}
              />
              All
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="articles"
                name="category"
                checked={category === "articles"}
                onChange={handleCategoryChange}
              />
              Articles
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="projects"
                name="category"
                checked={category === "projects"}
                onChange={handleCategoryChange}
              />
              Personal Projects
            </label>
          </div>
        </div>
        <div className="option-div">
          <h4>Article Name</h4>
          <label>
            Name: <input type="text" value={name} onChange={handleNameChange} />
          </label>
        </div>
        <div className="option-div">
          <h4>Result Order</h4>
          <div>
            <label>
              <input
                type="radio"
                value="asc"
                name="order"
                checked={order === "asc"}
                onChange={handleOrderChange}
              />
              Ascending
            </label>
          </div>
          <div>
            <label>
              <input
                type="radio"
                value="desc"
                name="order"
                checked={order === "desc"}
                onChange={handleOrderChange}
              />
              Descending
            </label>
          </div>
        </div>
      </div>
      <ArticleList nodes={filteredNodes} />
    </div>
  );
}

function filterNodes(nodes, category, name, order) {
  nodes = [...nodes];
  if (category !== "all") {
    nodes = nodes.filter((node) => node.frontmatter.category === category);
  }

  if (name !== "") {
    nodes = nodes.filter((node) =>
      node.frontmatter.title.toLowerCase().includes(name.toLowerCase())
    );
  }

  if (order === "desc") {
    nodes = nodes.reverse();
  }

  return nodes;
}

Search.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      frontmatter: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

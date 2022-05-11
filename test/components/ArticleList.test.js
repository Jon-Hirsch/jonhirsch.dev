import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import Layout from "../../src/components/Layout";
import ArticleList from "../../src/components/ArticleList";

afterEach(cleanup);

describe("ArticleList", () => {
  test("should render a list of articles", () => {
    const nodes = [
      {
        id: 1,
        slug: "/1",
        frontmatter: {
          title: "title1",
          description: "description 1",
        },
      },
      {
        id: 2,
        slug: "/2",
        frontmatter: {
          title: "title2",
          description: "description 2",
        },
      },
      {
        id: 3,
        slug: "/3",
        frontmatter: {
          title: "title3",
          description: "description 3",
        },
      },
    ];
    const { container } = render(<ArticleList nodes={nodes} />);

    expect(container).toMatchSnapshot();
  });
});

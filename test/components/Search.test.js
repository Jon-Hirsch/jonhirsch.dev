import React from "react";
import {
  render,
  cleanup,
  fireEvent,
  queryByLabelText,
  within,
} from "@testing-library/react";
import Search from "../../src/components/Search";

afterEach(cleanup);

describe("Search", () => {
  let nodes;
  beforeEach(() => {
    nodes = [
      {
        id: "1",
        slug: "/1",
        frontmatter: {
          title: "Article Title 1",
          description: "description 1",
          category: "articles",
        },
      },
      {
        id: "2",
        slug: "/2",
        frontmatter: {
          title: "Article Title 2",
          description: "description 2",
          category: "articles",
        },
      },
      {
        id: "3",
        slug: "/3",
        frontmatter: {
          title: "Super Cool Project Title",
          description: "description 3",
          category: "projects",
        },
      },
    ];
  });

  test("should render all results by default", () => {
    const { queryAllByTestId } = render(<Search nodes={nodes} />);

    expect(queryAllByTestId("article-div").length).toEqual(3);
  });

  test("should render only results with category 'articles' when the Articles radio button is clicked", () => {
    const { queryAllByTestId, queryByLabelText, queryByText } = render(
      <Search nodes={nodes} />
    );

    fireEvent.click(queryByLabelText("Articles"));

    expect(queryAllByTestId("article-div").length).toEqual(2);
    expect(queryByText("Super Cool Project Title")).toBeNull();
  });

  test("should render only results with category 'projects' when the Personal Projects radio button is clicked", () => {
    const { queryAllByTestId, queryByLabelText, queryByText } = render(
      <Search nodes={nodes} />
    );

    fireEvent.click(queryByLabelText("Personal Projects"));

    expect(queryAllByTestId("article-div").length).toEqual(1);
    expect(queryByText("Super Cool Project Title")).not.toBeNull();
  });

  test("should render only results that contain the name typed in the name field", () => {
    const { queryAllByTestId, queryByLabelText, queryByText } = render(
      <Search nodes={nodes} />
    );

    fireEvent.change(queryByLabelText("Name:"), { target: { value: "Cool" } });

    expect(queryAllByTestId("article-div").length).toEqual(1);
    expect(queryByText("Super Cool Project Title")).not.toBeNull();
  });

  test("clicking the 'Descending' radio button should reverse the result order", () => {
    const { queryAllByTestId, queryByLabelText, queryByText } = render(
      <Search nodes={nodes} />
    );

    fireEvent.click(queryByLabelText("Descending"));
    const firstResult = queryAllByTestId("article-div")[0];
    expect(
      within(firstResult).queryByText("Super Cool Project Title")
    ).not.toBeNull();
  });
});

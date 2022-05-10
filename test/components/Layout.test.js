import React from "react";
import { render, cleanup, fireEvent, waitFor } from "@testing-library/react";
import Layout from "../../src/components/Layout";

afterEach(cleanup);

describe("Layout", () => {
  test("should open a navigation modal when the nav button is clicked", () => {
    const { queryByTestId } = render(
      <Layout>
        <div>test</div>
      </Layout>
    );

    fireEvent.click(queryByTestId("nav-button"));
    expect(queryByTestId("menu-links")).not.toBeNull();
  });

  test("should close the navigation modal when the close button is clicked", async () => {
    const { queryByTestId } = render(
      <Layout>
        <div>test</div>
      </Layout>
    );

    fireEvent.click(queryByTestId("nav-button"));
    expect(queryByTestId("menu-links")).not.toBeNull();

    fireEvent.click(queryByTestId("close-menu-button"));
    await waitFor(() => expect(queryByTestId("menu-links")).toBeNull());
  });

  describe("sticky header", () => {
    test("when the user scrolls down, the header should be given a new style", () => {
      const { queryByTestId } = render(
        <Layout>
          <div>test</div>
        </Layout>
      );

      fireEvent.scroll(window, { target: { scrollY: 50 } });

      expect(queryByTestId("page-header").className).toEqual(
        "page-header scrolled"
      );
    });

    test("when the user scrolls less than 35 the class should not be applied", () => {
      const { queryByTestId } = render(
        <Layout>
          <div>test</div>
        </Layout>
      );

      fireEvent.scroll(window, { target: { scrollY: 34 } });

      expect(queryByTestId("page-header").className).toEqual("page-header");
    });

    test("when the user scrolls back up, the style should be removed", () => {
      const { queryByTestId } = render(
        <Layout>
          <div>test</div>
        </Layout>
      );

      fireEvent.scroll(window, { target: { scrollY: 50 } });

      expect(queryByTestId("page-header").className).toEqual(
        "page-header scrolled"
      );

      fireEvent.scroll(window, { target: { scrollY: 10 } });

      expect(queryByTestId("page-header").className).toEqual("page-header");
    });
  });
});

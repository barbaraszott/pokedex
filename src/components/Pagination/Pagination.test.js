import React from "react";
import { render } from "@testing-library/react";
import Pagination from "./Pagination";

describe("When total pages count is more than 5", () => {
  describe("When on page 1", () => {
    const defaultProps = { currentPageIndex: 0, count: 140, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show go to last page link with number 7", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("7");
    });

    it("should not show the previous button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const previousButton = queryByLabelText("Previous page");

      expect(previousButton).toBe(null);
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 1st page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const firstPage = getByText("1");

      expect(firstPage.classList.contains("pagination__link--current")).toBe(true);
    });

    it("should show next button with its class", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      const nextButton = getByLabelText("Next page");

      expect(nextButton.classList.contains("pagination__link--next")).toBe(true);
    });
  });

  describe("When on page 2", () => {
    const defaultProps = { currentPageIndex: 1, count: 140, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show go to last page link with number 7", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("7");
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 2nd page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("2");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });

    it("should show previous button with its class", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      const previousButton = getByLabelText("Previous page");

      expect(previousButton.classList.contains("pagination__link--previous")).toBe(true);
    });
  });

  describe("When on page 4", () => {
    const defaultProps = { currentPageIndex: 3, count: 140, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (2-6)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[2-6]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show go to the first page link with number 1", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("1");
    });

    it("should show go to last page link with number 7", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("7");
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 4th page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("4");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 5", () => {
    const defaultProps = { currentPageIndex: 4, count: 140, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (3-7)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[3-7]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show go to the first page link with number 1", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("1");
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 5th page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("5");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on last page", () => {
    const defaultProps = { currentPageIndex: 6, count: 140, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (3-7)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[3-7]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show go to the first page link with number 1", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);

      getByText("1");
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should not show the next button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const nextButton = queryByLabelText("Next page");

      expect(nextButton).toBe(null);
    });

    it("should show 7th page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("7");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });
});

describe("When total pages count is exactly 5", () => {
  describe("When on page 1", () => {
    const defaultProps = { currentPageIndex: 0, count: 100, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should not show the previous button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const previousButton = queryByLabelText("Previous page");

      expect(previousButton).toBe(null);
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 1st page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const firstPage = getByText("1");

      expect(firstPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 2", () => {
    const defaultProps = { currentPageIndex: 1, count: 100, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 2nd page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("2");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 3", () => {
    const defaultProps = { currentPageIndex: 2, count: 100, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 3rd page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const fourthPage = getByText("3");

      expect(fourthPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 5 (last page)", () => {
    const defaultProps = { currentPageIndex: 4, count: 100, limit: 20, onPageClick: () => {} };

    it("should show 5 pages (1-5)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-5]$/);

      expect(paginationLinks).toHaveLength(5);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should not show the next button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const nextButton = queryByLabelText("Next page");

      expect(nextButton).toBe(null);
    });

    it("should show 5th page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("5");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });
});

describe("When total pages count is less than 5", () => {
  describe("When on page 1", () => {
    const defaultProps = { currentPageIndex: 0, count: 80, limit: 20, onPageClick: () => {} };

    it("should show 4 pages (1-4)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-4]$/);

      expect(paginationLinks).toHaveLength(4);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should not show the previous button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const previousButton = queryByLabelText("Previous page");

      expect(previousButton).toBe(null);
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 1st page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const firstPage = getByText("1");

      expect(firstPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 2", () => {
    const defaultProps = { currentPageIndex: 1, count: 80, limit: 20, onPageClick: () => {} };

    it("should show 4 pages (1-4)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-4]$/);

      expect(paginationLinks).toHaveLength(4);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 2nd page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("2");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 3", () => {
    const defaultProps = { currentPageIndex: 2, count: 80, limit: 20, onPageClick: () => {} };

    it("should show 4 pages (1-4)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-4]$/);

      expect(paginationLinks).toHaveLength(4);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should show the next button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);
      getByLabelText("Next page");
    });

    it("should show 3rd page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const fourthPage = getByText("3");

      expect(fourthPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });

  describe("When on page 4 (last page)", () => {
    const defaultProps = { currentPageIndex: 3, count: 80, limit: 20, onPageClick: () => {} };

    it("should show 4 pages (1-4)", () => {
      const { getAllByText } = render(<Pagination {...defaultProps} />);
      const paginationLinks = getAllByText(/^[1-4]$/);

      expect(paginationLinks).toHaveLength(4);
    });

    it("should not show page with number 0", () => {
      const { queryByText } = render(<Pagination {...defaultProps} />);
      const pageZero = queryByText("0");

      expect(pageZero).toBe(null);
    });

    it("should show the previous button", () => {
      const { getByLabelText } = render(<Pagination {...defaultProps} />);

      getByLabelText("Previous page");
    });

    it("should not show the next button", () => {
      const { queryByLabelText } = render(<Pagination {...defaultProps} />);
      const nextButton = queryByLabelText("Next page");

      expect(nextButton).toBe(null);
    });

    it("should show 4th page with current page class", () => {
      const { getByText } = render(<Pagination {...defaultProps} />);
      const secondPage = getByText("4");

      expect(secondPage.classList.contains("pagination__link--current")).toBe(true);
    });
  });
});

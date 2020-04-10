import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import "./Pagination.scss";
function showPageNumber(pageIdx) {
  return pageIdx + 1;
}

function createPageLink(page, currentPage, onPageClick) {
  const isCurrentPage = page === currentPage;
  return (
    <div
      key={`page-${page}`}
      data-page={page}
      className={`pagination__page${isCurrentPage ? " pagination__page--current" : ""}`}
      onClick={() => onPageClick(page)}
    >
      {showPageNumber(page)}
    </div>
  );
}

function createPageLinkToStart(page, onPageClick) {
  return (
    <>
      <div
        key={`page-${page}--start`}
        data-page={page}
        className="pagination__page pagination__page--start"
        onClick={() => onPageClick(page)}
      >
        {showPageNumber(page)}
      </div>
      <FontAwesomeIcon icon={faEllipsisH} className="dots" />
    </>
  );
}

function createPageLinkToEnd(page, onPageClick) {
  return (
    <>
      <FontAwesomeIcon icon={faEllipsisH} className="dots" />
      <div
        key={`page-${page}--end`}
        data-page={page}
        className="pagination__page pagination__page--end"
        onClick={() => onPageClick(page)}
      >
        {showPageNumber(page)}
      </div>
    </>
  );
}

function createPreviousLink(previousPageIdx, onPageClick) {
  return (
    <div
      key={`page-${previousPageIdx}`}
      data-page={previousPageIdx}
      className="pagination__page pagination__page--previous"
      onClick={() => onPageClick(previousPageIdx)}
    >
      <FontAwesomeIcon icon={faChevronLeft} />
    </div>
  );
}

function createNextLink(nextPageIdx, onPageClick) {
  return (
    <div
      key={`page-${nextPageIdx}`}
      data-page={nextPageIdx}
      className="pagination__page pagination__page--next"
      onClick={() => onPageClick(nextPageIdx)}
    >
      <FontAwesomeIcon icon={faChevronRight} />
    </div>
  );
}


import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import "./PaginationLink.scss";

function PaginationLink(props) {
  const { pageIndex, currentPageIndex, onPageClick, isLinkToStart, isLinkToEnd, isPrevious, isNext } = props;
  const isCurrentPage = pageIndex === currentPageIndex;
  const pageNumber = pageIndex + 1;
  const createArrow = (isNext, isPrevious) => {
    if (isPrevious) return <FontAwesomeIcon icon={faChevronLeft} />;
    if (isNext) return <FontAwesomeIcon icon={faChevronRight} />;
  };
  const content = isNext || isPrevious ? createArrow(isNext, isPrevious) : pageNumber;

  const classes = classNames("pagination__link", {
    "pagination__link--current": isCurrentPage,
    "pagination__link--start": isLinkToStart,
    "pagination__link--end": isLinkToEnd,
    "pagination__link--previous": isPrevious,
    "pagination__link--next": isNext,
  });

  return (
    <>
      {isLinkToEnd && <FontAwesomeIcon icon={faEllipsisH} className="dots" />}
      <div data-page={pageIndex} className={classes} onClick={() => onPageClick(pageIndex)}>
        {content}
      </div>
      {isLinkToStart && <FontAwesomeIcon icon={faEllipsisH} className="dots" />}
    </>
  );
}

export default PaginationLink;

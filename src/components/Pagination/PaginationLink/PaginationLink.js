import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";

import "./PaginationLink.scss";

function PaginationLink(props) {
  const { pageIndex, currentPageIndex, onPageClick, isLinkToStart, isLinkToEnd, isPrevious, isNext } = props;
  const isCurrentPage = pageIndex === currentPageIndex;
  const pageNumber = pageIndex + 1;

  const classes = classNames("pagination__link", {
    "pagination__link--current": isCurrentPage,
    "pagination__link--start": isLinkToStart,
    "pagination__link--end": isLinkToEnd,
    "pagination__link--previous": isPrevious,
    "pagination__link--next": isNext,
  });

}

export default PaginationLink;

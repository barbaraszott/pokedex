import React from "react";

function PaginationLink(props) {
  const { page, currentPage, onPageClick, isLinkToStart, isLinkToEnd, isPrevious, isNext } = props;
  const isCurrentPage = page === currentPage;
}

export default PaginationLink;

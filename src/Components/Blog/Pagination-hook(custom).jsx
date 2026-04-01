// usePagination.js
import { useState, useEffect } from 'react';

export const usePagination = ({ currentPage, totalCount, siblingCount = 1, pageSize }) => {
 const [paginationRange, setPaginationRange] = useState([]);

 useEffect(() => {
    const totalPages = Math.ceil(totalCount / pageSize);
    const range = [];
    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    for (let i = 1; i <= totalPages; i++) {
      if (i > leftSiblingIndex && i < rightSiblingIndex) {
        range.push(i);
      }
    }

    setPaginationRange(range);
 }, [currentPage, totalCount, siblingCount, pageSize]);

 return paginationRange;
};

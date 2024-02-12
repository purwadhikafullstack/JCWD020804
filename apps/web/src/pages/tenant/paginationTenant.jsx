import React from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { ArrowRightIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';

export function CircularPagination({ currentPage, totalPages, onPageChange }) {
  const next = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  const prev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const paginationButtons = Array.from({ length: totalPages }, (_, index) => (
    <IconButton
      key={index}
      onClick={() => onPageChange(index + 1)}
      className={`rounded-full ${
        currentPage === index + 1 ? 'bg-blue-500 text-white' : 'text-gray-700'
      }`}
    >
      {index + 1}
    </IconButton>
  ));

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{paginationButtons}</div>
      <Button
        variant="text"
        className="flex items-center gap-2 rounded-full"
        onClick={next}
        disabled={currentPage === totalPages}
      >
        Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
}

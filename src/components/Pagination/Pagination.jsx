import React from 'react';
import { useParams } from 'react-router';
const Pagination = ({ productPerPage, totalProduct, paginate }) => {
  const { id } = useParams();
  const pageNumber = [];
  for (let i = 1; i < Math.ceil(totalProduct / productPerPage); i++) {
    pageNumber.push(i);
  }
  return (
    <div>
      <nav>
        <ul className="pagination">
          {pageNumber.map((number) => (
            <li key={number}>
              <a onClick={() => paginate(number)} href="">
                {number}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;

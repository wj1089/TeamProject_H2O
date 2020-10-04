import React from 'react';
const Pagination = ({ postsPerPage, totalPosts, paginate,nextPage,prevPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className='pagination'>
        <li className="page-item">
            <span
              onClick={()=>{
                prevPage();
                window.scrollTo(0,0);
              }}
              className="page-link"
            >
                Previous
            </span>
        </li>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
        <li className="page-item">
                <span
                  onClick={()=>{
                    nextPage();
                    window.scrollTo(0,0);
                  }}
                  className="page-link"
                >
                    Next
                </span>
        </li>
      </ul>
    </nav>
  );
};
export default Pagination;
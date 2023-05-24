import propTypes from 'prop-types';

const Pagination = ({ currentPage, numberOfPage, onClickEmit, limit }) => {
  // ⭐ 1~5, 6~10, 11~15, 16~20 ...
  // ❗ 클릭한 번호가 몇번째 세트 번호?
  const cuurentSet = Math.ceil(currentPage/limit);
  // ❗ 마지막 세트 번호?
  const lastSet = Math.ceil(numberOfPage/limit);
  // ❗ 클릭한 번호가 포함되어 있는 세트의 첫번째 번호?
  const startPage = limit * (cuurentSet - 1) + 1;
  // ❗ 클린한 번호의 세트번호와 마지막세트번호가
  //                                         일치하면 : 해당페이지수만큼 보여줌
  //                                         일치하지않으면 : 총 5페이지를 보여줌 
  const numberOfPageForSet = cuurentSet === lastSet ? numberOfPage%limit : limit;

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        {cuurentSet !== 1 && <li className="page-item">
          <div
            className="page-link cursor-pointer"
            onClick={() => onClickEmit(startPage - limit)}
          >Previous</div>
        </li>}
        {Array(numberOfPageForSet).fill(startPage)
          .map((value, index) => value + index)
          .map((pageNumber) => {
            return (
              <li
                key={pageNumber}
                className={`page-item ${currentPage === pageNumber ? "active" : "null"}`}
              >
                <div
                  className="page-link cursor-pointer"
                  onClick={() => {
                    onClickEmit(pageNumber);
                  }}
                >{pageNumber}</div>
              </li>
              )
        })}
        {cuurentSet !== lastSet && <li className="page-item">
          <div
            className="page-link cursor-pointer"
            onClick={() => onClickEmit(startPage + limit)}
          >Next</div>
        </li>}
      </ul>
    </nav>
  )
}

Pagination.propTypes = {
  currentPage: propTypes.number,
  numberOfPage: propTypes.number.isRequired,
  onClickEmit: propTypes.func.isRequired,
  limit: propTypes.number,
}

Pagination.defaultProps = {
  currentPage: 1,
  limit: 5
}

export default Pagination;
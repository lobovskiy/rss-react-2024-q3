import './Pagination.css';

interface Props {
  page: number;
  count: number;
  setPage: (page: number) => void;
}

const DEFAULT_PAGE_SIZE = 10;

const Pagination: React.FC<Props> = ({ page, count, setPage }) => {
  const pageNumbers = Array.from(
    Array(Math.ceil(count / DEFAULT_PAGE_SIZE)).keys()
  ).map((i) => i + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          className={`${pageNumber === page ? 'active' : undefined}`}
          key={pageNumber}
          onClick={() => {
            setPage(pageNumber);
          }}
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;

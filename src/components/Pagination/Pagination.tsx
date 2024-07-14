import './Pagination.css';

interface Props {
  page: number;
  count: number;
  progress: boolean;
  setPage: (page: number) => void;
}

const DEFAULT_PAGE_SIZE = 10;

const Pagination: React.FC<Props> = ({ page, count, progress, setPage }) => {
  const pageNumbers = Array.from(
    Array(Math.ceil(count / DEFAULT_PAGE_SIZE)).keys()
  ).map((i) => i + 1);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber) => (
        <button
          className={`${pageNumber === page ? 'active' : undefined}`}
          key={pageNumber}
          disabled={progress}
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

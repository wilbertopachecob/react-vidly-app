const Pagination = (props) => {
  const { pageSize, total, onPaginate, currentPage } = props;
  const amount = Math.ceil(total / pageSize);
  if (amount === 1) {
    return null;
  }
  const elements = [];

  const liClassNames = (index) => {
    let classNames = "page-item";
    if (currentPage === index) {
      classNames += " active";
    }
    return classNames;
  };

  const paginate = (index) => {
    if (currentPage !== index) {
      onPaginate(index);
    }
  };

  for (let i = 1; i <= amount; i++) {
    elements.push(
      <li key={i} className={liClassNames(i)} onClick={() => paginate(i)}>
        <button className="page-link">{i}</button>
      </li>
    );
  }

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination">{elements}</ul>
    </nav>
  );
};

export default Pagination;

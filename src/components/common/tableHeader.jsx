const TableHeader = (props) => {
  const { columns, onSort } = props;

  const raiseSort = (path) => {
    const sortColumn = { ...props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  const renderSortIcon = (column) => {
    if (column.path !== props.sortColumn.path) {
      return null; 
    }
    if (props.sortColumn.order === "asc") {
      return <i className="fa fa-sort-asc"></i>
    }
    return <i className="fa fa-sort-desc"></i>
  }

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            scope="col"
            onClick={() => raiseSort(column.path)}
            className="clickable"
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

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

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            scope="col"
            onClick={() => raiseSort(column.path)}
          >
            {column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

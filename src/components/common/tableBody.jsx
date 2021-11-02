import { get as _get } from "lodash";
const TableBody = (props) => {
  const { data, columns, valueProperty } = props;
  const renderCell = (item, column) => {
    if (column.content) {
      return column.content(item);
    }
    return _get(item, column.path);
  };

  const createKey = (item, column) => {
    return _get(item, valueProperty) + (column.path || column.key);
  };

  return (
    <tbody>
      {data.map((item) => (
        <tr key={_get(item, valueProperty)}>
          {columns.map((column) => {
            return (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

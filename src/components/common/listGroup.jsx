const ListGroup = (props) => {
  const { items, seletedItem, onItemSelect, valueProperty, textProperty } =
    props;

  return (
    <div className="list-group">
      {items.map((item) => (
        <button
          type="button"
          key={item[valueProperty]}
          className={`list-group-item list-group-item-action ${
            seletedItem[valueProperty] === item[valueProperty] ? "active" : ""
          }`}
          aria-current="true"
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </button>
      ))}
    </div>
  );
};

export default ListGroup;

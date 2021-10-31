const Like = (props) => {
  const iconClass = () => {
    return `fa fa-heart${props.isActive ? "" : "-o"}`;
  };

  return (
    <i
      onClick={props.onChange}
      className={iconClass()}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
    ></i>
  );
};

export default Like;

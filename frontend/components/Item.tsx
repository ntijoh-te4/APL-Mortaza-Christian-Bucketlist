const Item = ({ description, onDelete  }) => {

  return (
    <li>
      <p>{description}</p>
      <button onClick={onDelete}>X</button>
    </li>
  );
};

export default Item;

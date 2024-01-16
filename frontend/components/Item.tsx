 const Item = ({ item, onDelete  }) => {

  return (
    <li>
      <p>{item.description}</p>
      <button onClick={() => onDelete(item.id)}>X</button>
    </li>
  );
};

export default Item;

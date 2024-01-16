const Item = ({ description }) => {

  return (
    <li>
      <p>{description}</p>
      <button>X</button>
    </li>
  );
};

export default Item;

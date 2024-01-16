const Item = ({description}) => {
  // <li style={styles.li}>
  //   <h3 key={fakeItem.id}>{fakeItem.description}</h3>
  // </li>;

  return (
    <li>
      <p>{description}</p>
      <button>X</button>
    </li>
  );
};

export default Item;

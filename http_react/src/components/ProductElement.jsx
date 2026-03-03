import "./ProductElement.css";
import GenericButton from "./GenericButton";

const ProductElement = ({
  name,
  price,
  replaceProduct,
  editProduct,
  handleDelete,
  isLoading,
}) => {
  return (
    <>
      <li className="product">
        {name} - R${price}
        <GenericButton
          currentClassName={"productButton"}
          onClickMethod={replaceProduct}
          loading={isLoading}
          children={<i className="fa-solid fa-eraser"></i>}
        />
        <GenericButton
          currentClassName={"productButton"}
          onClickMethod={editProduct}
          loading={isLoading}
          children={<i className="fa-solid fa-pen-to-square"></i>}
        />
        <GenericButton
          currentClassName={"productButton"}
          onClickMethod={handleDelete}
          loading={isLoading}
          children={<i className="fa-solid fa-trash"></i>}
        />
      </li>
    </>
  );
};

export default ProductElement;

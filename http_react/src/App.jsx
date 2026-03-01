import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";

import InputField from "./components/InputField";
import InputSubmit from "./components/InputSubmit";
import GenericButton from "./components/GenericButton";

const url = "http://localhost:3000/products";

function App() {
  const {
    data: products,
    httpConfig,
    loading,
    loadingRequest,
    error,
  } = useFetch(url);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const [replaceId, setReplaceId] = useState("");
  const [replaceName, setReplaceName] = useState("");
  const [replacePrice, setReplacePrice] = useState("");

  const [editId, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editPrice, setEditPrice] = useState("");

  const [overlayReplaceIsOpen, setOverlayReplaceIsOpen] = useState(false);
  const [overlayEditIsOpen, setOverlayEditIsOpen] = useState(false);

  const isLoading = loading || loadingRequest;

  const handlePostSubmit = (e) => {
    e.preventDefault();

    const product = {
      name,
      price,
    };

    httpConfig(product, "POST");

    setName("");
    setPrice("");
  };

  const handleDelete = (id) => {
    httpConfig(id, "DELETE");
  };

  const replaceProduct = (id, name, price) => {
    setOverlayReplaceIsOpen(true);
    setReplaceId(id);
    setReplaceName(name);
    setReplacePrice(price);
  };

  const handlePutSubmit = (e) => {
    e.preventDefault();

    const product = {
      id: replaceId,
      name: replaceName,
      price: replacePrice,
    };

    httpConfig(product, "PUT");

    setOverlayReplaceIsOpen(false);
    setReplaceId("");
    setReplaceName("");
    setReplacePrice("");
  };

  const editProduct = (id, name, price) => {
    setOverlayEditIsOpen(true);
    setEditId(id);
    setEditName(name);
    setEditPrice(price);
  };

  const handlePatchNameSubmit = (e) => {
    e.preventDefault();

    const product = {
      id: editId,
      name: editName,
    };

    httpConfig(product, "PATCH");

    setOverlayEditIsOpen(false);
    setEditId("");
    setEditName("");
    setEditPrice("");
  };

  const handlePatchPriceSubmit = (e) => {
    e.preventDefault();

    const product = {
      id: editId,
      price: editPrice,
    };

    httpConfig(product, "PATCH");

    setOverlayEditIsOpen(false);
    setEditId("");
    setEditName("");
    setEditPrice("");
  };

  return (
    <>
      <div id="container">
        <h1>HTTP em React</h1>
        {isLoading && <p id="loading">Carregando...</p>}

        {error && <p id="error">{error}</p>}

        <div id="products-container">
          <ul>
            {products &&
              products.map((product) => (
                <li key={product.id} className="productElement">
                  {product.name} - R${product.price}
                  <GenericButton
                    currentClassName={"productButton"}
                    onClickMethod={() =>
                      replaceProduct(product.id, product.name, product.price)
                    }
                    loading={isLoading}
                    children={<i className="fa-solid fa-eraser"></i>}
                  />
                  <GenericButton
                    currentClassName={"productButton"}
                    onClickMethod={() =>
                      editProduct(product.id, product.name, product.price)
                    }
                    loading={isLoading}
                    children={<i className="fa-solid fa-pen-to-square"></i>}
                  />
                  <GenericButton
                    currentClassName={"productButton"}
                    onClickMethod={() => handleDelete(product.id)}
                    loading={isLoading}
                    children={<i className="fa-solid fa-trash"></i>}
                  />
                </li>
              ))}
          </ul>
        </div>

        <div id="add-container">
          <form onSubmit={handlePostSubmit}>
            <InputField
              label="Nome:"
              placeholder="Digite o nome do produto"
              onChangeMethod={setName}
              value={name}
            />
            <InputField
              label="Preço:"
              placeholder="Digite o preço do produto"
              onChangeMethod={setPrice}
              value={price}
            />
            <InputSubmit loading={isLoading} value="Adicionar" />
          </form>
        </div>

        {overlayReplaceIsOpen && (
          <div className="overlay">
            <form onSubmit={handlePutSubmit} className="modal">
              <InputField
                label="Nome:"
                placeholder="Digite o nome do produto"
                onChangeMethod={setReplaceName}
                value={replaceName}
              />
              <InputField
                label="Preço:"
                placeholder="Digite o preço do produto"
                onChangeMethod={setReplacePrice}
                value={replacePrice}
              />
              <InputSubmit loading={isLoading} value="Substituir" />
              <GenericButton
                currentClassName={"close-btn"}
                onClickMethod={(e) => {
                  e.preventDefault();
                  setOverlayReplaceIsOpen(false);
                }}
                loading={isLoading}
                children={<i className="fa-solid fa-x"></i>}
              />
            </form>
          </div>
        )}

        {overlayEditIsOpen && (
          <div className="overlay">
            <div className="modal">
              <form onSubmit={handlePatchNameSubmit}>
                <InputField
                  label="Nome:"
                  placeholder="Digite o nome do produto"
                  onChangeMethod={setEditName}
                  value={editName}
                />
                <InputSubmit loading={isLoading} value="Editar Nome" />
              </form>
              <form onSubmit={handlePatchPriceSubmit}>
                <InputField
                  label="Preço:"
                  placeholder="Digite o preço do produto"
                  onChangeMethod={setEditPrice}
                  value={editPrice}
                />
                <InputSubmit loading={isLoading} value="Editar Preço" />
              </form>
              <GenericButton
                currentClassName={"close-btn"}
                onClickMethod={(e) => {
                  e.preventDefault();
                  setOverlayEditIsOpen(false);
                }}
                loading={isLoading}
                children={<i className="fa-solid fa-x"></i>}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useFetch } from "./hooks/useFetch";
import "./App.css";

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
                  <button
                    onClick={() =>
                      replaceProduct(product.id, product.name, product.price)
                    }
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-eraser"></i>
                  </button>
                  <button
                    onClick={() => {
                      editProduct(product.id, product.name, product.price);
                    }}
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={isLoading}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </button>
                </li>
              ))}
          </ul>
        </div>

        <div id="add-container">
          <form onSubmit={handlePostSubmit}>
            <label>
              <span>Nome:</span>
              <input
                type="text"
                name="name"
                placeholder="Digite o nome do produto"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </label>
            <label>
              <span>Preço:</span>
              <input
                type="text"
                name="name"
                placeholder="Digite o preço do produto"
                onChange={(e) => setPrice(e.target.value)}
                value={price}
              />
            </label>
            <input
              type="submit"
              value={isLoading ? "Aguarde" : "Adicionar"}
              disabled={isLoading}
              id="submit-btn"
            />
          </form>
        </div>

        {overlayReplaceIsOpen && (
          <div className="overlay">
            <form onSubmit={handlePutSubmit} className="modal">
              <label>
                <span>Nome:</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Digite o nome do produto"
                  onChange={(e) => setReplaceName(e.target.value)}
                  value={replaceName}
                />
              </label>
              <label>
                <span>Preço:</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Digite o preço do produto"
                  onChange={(e) => setReplacePrice(e.target.value)}
                  value={replacePrice}
                />
              </label>
              <input
                type="submit"
                value={isLoading ? "Aguarde" : "Substituir"}
                disabled={isLoading}
                id="submit-btn"
              />
              <button
                id="close-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setOverlayReplaceIsOpen(false);
                }}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </form>
          </div>
        )}

        {overlayEditIsOpen && (
          <div className="overlay">
            <div className="modal">
              <form onSubmit={handlePatchNameSubmit}>
                <label>
                  <span>Nome:</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite o nome do produto"
                    onChange={(e) => setEditName(e.target.value)}
                    value={editName}
                  />
                </label>
                <input
                  type="submit"
                  value={isLoading ? "Aguarde" : "Editar"}
                  disabled={isLoading}
                  id="submit-btn"
                />
              </form>
              <form onSubmit={handlePatchPriceSubmit}>
                <label>
                  <span>Preço:</span>
                  <input
                    type="text"
                    name="name"
                    placeholder="Digite o preço do produto"
                    onChange={(e) => setEditPrice(e.target.value)}
                    value={editPrice}
                  />
                </label>
                <input
                  type="submit"
                  value={isLoading ? "Aguarde" : "Editar"}
                  disabled={isLoading}
                  id="submit-btn"
                />
              </form>
              <button
                id="close-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setOverlayEditIsOpen(false);
                }}
              >
                <i className="fa-solid fa-x"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;

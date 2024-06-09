import React, { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { Product } from "../types";

const Products: React.FC = () => {
  const { data, isLoading, isError } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState<Product[]>([]);

  if (isLoading) {
    return <h2>Carregando...</h2>;
  }

  if (isError) {
    return <h2>Erro ao chamar API</h2>;
  }

  const addToCart = (product: Product) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter((product) => product.id !== productId));
  };

  const filteredProducts = (data ?? []).filter((product: Product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const total = cart.reduce(
    (acc, product) => acc + parseFloat(product.price),
    0
  );

  return (
    <main className="container">
      <input
        type="text"
        placeholder="Pesquisar produto"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      <section className="cart">
        <h2>Carrinho</h2>
        {cart.map((product: Product) => (
          <div key={product.id} className="cart-item">
            <p>
              {product.name} - R$ {parseFloat(product.price).toFixed(2)}
            </p>
            <button onClick={() => removeFromCart(product.id)}>Remover</button>
          </div>
        ))}
        <h3>Total: R$ {total.toFixed(2)}</h3>
      </section>

      <section className="products">
        {filteredProducts.map((product: Product) => (
          <article key={product.id} className="product-card">
            <img
              src={product.avatar}
              alt={product.name}
              className="product-image"
            />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>R$ {parseFloat(product.price).toFixed(2)}</p>
            <button onClick={() => addToCart(product)}>
              Adicionar ao carrinho
            </button>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Products;
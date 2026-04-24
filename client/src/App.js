import { useState, useEffect } from "react";

function App() {
  // 1. State to store products.
  const [products, setProducts] = useState([]);

  // 2. State for form input (new product)
  const [form, setForm] = useState({
    name: "",
    model: "",
    quantity: 0
  });

  // 3. Load products from backend when page opens
  useEffect(() => {
    fetch("http://localhost:9000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  // 4. Handle input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  // 5. Add product to backend
  const addProduct = () => {
    fetch("http://localhost:9000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then((res) => res.json())
      .then((newProduct) => {
        setProducts([...products, newProduct]);
      });
  };

  return (
    <div>
      <h1>Spare Project Inventory Project</h1>

      {/* FORM */}
      <input
        name="name"
        placeholder="Product Name"
        onChange={handleChange}
      />

      <input
        name="model"
        placeholder="Model"
        onChange={handleChange}
      />

      <input
        name="quantity"
        type="number"
        placeholder="Quantity"
        onChange={handleChange}
      />

      <button onClick={addProduct}>Add Product</button>

      {/* PRODUCT LIST */}
      <ul>
        {products.map((p, index) => (
          <li key={index}>
            {p.name} - {p.model} - {p.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

import React, { useEffect, useState } from "react";
import "./FormStyles.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, fetchProductById } from "../../redux/slices/productSlice";
import ScanComponent from "../ScanComponent";
import { successAlert } from "../../utils/alert";

const FormComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scan, setScan] = useState(false);
  const [scanId, setScanId] = useState("");
  const [error, setError] = useState("");
  const { isUpdated, product, detailProduct } = useSelector((state) => state.products);
  const [products, setProducts] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
   if (isUpdated) {
      setProducts(product);
   }
  }, [isUpdated, product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducts({ ...products, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(fetchProductById(product.id))
    if (isUpdated) {
       dispatch(updateProduct(products));
       successAlert("Produk berhasil diupdate");
    } else {
      if (Object.keys(detailProduct).length !== 0) {
        setError("Id sudah ada, silahkan scan ulang atau masukan id yang lain")
        return;
      }

      if (scanId !== "") {
         dispatch(addProduct({...products, id: scanId}));
      } else {
         dispatch(addProduct(products));
      } 

      successAlert("Produk berhasil ditambahkan");
    }
    navigate("/");
  };

  const handleScan = () => {
      setScan(!scan);
  };

  if (scan) {
    return <ScanComponent 
    handleScan={handleScan}
    scanId={scanId}
    setScanId={setScanId}/>;
  }

  return (
    <div className="container">
      <h1>{isUpdated ? "Edit" : "Tambah"} Produk</h1>
      <form onSubmit={handleSubmit} className="form">
        <label>
          ID Produk:
          <input
            type="text"
            name="id"
            className={scanId !== "" || isUpdated ? "disable" : ""}
            value={scanId !== "" ? scanId : products.id}
            readOnly={scanId  !== "" || isUpdated ? true : false}
            onChange={handleChange}
            placeholder="Masukkan ID produk"
            required
          />
        </label>
        <label>
          Nama Produk:
          <input
            type="text"
            name="name"
            value={products.name}
            onChange={handleChange}
            placeholder="Masukkan nama produk"
            required
          />
        </label>
        <label>
          Deskripsi:
          <textarea
            name="description"
            value={products.description}
            onChange={handleChange}
            placeholder="Masukkan deskripsi produk"
          />
        </label>
        <label>
          Harga Produk:
          <input
            type="number"
            name="price"
            value={products.price}
            onChange={handleChange}
            placeholder="Masukkan harga produk"
            required
          />
        </label>
        <label>
          Stok Produk:
          <input
            type="number"
            name="stock"
            value={products.stock}
            onChange={handleChange}
            placeholder="Masukkan stok produk"
            required
          />
        </label>
        <div className="btn-actions">
            <button onClick={() => navigate(-1)}>Back</button>
            {!isUpdated && (
               <button onClick={handleScan} className="add-btn">Scan</button>
            )}
            <button type="submit" className={`${isUpdated ? "edit-btn" : "add-btn"}`}>{isUpdated ? "Edit" : "Tambah"} Produk</button>
        </div>
      </form>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default FormComponent;

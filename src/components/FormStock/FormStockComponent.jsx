import React, { useEffect, useState } from "react";
import "./FormStockStyles.css"
import ScanComponent from "../ScanComponent";
import { fetchProductById, patchProduct } from "../../redux/slices/productSlice";
import LoadingComponent from "../LoadingComponent";
import { useDispatch, useSelector } from "react-redux";
import { createLog } from "../../redux/slices/logsSlice";
import { FaQrcode } from "react-icons/fa";
import { errorAlert, successAlert } from "../../utils/alert";
import { useNavigate } from "react-router-dom";

const FormStockComponent = ({ type }) => {
  const navigate = useNavigate();
  const [scan, setScan] = useState(false);
  const [scanId, setScanId] = useState("");
  const dispatch = useDispatch();
  const { detailProduct, isLoading, error } = useSelector((state) => state.products);
  const [input, setInput] = useState({
    quantity: "",
    note: "",
    type,
  })

  useEffect(() => {
    if (scanId !== "") {
      dispatch(fetchProductById(scanId))
    }
  }, [scanId, dispatch])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({...input, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let newStock = null;
    if (input.type === "stock_in") {
      newStock = parseInt(detailProduct.stock) + parseInt(input.quantity);
    } else {
      newStock = parseInt(detailProduct.stock) - parseInt(input.quantity);
    }
    
    dispatch(patchProduct({...detailProduct, stock: newStock}));
    const { id } = detailProduct;
    const { quantity, note, type } = input;
    const logs = {
      product_id: id,
      type,
      quantity: parseInt(quantity),
      note,
      date: new Date().toISOString(),
    }
    dispatch(createLog(logs))
    if (type === "stock_in") {
      successAlert("Stock berhasil ditambahkan");
    } else {
      successAlert("Stock berhasil dikurangi")    
    }

    setScanId("");
    navigate("/logs");
  }

  const handleScan = () => {
    if (scan && error) {
      errorAlert("Produk tidak ditemukan");
      setScanId("");
    }
    setScan(!scan);
  };


  if (scan) {
    return <ScanComponent 
    handleScan={handleScan}
    scanId={scanId}
    setScanId={setScanId}/>;
  }

  if (isLoading) return <LoadingComponent />

   return (
    <div className="container">
      <h1>{type === "stock_in" ? "Stock In" : "Stock Out"}</h1>
      {scanId === "" ? (
        <>
          <p className="about-stock">Scan untuk mendapatakan info produk</p>
          <button onClick={handleScan} className="scan-btn">
          <FaQrcode /> Scan
        </button>
        </>
      ) : (
        <form className="form">
          <label>
            ID Produk:
            <input
              type="text"
              name="id"
              value={detailProduct.id}
              className="disable"
              readOnly={true}
              required
            />
          </label>
          <label>
            Nama:
            <input
              type="text"
              name="name"
              value={detailProduct.name}
              className="disable"
              readOnly={true}
              required
            />
          </label>
          <label>
            Kuantitas:
            <input
              type="number"
              value={input.quantity}
              onChange={handleChange}
              name="quantity"
              placeholder="Masukkan jumlah produk"
              required
            />
          </label>
          <label>
            Catatan:
            <textarea
              name="note"
              value={input.note}
              onChange={handleChange}
              placeholder="Masukkan catatan"
            />
          </label>
          <div className="btn-actions">
              <button onClick={handleSubmit} className="add-btn">Simpan</button>
          </div>
        </form>
      )}
    </div>
   )
}

export default FormStockComponent;
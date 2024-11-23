import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaQrcode } from "react-icons/fa";
import "./TableStyles.css";
import { Link, useLocation } from "react-router-dom";
import { fetchProducts, deleteProduct, currentProduct } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import LoadingComponent from "../LoadingComponent";
import ScanComponent from "../ScanComponent";
import Swal from "sweetalert2";

const TableProductComponent = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [scan, setScan] = useState(false);
  const [scanId, setScanId] = useState("");
  const { products, isLoading, isSuccess } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  
    if (isSuccess) {
      dispatch(fetchProducts());
    }
  }, [isSuccess, dispatch, location]);

  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const clearSearchInput = () => {
    setSearchTerm("");
    setScanId("");
  }

  const handleScan = () => {
    if (scan) {
      setSearchTerm(scanId);
    }
    setScan(!scan);
    setScanId("");
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Tindakan ini tidak bisa dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteProduct(id))
        Swal.fire("Dihapus!", "Data telah dihapus.", "success");
      }
    });
  }

  if (scan) {
    return <ScanComponent 
    handleScan={handleScan}
    scanId={scanId}
    setScanId={setScanId}/>;
  }

  if (isLoading) return <LoadingComponent />;
  
  return (
    <div className="container">
      <h1>Daftar Produk</h1>
      <div className="actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {scanId !== "" || searchTerm !== "" && (
            <span onClick={clearSearchInput}>x</span>
          )}
        </div>

        <button onClick={handleScan} className="scan-btn">
          <FaQrcode /> Scan
        </button>
        <Link to={"product/add"} className="add-btn">
          <FaPlus /> Tambah
        </Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama Produk</th>
            <th>Deskripsi</th>
            <th>Harga</th>
            <th>Stok</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts?.map((product, index) => (
            <tr key={index}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td className="actions">
                <Link to={`/product/edit/${product.id}`} onClick={() => dispatch(currentProduct(product))} className="edit-btn">
                  <FaEdit /> Edit
                </Link>
                <button type="button" onClick={() => handleDelete(product.id)} className="delete-btn">
                  <FaTrash /> Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableProductComponent;
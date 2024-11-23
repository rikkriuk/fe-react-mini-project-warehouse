import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLogs } from "../../redux/slices/logsSlice";
import { FaQrcode } from "react-icons/fa";
import "./TableLogsStyles.css";
import LoadingComponent from "../LoadingComponent";

const TableLogsComponent = () => {
  const [productIdFilter, setProductIdFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  const { logs, isLoading, error } = useSelector((state) => state.logs);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchLogs({ product_id: productIdFilter, type: typeFilter }));
  }, [dispatch, productIdFilter, typeFilter]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  if (error) {
    return (
      <div className="container">
        <h3>Error: {error}</h3>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Daftar Logs</h1>
      <div className="actions">
        <div className="search-container">
          <input
            type="text"
            placeholder="Filter Product ID"
            value={productIdFilter}
            onChange={(e) => setProductIdFilter(e.target.value)}
          />
          <div className="actions">
            <button className="scan-btn">
              <FaQrcode /> Scan
            </button>
            <select
              id="typeFilter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">Semua Tipe</option>
              <option value="stock_in">Stock In</option>
              <option value="stock_out">Stock Out</option>
            </select>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Produk ID</th>
            <th>Tipe</th>
            <th>Kuantitas</th>
            <th>Catatan</th>
            <th>Tanggal</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log, index) => (
            <tr key={log.id}>
              <td>{index + 1}</td>
              <td>{log.product_id}</td>
              <td>{log.type}</td>
              <td>{log.quantity}</td>
              <td>{log.note}</td>
              <td>{new Date(log.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableLogsComponent;

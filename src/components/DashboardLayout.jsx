import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header/HeaderComponent";
import SidebarComponent from "./Sidebar/SidebarComponent";
import TableComponent from "./TableProduct/TableProductComponent";
import FormComponent from "./Form/FormComponent";
import LogsContainer from "../containers/LogsContainer";
import FormStockComponent from "./FormStock/FormStockComponent";

const DashboardLayout = () => {
  return (
      <Router>
         <div className="dashboard-layout">
            <SidebarComponent />
            <div>
               <Header />
               <Routes>
                  <Route path="/" element={<TableComponent />}></Route>
                  <Route path="/product" element={<TableComponent />}></Route>
                  <Route path="/product/add" element={<FormComponent />}></Route>
                  <Route path="/product/edit/:id" element={<FormComponent />}></Route>
                  <Route path="/stock/in" element={<FormStockComponent type={"stock_in"} />}></Route>
                  <Route path="/stock/out" element={<FormStockComponent type={"stock_out"} />}></Route>
                  <Route path="/logs" element={<LogsContainer />}></Route>
               </Routes>
            </div>
         </div>
      </Router>
  )
};

export default DashboardLayout;  
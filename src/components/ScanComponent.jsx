import React from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";

const ScanComponent = ({ handleScan, scanId, setScanId }) => {
   const text = "Scane the barcode!";

   return (
      <div className="scan-component">
         <BarcodeScannerComponent
         width={500}
         height={500}
         onUpdate={(err, result) => {
            if (result) setScanId(result.text);
         }}
         />
         <p>{text}</p>
         {scanId !== "" && <p>ID: {scanId}</p>}
         <div className="btn-actions">
            <button onClick={handleScan}>Back</button>
            {
               scanId !== "" && <button onClick={handleScan} className="add-btn">Tambah</button>
            }
         </div>
      </div>
   )
}

export default ScanComponent;
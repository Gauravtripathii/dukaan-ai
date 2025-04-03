// components/dashboard_new/LongTermForecast/LongTermForecast.js
import "./LongTermForecast.css";
import { useState } from "react";

export default function LongTermForecast({ long_term_forecast }) {
  const [currentPage, setCurrentPage] = useState(0);
  const monthsPerPage = 12;
  const totalPages = Math.ceil(long_term_forecast.length / monthsPerPage);

  const [selectedSalesColumn, setSelectedSalesColumn] = useState("Total Sales");

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * monthsPerPage;
  const displayedData = long_term_forecast.slice(startIndex, startIndex + monthsPerPage);

  // Available sales options in the dropdown
  const salesOptions = ["Total Sales", "Total Sales_Lag1", "Total Sales_Lag2", "Total Sales_Lag3"];

  return (
    <div className="forecast-container">
      <div className="forecast-header">
        <h2>Long-Term Forecast</h2>
        <div className="forecast-info">
          <p>
            Showing months {startIndex + 1} to{" "}
            {Math.min(startIndex + monthsPerPage, long_term_forecast.length)} out of {long_term_forecast.length}
          </p>
          <div className="pagination">
            <button onClick={handlePrev} disabled={currentPage === 0} className="pagination-button">
              Previous
            </button>
            <span className="pagination-info">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button onClick={handleNext} disabled={currentPage === totalPages - 1} className="pagination-button">
              Next
            </button>
          </div>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="forecast-table">
          <thead>
            <tr>
              <th>Estimated Cost Price</th>
              <th>Profit Margin (%)</th>
              <th>Sales Change</th>
              <th>Selling Price</th>
              <th>Stock Estimate</th>
              <th className="sales-header">
                <label htmlFor="sales-column-select">Sales:</label>
                <select
                  id="sales-column-select"
                  className="sales-dropdown"
                  value={selectedSalesColumn}
                  onChange={(e) => setSelectedSalesColumn(e.target.value)}
                >
                  {salesOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </th>
            </tr>
          </thead>
          <tbody>
            {displayedData.map((monthData, rowIndex) => (
              <tr key={rowIndex}>
                <td>{Number(monthData["Estimated Cost Price"]).toFixed(2)}</td>
                <td>{Number(monthData["Profit Margin (%)"]).toFixed(2)}</td>
                <td>{Number(monthData["Sales Change"]).toFixed(2)}</td>
                <td>{Number(monthData["Selling Price"]).toFixed(2)}</td>
                <td>{Number(monthData["Stock Estimate"]).toFixed(2)}</td>
                <td>{Number(monthData[selectedSalesColumn]).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
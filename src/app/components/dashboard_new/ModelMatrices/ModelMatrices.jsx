// components/dashboard_new/ModelMetrics/ModelMetrics.js
import "./ModelMatrices.css";

export default function ModelMetrics({ timestamp, xgboost_mae, lstm_mae, demand_trends }) {
  return (
    <div className="model-metrics-container">
      <h3>Model Performance</h3>
      <div className="metrics-grid">
        <div className="metric-item">
          <span className="metric-label">Timestamp:</span>
          <span className="metric-value">{timestamp}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">XGBoost MAE (Total Sales):</span>
          <span className="metric-value">{xgboost_mae && xgboost_mae["Total Sales"] !== undefined ? Number(xgboost_mae["Total Sales"]).toFixed(4) : "N/A"}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">XGBoost MAE (Profit Margin):</span>
          <span className="metric-value">{xgboost_mae && xgboost_mae["Profit Margin (%)"] !== undefined ? Number(xgboost_mae["Profit Margin (%)"]).toFixed(4) : "N/A"}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">XGBoost MAE (Stock Estimate):</span>
          <span className="metric-value">{xgboost_mae && xgboost_mae["Stock Estimate"] !== undefined ? Number(xgboost_mae["Stock Estimate"]).toFixed(4) : "N/A"}</span>
        </div>
        <div className="metric-item">
          <span className="metric-label">LSTM MAE:</span>
          <span className="metric-value">{lstm_mae !== undefined ? Number(lstm_mae).toFixed(4) : "N/A"}</span>
        </div>
        {demand_trends && demand_trends.length > 0 && (
          <div className="metric-item">
            <span className="metric-label">Demand Trend:</span>
            <span className="metric-value">
              {demand_trends[0].label} ({Number(demand_trends[0].score * 100).toFixed(2)}%)
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
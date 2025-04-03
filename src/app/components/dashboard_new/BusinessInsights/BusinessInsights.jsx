// components/dashboard_new/BusinessInsights/BusinessInsights.js
import "./BusinessInsights.css";

export default function BusinessInsights({ insights }) {
  if (!insights) {
    return null;
  }

  return (
    <div className="business-insights">
      <h2>Business Insights</h2>
      <div className="top-insights-container">
        <div className="basic-insights-grid">
          <div className="insight-item">
            <span className="insight-label">Dynamic Pricing:</span>
            <span className="insight-value">{insights.dynamic_pricing}</span>
          </div>
          <div className="insight-item">
            <span className="insight-label">Holiday Sales Contribution:</span>
            <span className="insight-value">{insights.holiday_sales_contribution}%</span>
          </div>
          <div className="insight-item">
            <span className="insight-label">Seasonality Impact:</span>
            <span className="insight-value">{insights.seasonality_impact}</span>
          </div>
          <div className="insight-item">
            <span className="insight-label">Stockout Risk:</span>
            <span className="insight-value">{insights.stockout_risk}</span>
          </div>
        </div>
        {insights.shap_top_features && insights.shap_top_features.length > 0 && (
          <div className="shap-features-inline">
            <span className="insight-label">Top Influencing Features:</span>
            <ul className="shap-list">
              {insights.shap_top_features.map((feature, index) => (
                <li key={index}>
                  {feature[0]}: {Number(feature[1]).toFixed(4)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="remaining-insights-grid">
        {insights.demand_trends && insights.demand_trends.length > 0 && (
          <div className="insight-item">
            <span className="insight-label">Demand Trend:</span>
            <span className="insight-value">
              {insights.demand_trends[0].label} ({Number(insights.demand_trends[0].score * 100).toFixed(2)}%)
            </span>
          </div>
        )}
        {insights.lstm_mae !== undefined && (
          <div className="insight-item">
            <span className="insight-label">LSTM MAE:</span>
            <span className="insight-value">{Number(insights.lstm_mae).toFixed(4)}</span>
          </div>
        )}
        {insights.xgboost_mae && insights.xgboost_mae["Profit Margin (%)"] !== undefined && (
          <div className="insight-item">
            <span className="insight-label">XGBoost MAE (Profit Margin):</span>
            <span className="insight-value">{Number(insights.xgboost_mae["Profit Margin (%)"]).toFixed(4)}</span>
          </div>
        )}
        {insights.xgboost_mae && insights.xgboost_mae["Stock Estimate"] !== undefined && (
          <div className="insight-item">
            <span className="insight-label">XGBoost MAE (Stock Estimate):</span>
            <span className="insight-value">{Number(insights.xgboost_mae["Stock Estimate"]).toFixed(4)}</span>
          </div>
        )}
        {insights.xgboost_mae && insights.xgboost_mae["Total Sales"] !== undefined && (
          <div className="insight-item">
            <span className="insight-label">XGBoost MAE (Total Sales):</span>
            <span className="insight-value">{Number(insights.xgboost_mae["Total Sales"]).toFixed(4)}</span>
          </div>
        )}
        {insights.timestamp && (
          <div className="insight-item timestamp-item">
            <span className="insight-label">Timestamp:</span>
            <span className="insight-value">{insights.timestamp}</span>
          </div>
        )}
      </div>
    </div>
  );
}
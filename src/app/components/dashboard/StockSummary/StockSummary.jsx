import "./StockSummary.css";

export default function StockSummary({ stockSummary }) {
    console.log("Stock Summary:", stockSummary);

    return (
        <div className="stock-summary">
            <h2>Stock Summary</h2>
            {
                stockSummary ?
                <div className="summary-grid">
                <div><strong>25% (Lower Quartile):</strong> {stockSummary["25%"]}</div>
                <div><strong>50% (Median):</strong> {stockSummary["50%"]}</div>
                <div><strong>75% (Upper Quartile):</strong> {stockSummary["75%"]}</div>
                <div><strong>Total Records:</strong> {stockSummary.count}</div>
                <div><strong>Maximum Stock:</strong> {stockSummary.max}</div>
                <div><strong>Minimum Stock:</strong> {stockSummary.min}</div>
                <div><strong>Mean (Average Stock):</strong> {stockSummary.mean.toFixed(2)}</div>
                <div><strong>Standard Deviation:</strong> {stockSummary.std.toFixed(2)}</div>
            </div> :
            <div className="">Loading...</div>
            }
        </div>
    );
}

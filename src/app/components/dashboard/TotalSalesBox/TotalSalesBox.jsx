import './TotalSalesBox.css';

export default function TotalSalesBox({ totalSales }) {
  return (
    <div className="total-sales">
      Total Sales: <span>{totalSales}</span>
    </div>
  );
}

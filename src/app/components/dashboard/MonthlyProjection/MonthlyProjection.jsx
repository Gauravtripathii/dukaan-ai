import "./MonthlyProjection.css";
import { PacmanLoader } from "react-spinners";

export default function ForecastedProfits({ monthlyProjection }) {
    return (
        <div className="forecasted-profits-table">
            <h1>Monthly Projection</h1>
            <div className="table">
                <div className="heading-container">
                    <span>Month</span>
                    <span>Forecast</span>
                    <span>(%)</span>
                </div>
                <div className="table-body">
                    {monthlyProjection.dates.length ?
                    monthlyProjection.dates.map((date, index) => {
                        const value = monthlyProjection.dataArray[index];
                        const bgColor = value < 0 ? '#ffcccc' : value > 0 ? '#ccffcc' : '#f0f0f0';
                        return (
                            <div key={index} className="row" style={{ backgroundColor: bgColor }}>
                                <span>{date}</span>
                                <span>{value.toFixed(3)}</span>
                                <span>{(value * 100).toFixed(3)}</span>
                            </div>
                        );
                    }) :
                    <div style={{
                        width: "100%",
                        padding: "20px",
                        display: "grid",
                        placeItems: "center"
                    }}>
                        <PacmanLoader />
                    </div>
                    }
                </div>
            </div>
        </div>
    );
}

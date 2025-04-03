"use client";

import "@/app/page_styles/dashboard-new.css";

import { useEffect, useState } from "react";

import LongTermForecast from "../components/dashboard_new/LongTermForecast/LongTermForecast";
import BusinessInsights from "../components/dashboard_new/BusinessInsights/BusinessInsights";
import ModelMetrics from "../components/dashboard_new/ModelMatrices/ModelMatrices";


export default function DashboardNew() {
    const [long_term_forecast, set_long_term_forecast] = useState([]);
    const [timestamp, set_timestamp] = useState("");
    const [xgboost_mae, set_xgboost_mae] = useState("");
    const [lstm_mae, set_lstm_mae] = useState("");
    const [demand_trends, set_demand_trends] = useState("");
    const [business_insights, set_business_insights] = useState({});

    useEffect(() => {
        let forecast = JSON.parse(localStorage.getItem("forecast"));
        console.log(forecast);
        set_long_term_forecast(forecast.long_term_forecast);
        set_timestamp(forecast.timestamp);
        set_xgboost_mae(forecast.xgboost_mae);
        set_lstm_mae(forecast.lstm_mae);
        set_demand_trends(forecast.demand_trends);
        set_business_insights(forecast.business_insights);
    }, []);
    return (
        <div className="dashboard-new">
            <BusinessInsights insights={business_insights} />
            <LongTermForecast long_term_forecast={long_term_forecast} />
            {/* <ModelMetrics
                timestamp={timestamp}
                xgboost_mae={xgboost_mae}
                lstm_mae={lstm_mae}
                demand_trends={demand_trends}
            /> */}
        </div>
    )
}


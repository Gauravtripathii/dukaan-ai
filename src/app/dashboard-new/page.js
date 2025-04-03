"use client";

import { useEffect, useState } from "react";

import LongTermForecast from "../components/dashboard_new/LongTermForecast/LongTermForecast";


export default function DashboardNew() {
    const [long_term_forecast, set_long_term_forecast] = useState([]);
    const [timestamp, set_timestamp] = useState("");
    const [xgboost_mae, set_xgboost_mae] = useState("");
    const [lstm_mae, set_lstm_mae] = useState("");
    const [demand_trends, set_demand_trends] = useState("");
    const [business_insights, set_business_insights] = useState({});

    useEffect(() => {
        let forecast = JSON.parse(localStorage.getItem("forecast"));
        // console.log(forecast);
        set_long_term_forecast(forecast.long_term_forecast);
        set_timestamp(forecast.timestamp);
        set_xgboost_mae(forecast.xgboost_mae);
        set_lstm_mae(forecast.lstm_mae);
        set_demand_trends(forecast.demand_trends);
        set_business_insights(forecast.business_insights);
    }, []);
    return (
        <div className="dashboard-new">
            <h1>Dashboard New</h1>
            <LongTermForecast long_term_forecast={long_term_forecast} />
        </div>
    )
}


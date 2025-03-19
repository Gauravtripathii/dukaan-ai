"use client";

import "@/app/page_styles/dashboard.css";

import axios from "axios";
import { useEffect, useState } from "react";

export default function DashboardPage() {

    const [forecastedProfits, setForecastedProfits] = useState([]);
    const [monthlyProjection, setMonthlyProjection] = useState({
        dates: [],
        dataArray: [],
    });

    useEffect(() => {
        const getForecast = async () => {
            await axios.get("/api/get-data/")
                .then(res => {
                    console.log(res.data.forecast);
                    setMonthlyProjection({
                        dates: Object.keys(res.data.forecast.forecasted_profits),
                        dataArray: Object.values(res.data.forecast.forecasted_profits),
                    });
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getForecast();
    }, [])

    useEffect(() => {
        console.log(monthlyProjection);
    }, [monthlyProjection]);

    return (
        <div className="dashboard-page">dashboard</div>
    );
}

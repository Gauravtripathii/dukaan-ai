"use client";

import "@/app/page_styles/dashboard.css";

import axios from "axios";
import { useEffect, useState } from "react";

import MonthlyProjection from "../components/dashboard/MonthlyProjection/MonthlyProjection";
import SalesForecast from "../components/dashboard/SalesForecast/SalesForecast";
import StockSummary from "../components/dashboard/StockSummary/StockSummary";
import TotalSalesBox from "../components/dashboard/TotalSalesBox/TotalSalesBox";
import PricingStrategy from "../components/dashboard/PricingStategy/PricingStategy";

export default function DashboardPage() {

    const [monthlyProjection, setMonthlyProjection] = useState({
        dates: [],
        dataArray: [],
    });
    const [salesForecast, setSalesForecast] = useState({
        dates: [],
        dataArray: [],
    });
    const [stockSummary, setStockSummary] = useState();
    const [totalSales, setTotalSales] = useState(0);
    const [pricingStrategy, setPricingStrategy] = useState({
        new_price: 0,
        recommendation: "",
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
                    setSalesForecast({
                        dates: Object.keys(res.data.forecast.sales_forecast),
                        dataArray: Object.values(res.data.forecast.sales_forecast),
                    });
                    setStockSummary(res.data.forecast.stock_summary);
                    setTotalSales(res.data.forecast.total_sales);
                    setPricingStrategy({
                        new_price: res.data.forecast.pricing_strategy.new_price,
                        recommendation: res.data.forecast.pricing_strategy.recommendation,
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
        <div className="dashboard-page">
            <StockSummary stockSummary={stockSummary} />
            <div className="tabular-data">
                <MonthlyProjection monthlyProjection={monthlyProjection} />
                <SalesForecast salesForecast={salesForecast} />
            </div>
            <div className="bottom">
                <TotalSalesBox totalSales={totalSales} />
                <PricingStrategy pricingStrategy={pricingStrategy} />
            </div>
        </div>
    );
}

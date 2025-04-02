"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [forecast, setForecast] = useState({
        monthly: [],
        low_stock_items: [
            {
                item: null,
                stock: null,
            }
        ],
        new_pricing_strategy: {
            recommendation: null,
            suggested_price: null,
        }
    });

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please select a CSV file to upload.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://localhost:8000/predict/", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            // console.log("Forecast API Response : ", res.data);
            setForecast({
                monthly: Object.keys(res.data.forecast).map(key => (res.data.forecast[key])),
                low_stock_items: res.data.low_stock_items,
                new_pricing_strategy: res.data.new_pricing_strategy,
            });

            setResponse(res.data);
        } catch (err) {
            setError("Failed to upload file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     console.log("Forecast State : ", forecast);
    // }, [forecast]);

    // useEffect(() => {
    //     if (response && response.forecast) {
    //         const forecastArray = Object.keys(response.forecast).map(key => [key, response.forecast[key]]);
    //         console.log(forecastArray);
    //         setData(forecastArray);
    //     }
    // }, [response, error]);

    return (
        <div
            style={{
                padding: "20px"
            }}
        >
            <h1>Upload CSV File</h1>

            <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
            />

            <button
                onClick={handleUpload}
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload & Predict"}
            </button>


            {/* rendering the data */}
            <div>
                {forecast.monthly.map((month, index) => (
                    <div key={index}>
                        {month}
                    </div>
                ))}
            </div>
        </div>
    );
}

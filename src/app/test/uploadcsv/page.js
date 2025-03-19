"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [response, setResponse] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [data, setData] = useState([]);

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

            console.log(res)

            setResponse(res.data);
        } catch (err) {
            setError("Failed to upload file. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (response && response.forecast) {
            const forecastArray = Object.keys(response.forecast).map(key => [key, response.forecast[key]]);
            console.log(forecastArray);
            setData(forecastArray);
        }
    }, [response, error]);

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

            {error && <p>{error}</p>}

            {response && (
                <div
                    style={{
                        marginTop: "50px"
                    }}
                >
                    <h2>Prediction Result:</h2>
                    <pre
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "20px",
                            marginTop: "20px"
                        }}
                    >
                        {
                            data.map((d, i) => (
                                <div
                                    key={i}
                                    style={{
                                        padding: "20px 30px",
                                        border: "2px solid black",
                                        borderRadius: "10px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "10px"
                                    }}
                                >
                                    <h3
                                        style={{
                                            backgroundColor: "gray",
                                            padding: "10px",
                                            borderRadius: "5px",
                                            textAlign: "center",
                                            color: "white"
                                        }}
                                    >{d[0]}</h3>
                                    <div
                                        style={{
                                            display: "flex",
                                            gap: "50px",
                                            paddingLeft: "10px",
                                            paddingRight: "10px"
                                        }}
                                    >

                                        <div
                                            style={{
                                                display: "flex",
                                                flexDirection: "column"
                                            }}
                                        >
                                            <h4>Sales Forecast</h4>
                                            <ul
                                                style={{
                                                    listStyleType: "none"
                                                }}
                                            >
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jan</span>
                                                    <span>{d[1]['sales_forecast']['Jan']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Feb</span>
                                                    <span>{d[1]['sales_forecast']['Feb']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Mar</span>
                                                    <span>{d[1]['sales_forecast']['Mar']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Apr</span>
                                                    <span>{d[1]['sales_forecast']['Apr']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>May</span>
                                                    <span>{d[1]['sales_forecast']['May']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jun</span>
                                                    <span>{d[1]['sales_forecast']['Jun']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jul</span>
                                                    <span>{d[1]['sales_forecast']['Jul']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Aug</span>
                                                    <span>{d[1]['sales_forecast']['Aug']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Sep</span>
                                                    <span>{d[1]['sales_forecast']['Sep']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Oct</span>
                                                    <span>{d[1]['sales_forecast']['Oct']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Nov</span>
                                                    <span>{d[1]['sales_forecast']['Nov']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Dec</span>
                                                    <span>{d[1]['sales_forecast']['Dec']}</span>
                                                </li>
                                            </ul>
                                        </div>

                                        <div>
                                            <h4>Profit Forecast</h4>
                                            <ul
                                                style={{
                                                    listStyleType: "none"
                                                }}
                                            >
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jan</span>
                                                    <span>{d[1]['profit_forecast']['Jan']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Feb</span>
                                                    <span>{d[1]['profit_forecast']['Feb']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Mar</span>
                                                    <span>{d[1]['profit_forecast']['Mar']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Apr</span>
                                                    <span>{d[1]['profit_forecast']['Apr']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>May</span>
                                                    <span>{d[1]['profit_forecast']['May']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jun</span>
                                                    <span>{d[1]['profit_forecast']['Jun']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Jul</span>
                                                    <span>{d[1]['profit_forecast']['Jul']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Aug</span>
                                                    <span>{d[1]['profit_forecast']['Aug']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Sep</span>
                                                    <span>{d[1]['profit_forecast']['Sep']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Oct</span>
                                                    <span>{d[1]['profit_forecast']['Oct']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Nov</span>
                                                    <span>{d[1]['profit_forecast']['Nov']}</span>
                                                </li>
                                                <li
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "space-between",
                                                        paddingLeft: "5px",
                                                        paddingRight: "5px",
                                                    }}
                                                >
                                                    <span>Dec</span>
                                                    <span>{d[1]['profit_forecast']['Dec']}</span>
                                                </li>
                                            </ul>
                                        </div>

                                    </div>
                                </div>
                            ))
                        }
                    </pre>
                </div>
            )}
        </div>
    );
}

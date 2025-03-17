"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function UploadCSV() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            console.log("Forecast API Response : ", res.data);
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{
                padding: "20px"
            }}>
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
        </div>
    );
}

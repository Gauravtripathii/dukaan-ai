"use client";

import { useState } from "react";
import axios from "axios";

import { redirect } from "next/navigation";

import "@/app/page_styles/get-started.css";

export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [uploaded, setUploaded] = useState(false);

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setUploaded(false);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setLoading(true);
        setUploaded(false);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await axios.post("http://127.0.0.1:5000/predict", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            setUploaded(true);
            console.log("Forecast API Response:", res.data);
        } catch (err) {
            console.error("Upload Error:", err);
        } finally {
            setLoading(false);
            redirect("/dashboard");
        }
    };

    return (
        <div className="get-started">
            <div className="file-upload-container">
                <label className="upload-area">
                    <span className="upload-text">Click or drag a file to upload</span>
                    <input type="file" accept=".csv" className="file-input" onChange={handleFileChange} />
                </label>

                {file && <p className="file-name">Selected file: {file.name}</p>}

                <button
                    onClick={handleUpload}
                    disabled={loading || !file}
                    className={`upload-button ${loading ? "disabled" : ""}`}
                >
                    {loading ? "Uploading..." : uploaded ? "Uploaded ✅" : "Upload & Predict"}
                </button>
            </div>
        </div>
    );
}

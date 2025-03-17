"use client";

import axios from "axios";
import { useEffect } from "react";

export default function DashboardPage() {

    useEffect(() => {
        const getForecast = async () => {
            await axios.get("/api/get-data/")
                .then(res => {
                    console.log(res.data.forecast);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        getForecast();
    }, [])

    return (
        <div className="dashboard">dashboard</div>
    );
}

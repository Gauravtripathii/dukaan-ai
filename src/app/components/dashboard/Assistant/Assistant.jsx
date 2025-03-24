import "./Assistant.css";

import axios from "axios";
import { useEffect, useState } from "react";

import { Bot, User } from "lucide-react";
import { marked } from "marked";

export default function Assistant({ monthlyProjection, salesForecast, totalSales, pricingStrategy, stockSummary }) {

    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState("");

    const getChatbotResponse = async () => {
        setIsLoading(true);
        if (totalSales) {
            const jsonData = { monthlyProjection, salesForecast, totalSales, pricingStrategy, stockSummary };
            const stringData = JSON.stringify(jsonData);
            await axios.post("/api/getChatbot/", { message, context: stringData })
            .then(response => {
                console.log("CHATBOT: ", response.data);
                setMessages([
                    ...messages, { role: "user", content: message },
                    { role: "bot", content: response.data.reply }
                ]);
                setIsLoading(false);
                setMessage("");
            })
            .catch(error => {
                console.log("Error while fetching chatbot response: ", error);
            });
        }
    }

    return (
        <div className="assistant">

            {
                isLoading &&
                <div className="loading-screen">Loading...</div>
            }

            <div className="chatbot">
            {!messages.length ?
                        <div className="">
                        </div> :
                        <div
                            style={{
                                overflow: "auto"
                            }}
                        >
                            {
                                messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        style={{
                                            display: 'flex',
                                            gap: '1rem',
                                            width: '100%',
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: '5%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                            }}
                                        >
                                            {
                                                msg.role === 'bot' ?
                                                    <Bot size="32" /> :
                                                    <User size="32" />
                                            }
                                        </span>
                                        <span
                                            style={{
                                                width: "95%",
                                                textAlign: "justify"
                                            }}
                                            dangerouslySetInnerHTML={{__html: marked(msg.content)}}
                                        ></span>
                                    </div>
                                ))
                            }
                        </div>}



                {/* ask functionality */}
            <div
                style={{
                    width: "100%",
                    display: "flex",
                    gap: "1rem",
                }}
            >
                <input
                    type="text"
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    style={{
                        width: "100%",
                        padding: "0.5rem",
                        borderRadius: "0.5rem",
                        fontSize: "20px"
                    }}
                />
                <button
                    onClick={getChatbotResponse}
                    className="ask-btn"
                    style={{
                        width: "20%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1rem",
                        textTransform: "uppercase",
                        backgroundColor: "black",
                        color: "white",
                        borderRadius: "0.5rem",
                        borderColor: "black",
                        cursor: "pointer",
                        padding: "0.5rem",
                    }}
                >ask</button>
            </div>
            </div>

        </div>
    );
}

import "./Hero.css";

import Logo from "../Logo";

export default function Hero() {
    return (
        <div className="hero-container">
            <div className="left">
                <Logo />
                <div className="description">
                    <h1>
                        Predict.
                        Visualize.
                        Succeed.
                    </h1>
                    <p>
                        Your partner in business
                    </p>
                    <button>Get Started</button>
                </div>
            </div>

            <div className="right"></div>
        </div>
    )
}
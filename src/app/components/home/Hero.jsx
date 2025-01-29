import "./Hero.css";

import Logo from "../Logo";
import Image from "next/image";

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

            <div className="right">
                <Image
                    src="/hero.gif"
                    alt="hero image"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    )
}
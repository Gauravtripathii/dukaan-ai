import "./AboutProduct.css";

import Image from "next/image";

export default function AboutProduct() {
    return (
        <div className="about-product">
            <h1>
                Upload sales data, visualize insights, and predict trends with AI-powered tools. Smarter decisions, simplified.
            </h1>
            <Image
                src="/aboutproduct.gif"
                alt="hero image"
                width={500}
                height={500}
                unoptimized
                className="image"
            />
        </div>
    );
}

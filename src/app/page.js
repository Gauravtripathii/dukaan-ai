import "./page.css";

import Hero from "./components/home/Hero";
import AboutProduct from "./components/home/AboutProduct";

export default function Home() {
  return (
    <div className="main-container">
      <Hero />
      <AboutProduct />
    </div>
  );
}

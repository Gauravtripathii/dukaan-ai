import './PricingStategy.css';

export default function PricingStrategy({ pricingStrategy }) {
  return (
    <div className="pricing-strategy">
        <span>
            New Price: {pricingStrategy.new_price}
        </span>|
        <span>
            Recommendation: {pricingStrategy.recommendation}
        </span>
    </div>
  );
}
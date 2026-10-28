import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ColdChainBanner from '../components/ColdChainBanner';
import FarmStory from '../components/FarmStory';

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <ProductGrid />
      <ColdChainBanner />
      <FarmStory />
    </div>
  );
}

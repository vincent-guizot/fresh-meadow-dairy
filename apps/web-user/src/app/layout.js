import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ProductModal from '../components/ProductModal';
import CheckoutModal from '../components/CheckoutModal';
import AuthModal from '../components/AuthModal';
import OrderHistoryModal from '../components/OrderHistoryModal';

export const metadata = {
  title: 'Fresh Meadow Dairy | Farm Fresh Cold-Chain Dairy Storefront',
  description:
    'Single-origin pasture-raised milk, Greek yogurt, cultured butter, and artisan cheeses delivered directly to your doorstep under continuous 2°C - 4°C refrigeration.',
  icons: {
    icon: '/assets/logo.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-fmd-cream-100 text-fmd-navy-700 selection:bg-fmd-blue-200 selection:text-fmd-blue-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />

        {/* Global Modals & Drawers */}
        <CartDrawer />
        <ProductModal />
        <CheckoutModal />
        <AuthModal />
        <OrderHistoryModal />
      </body>
    </html>
  );
}

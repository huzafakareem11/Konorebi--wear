import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  User, 
  ArrowRight, 
  Check, 
  X, 
  Plus, 
  Minus, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles, 
  Heart,
  Menu,
  ChevronRight,
  SlidersHorizontal,
  CloudUpload,
  Copy,
  ExternalLink,
  Download,
  Phone,
  MapPin,
  Mail,
  Loader2,
  PackageCheck
} from 'lucide-react';

// Generated image assets matching the warm, earthy aesthetic of the reference
import heroImg from './assets/images/hero_streetwear_hoodie_1790783879211.jpg';
import menImg from './assets/images/category_men_hoodie_1790783894042.jpg';
import womenImg from './assets/images/category_women_hoodie_1790783905543.jpg';
import unisexImg from './assets/images/category_unisex_apparel_1790783919359.jpg';
import accImg from './assets/images/category_accessories_cap_1790783932075.jpg';
import rackImg from './assets/images/featured_clothing_rack_1790783943429.jpg';

interface Product {
  id: string;
  name: string;
  category: 'Men' | 'Women' | 'Unisex' | 'Accessories';
  price: number;
  originalPrice?: number;
  image: string;
  color: string;
  colorHex: string;
  badge?: string;
  description: string;
  fabric: string;
}

interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

const PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'Espresso Heavyweight Boxy Hoodie',
    category: 'Men',
    price: 8990,
    originalPrice: 10990,
    image: menImg,
    color: 'Deep Espresso',
    colorHex: '#26201D',
    badge: 'Bestseller',
    description: 'Custom-milled 480 GSM organic cotton french terry with a relaxed, boxy drape and double-layered thermal hood.',
    fabric: '100% Organic French Terry Cotton'
  },
  {
    id: 'prod-2',
    name: 'Oatmeal Fleece Minimalist Pullover',
    category: 'Women',
    price: 7990,
    image: womenImg,
    color: 'Oat Sand',
    colorHex: '#D8CEBE',
    badge: 'New Season',
    description: 'Ultra-soft brushed interior with minimalist ribbing. Designed for effortless transitional layering.',
    fabric: '80% Organic Cotton, 20% Recycled Poly-Fleece'
  },
  {
    id: 'prod-3',
    name: 'Atelier Signature Oversized Hoodie',
    category: 'Unisex',
    price: 9490,
    image: unisexImg,
    color: 'Dark Charcoal',
    colorHex: '#1C1A19',
    badge: 'Iconic',
    description: 'Dropped shoulders, blind-stitched hem, and tonal embroidery on the back nape. The quintessential everyday uniform.',
    fabric: '500 GSM Heavyweight Terry'
  },
  {
    id: 'prod-4',
    name: 'Washed Stone Low-Profile Cap',
    category: 'Accessories',
    price: 2490,
    image: accImg,
    color: 'Warm Taupe',
    colorHex: '#9E8876',
    description: 'Unstructured six-panel crown crafted from pigment-dyed cotton twill with an adjustable antique brass slider.',
    fabric: '100% Pigment-Washed Cotton Twill'
  },
  {
    id: 'prod-5',
    name: 'Tonal Capsule Relaxed Hoodie',
    category: 'Unisex',
    price: 8490,
    image: rackImg,
    color: 'Warm Mocha',
    colorHex: '#6B5445',
    description: 'Part of our earth-dye studio collection, featuring pre-shrunk organic yarn and hidden kangaroo pocket compartments.',
    fabric: '450 GSM Heavy Terry Cotton'
  },
  {
    id: 'prod-6',
    name: 'Nomad Heavyweight Crewneck',
    category: 'Men',
    price: 7490,
    originalPrice: 9990,
    image: heroImg,
    color: 'Earth Dune',
    colorHex: '#E2D7C7',
    description: 'Classic collegiate cut engineered with gusseted side ribs for maximum freedom of motion.',
    fabric: '100% Combed Heavy Cotton'
  }
,
  { id: 'prod-7', name: 'Midnight Essential Oversized Tee', category: 'Men', price: 3290, image: heroImg, color: 'Midnight Black', colorHex: '#111111', badge: 'Everyday', description: 'Relaxed heavyweight tee with a clean neckline and premium structured drape.', fabric: '240 GSM Premium Cotton' },
  { id: 'prod-8', name: 'Sandstone Essential Oversized Tee', category: 'Women', price: 3290, image: womenImg, color: 'Sandstone', colorHex: '#C8B7A3', description: 'Soft oversized silhouette designed for easy layering and everyday comfort.', fabric: '240 GSM Premium Cotton' },
  { id: 'prod-9', name: 'Utility Cargo Joggers', category: 'Unisex', price: 5990, image: rackImg, color: 'Stone Olive', colorHex: '#6E705E', badge: 'New', description: 'Relaxed cargo joggers with practical pockets and an adjustable waistband.', fabric: 'Cotton Twill Blend' },
  { id: 'prod-10', name: 'Classic Zip-Up Hoodie', category: 'Men', price: 8990, image: menImg, color: 'Coffee Brown', colorHex: '#5B463A', description: 'Heavyweight full-zip hoodie with a relaxed fit and brushed interior.', fabric: '450 GSM Cotton Fleece' },
  { id: 'prod-11', name: 'Soft Rib Lounge Set Top', category: 'Women', price: 4290, image: womenImg, color: 'Oat', colorHex: '#D8CEBE', description: 'Minimal ribbed top made for comfortable everyday styling.', fabric: 'Soft Cotton Rib' },
  { id: 'prod-12', name: 'Everyday Canvas Cap', category: 'Accessories', price: 2190, image: accImg, color: 'Washed Khaki', colorHex: '#A89482', description: 'Low-profile adjustable cap with a clean embroidered Komorebi mark.', fabric: 'Washed Cotton Canvas' }
];

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('M');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [checkoutStep, setCheckoutStep] = useState<'idle' | 'checkout' | 'processing' | 'success'>('idle');
  const [orderNumber, setOrderNumber] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', city: 'Karachi', address: '', notes: '' });
  const [isHostingerModalOpen, setIsHostingerModalOpen] = useState(false);
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  const cartTotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const freeShippingThreshold = 15000;
  const freeShippingRemaining = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingFee = freeShippingRemaining === 0 ? 0 : 250;
  const grandTotal = cartTotal + shippingFee;
  const formatPKR = (amount: number) => `Rs. ${amount.toLocaleString('en-PK')}`;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2800);
  };

  const handleAddToCart = (product: Product, size: string = 'M') => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    showToast(`Added "${product.name}" (${size}) to your bag`);
    setIsCartOpen(true);
  };

  const updateQuantity = (productId: string, size: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.product.id === productId && item.size === size) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean) as CartItem[];
    });
  };

  const openCheckout = () => {
    setCheckoutError('');
    setCheckoutStep('checkout');
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutError('');
    if (!customer.name.trim() || !customer.phone.trim() || !customer.address.trim()) {
      setCheckoutError('Please enter your name, phone number and complete delivery address.');
      return;
    }
    if (cart.length === 0) return;
    setCheckoutStep('processing');
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer,
          paymentMethod: 'Cash on Delivery',
          items: cart.map(item => ({ id: item.product.id, name: item.product.name, size: item.size, quantity: item.quantity, price: item.product.price, color: item.product.color })),
          subtotal: cartTotal,
          shipping: shippingFee,
          total: grandTotal
        })
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.message || 'Unable to place the order.');
      setOrderNumber(data.orderNumber || 'KM-' + Date.now());
      setCheckoutStep('success');
      setCart([]);
    } catch (error) {
      setCheckoutStep('checkout');
      setCheckoutError(error instanceof Error ? error.message : 'Unable to place the order. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#1E1B18] font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#1E1B18] text-[#FAF7F2] px-5 py-3 rounded-full text-xs font-medium tracking-wide shadow-2xl flex items-center gap-2.5 animate-bounce">
          <Check className="w-4 h-4 text-[#D8CEBE]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner */}
      <div className="bg-[#24201D] text-[#ECE5D8] text-[11px] font-medium tracking-widest uppercase py-2 px-4 text-center border-b border-[#38322D]">
        Cash on Delivery available across Karachi · Easy size exchange
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#EAE3D6] transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#24201D] hover:text-[#786454] transition-colors"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Brand Wordmark (Zone 1) */}
          <div className="flex items-center gap-2">
            <a href="#" className="font-serif-display text-2xl sm:text-3xl font-bold tracking-tight text-[#1E1B18] flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-[#24201D] text-[#FAF7F2] flex items-center justify-center text-xs font-sans font-bold">K</span>
              KOMOREBI
            </a>
          </div>

          {/* Navigation Links (Zone 2) */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-wider text-[#524B45]">
            <a href="#home" className="hover:text-[#1E1B18] transition-colors">Home</a>
            <a href="#categories" className="hover:text-[#1E1B18] transition-colors">Categories</a>
            <a href="#shop" className="hover:text-[#1E1B18] transition-colors">Shop</a>
            <a href="#featured" className="hover:text-[#1E1B18] transition-colors">Collection</a>
            <a href="#story" className="hover:text-[#1E1B18] transition-colors">About</a>
          </nav>

          {/* Action Icons (Zone 3) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Hostinger Deploy Guide Button */}
            <button
              onClick={() => setIsHostingerModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EAE3D6] hover:bg-[#DDD3C4] text-[#1E1B18] text-[11px] font-bold uppercase tracking-wider transition-all border border-[#D5C9B7]"
              title="Hostinger Deployment Guide & Production Files"
            >
              <CloudUpload className="w-3.5 h-3.5 text-[#6B5445]" />
              <span className="hidden sm:inline">Store Setup</span>
              <span className="sm:hidden">Deploy</span>
            </button>

            <button 
              onClick={() => setIsSearchOpen(true)}
              className="p-2 text-[#24201D] hover:text-[#786454] hover:bg-[#EFEAE1] rounded-full transition-colors"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            <button 
              onClick={() => showToast("Account sign-in available in Hostinger store settings")}
              className="p-2 text-[#24201D] hover:text-[#786454] hover:bg-[#EFEAE1] rounded-full transition-colors hidden sm:block"
              aria-label="Account"
            >
              <User className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#24201D] text-[#FAF7F2] rounded-full hover:bg-[#3D352F] transition-all flex items-center justify-center shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-4 h-4" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#967C65] text-white text-[10px] font-bold rounded-full flex items-center justify-center shadow">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#EAE3D6] bg-[#FAF7F2] px-6 py-4 space-y-3 text-sm font-medium">
            <a href="#home" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#8B735F]">Home</a>
            <a href="#categories" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#8B735F]">Shop by Category</a>
            <a href="#shop" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#8B735F]">All Products</a>
            <a href="#featured" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#8B735F]">Featured Collection</a>
            <a href="#story" onClick={() => setMobileMenuOpen(false)} className="block py-1 hover:text-[#8B735F]">Our Story</a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section id="home" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 lg:pb-24">
        <div className="relative rounded-3xl overflow-hidden bg-[#24201D] min-h-[540px] sm:min-h-[620px] flex items-center shadow-xl">
          
          {/* Hero Background Image */}
          <div className="absolute inset-0">
            <img 
              src={heroImg} 
              alt="Komorebi Minimalist Streetwear Hoodies Campaign" 
              className="w-full h-full object-cover object-center brightness-[0.78] contrast-[1.05]"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#191614]/90 via-[#191614]/50 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-xl px-8 sm:px-14 py-16 text-[#FAF7F2]">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-[#D8CEBE] mb-4">
              <span>Fresh Capsule</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D8CEBE]"></span>
              <span>Autumn/Winter 2026</span>
            </div>

            <h1 className="font-serif-display text-4xl sm:text-6xl font-medium tracking-tight leading-[1.1] mb-6 text-white text-balance">
              Comfort Looks Good On You.
            </h1>

            <p className="text-sm sm:text-base text-[#D4C9BC] font-normal leading-relaxed mb-8 max-w-md">
              Casual. Stylish. Always You. Heavyweight 480 GSM French terry engineered for effortless everyday silhouettes.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a 
                href="#shop"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FAF7F2] text-[#1E1B18] text-xs font-bold uppercase tracking-wider hover:bg-[#EBE3D5] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md group"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </a>

              <a 
                href="#featured"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-white/30 text-white text-xs font-semibold uppercase tracking-wider hover:bg-white/10 transition-colors"
              >
                Explore Story
              </a>
            </div>

            {/* Quick Micro Tagline */}
            <div className="mt-12 pt-6 border-t border-white/15 flex items-center gap-6 text-xs text-[#C6BBAE]">
              <div>
                <span className="font-bold text-white block text-sm">480 GSM</span>
                <span>Organic Loopback Terry</span>
              </div>
              <div className="w-px h-7 bg-white/20"></div>
              <div>
                <span className="font-bold text-white block text-sm">Zero Plastic</span>
                <span>Biodegradable Packaging</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP BY CATEGORY SECTION */}
      <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#827163]">Curation</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18]">
              Shop by Category
            </h2>
          </div>
          <button 
            onClick={() => setSelectedCategory('All')}
            className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#1E1B18] hover:text-[#786454] transition-colors"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 4 Category Cards matching reference */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {[
            { name: 'Men', image: menImg, count: '14 Styles', cat: 'Men' },
            { name: 'Women', image: womenImg, count: '18 Styles', cat: 'Women' },
            { name: 'Unisex', image: unisexImg, count: '12 Styles', cat: 'Unisex' },
            { name: 'Accessories', image: accImg, count: '8 Styles', cat: 'Accessories' }
          ].map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.cat);
                const el = document.getElementById('shop');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="group relative rounded-2xl overflow-hidden bg-[#ECE5D8] aspect-[3/4] flex flex-col justify-end p-4 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#24201D]"
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917]/80 via-transparent to-transparent"></div>
              
              <div className="relative z-10 text-white">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#D4C9BC] block mb-0.5">
                  {cat.count}
                </span>
                <h3 className="font-serif-display text-xl sm:text-2xl font-semibold tracking-tight text-white flex items-center justify-between">
                  <span>{cat.name}</span>
                  <ChevronRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[#D8CEBE]" />
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* FEATURED COLLECTION SPOTLIGHT */}
      <section id="featured" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#EFEAE1] rounded-3xl p-6 sm:p-12 lg:p-16 border border-[#E3DACB]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Editorial Copy */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-block px-3 py-1 rounded-full bg-[#DFD6C8] text-[#5C4F44] text-[11px] font-bold uppercase tracking-wider">
                Limited Studio Edition
              </div>

              <h2 className="font-serif-display text-3xl sm:text-5xl font-medium tracking-tight text-[#1E1B18] leading-[1.15]">
                Featured Collection
              </h2>

              <p className="text-sm sm:text-base text-[#665D55] leading-relaxed">
                Timeless pieces for your everyday story. Meticulously garment-washed with mineral pigments to achieve an authentic worn-in patina that matures with time.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs font-medium text-[#4A423B]">
                  <Check className="w-4 h-4 text-[#8C7663]" />
                  <span>Preshrunk & anti-pilling organic terry cotton</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-[#4A423B]">
                  <Check className="w-4 h-4 text-[#8C7663]" />
                  <span>Subtle tone-on-tone embroidery details</span>
                </div>
                <div className="flex items-center gap-3 text-xs font-medium text-[#4A423B]">
                  <Check className="w-4 h-4 text-[#8C7663]" />
                  <span>Tailored modern drop-shoulder silhouette</span>
                </div>
              </div>

              <div className="pt-4">
                <button 
                  onClick={() => {
                    setSelectedCategory('All');
                    const el = document.getElementById('shop');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-all shadow-md group"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>

            {/* Right Column: Collection Rack Visual */}
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3] bg-[#D4C9BC]">
                <img 
                  src={rackImg} 
                  alt="Minimalist Clothing Rack with Neutral Tonal Hoodies" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-[#FAF7F2]/90 backdrop-blur-md p-4 rounded-xl border border-white/40 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#7C6B5E] block">Color Harmony</span>
                    <p className="text-xs font-semibold text-[#1E1B18]">Sand Dune · Warm Taupe · Raw Mocha · Deep Charcoal</p>
                  </div>
                  <div className="flex items-center -space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#FAF7F2] border-2 border-white shadow-sm"></span>
                    <span className="w-5 h-5 rounded-full bg-[#D8CEBE] border-2 border-white shadow-sm"></span>
                    <span className="w-5 h-5 rounded-full bg-[#8E7664] border-2 border-white shadow-sm"></span>
                    <span className="w-5 h-5 rounded-full bg-[#24201D] border-2 border-white shadow-sm"></span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* PRODUCTS CATALOG SECTION */}
      <section id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#827163]">Catalog</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18]">
              New Arrivals & Essentials
            </h2>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-[#EAE3D6] rounded-xl overflow-x-auto">
            {['All', 'Men', 'Women', 'Unisex', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#24201D] text-[#FAF7F2] shadow-sm'
                    : 'text-[#5C5248] hover:text-[#1E1B18]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="group bg-[#FAF7F2] rounded-2xl overflow-hidden border border-[#EBE3D5] hover:border-[#D6CAB8] transition-all duration-300 hover:shadow-md flex flex-col"
            >
              {/* Product Image Frame */}
              <div className="relative aspect-[4/3] bg-[#EFEAE1] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                
                {/* Badge if present */}
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#FAF7F2]/90 backdrop-blur-sm text-[#24201D] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                    {product.badge}
                  </span>
                )}

                {/* Quick View Button */}
                <button
                  onClick={() => setQuickViewProduct(product)}
                  className="absolute bottom-3 right-3 px-3 py-1.5 rounded-full bg-[#FAF7F2]/90 backdrop-blur-sm text-[#1E1B18] text-[11px] font-semibold opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 shadow hover:bg-white"
                >
                  Quick View
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-[#7A6B5F] mb-1">
                    <span>{product.category}</span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: product.colorHex }}></span>
                      {product.color}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-lg font-semibold text-[#1E1B18] group-hover:text-[#6E5948] transition-colors mb-2">
                    {product.name}
                  </h3>

                  <p className="text-xs text-[#6B6158] line-clamp-2 mb-4">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFEAE1] flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-base font-bold text-[#1E1B18] tabular-nums">
                      {formatPKR(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-[#9E9184] line-through tabular-nums">
                        {formatPKR(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => handleAddToCart(product, 'M')}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-semibold hover:bg-[#3E3630] transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* VALUE PROPOSITION BAR (THE RICH DARK SECTION FROM THE REFERENCE) */}
      <section className="bg-[#1C1917] text-[#FAF7F2] py-16 sm:py-20 border-y border-[#332E2A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-white mb-2">
              More Than Just Clothes
            </h2>
            <p className="text-xs sm:text-sm text-[#A89C8F] font-normal tracking-wide">
              It&apos;s a lifestyle rooted in conscious simplicity, quiet craftsmanship, and enduring comfort.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {[
              {
                icon: ShieldCheck,
                title: 'Premium Quality',
                desc: '100% organic combed cotton heavyweight yarns with reinforced seams'
              },
              {
                icon: Truck,
                title: 'Fast & Safe Delivery',
                desc: 'Tracked carbon-neutral shipping straight to your doorstep'
              },
              {
                icon: RotateCcw,
                title: 'Easy Returns',
                desc: '30-day effortless size exchange and stress-free refunds'
              },
              {
                icon: Sparkles,
                title: 'Secure Payments',
                desc: 'Secure Cash on Delivery ordering with order confirmation'
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#2A2522] border border-[#3E3732] flex items-center justify-center text-[#D8CEBE] mb-4">
                  <item.icon className="w-5 h-5" />
                </div>
                <h3 className="font-serif-display text-lg font-semibold text-white mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#A19587] leading-relaxed max-w-[220px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* COLOR PALETTE & CRAFT STORY SECTION */}
      <section id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#827163]">Philosophy</span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1E1B18] mt-1 mb-6">
              Good Clothes, Better Days ♡
            </h2>
            <p className="text-sm text-[#5C5248] leading-relaxed mb-6">
              We started Komorebi with a simple manifesto: design everyday apparel so comfortable you never want to take it off, and so thoughtfully proportioned it commands effortless respect anywhere you go.
            </p>
            <p className="text-sm text-[#5C5248] leading-relaxed mb-8">
              Every dye bath is inspired by earthen landscapes — volcanic stone, raw oatmeal, sun-warmed sand, and roasted mocha.
            </p>

            {/* Earth Swatches as seen in reference */}
            <div className="p-5 rounded-2xl bg-[#EFEAE1] border border-[#E2D8C8]">
              <span className="text-xs font-bold uppercase tracking-wider text-[#6B5E52] block mb-3">
                Signature Earth Palette
              </span>
              <div className="flex items-center gap-3">
                <div className="group text-center">
                  <div className="w-10 h-10 rounded-full bg-[#F4F0EA] border border-[#DDD3C4] shadow-sm mb-1"></div>
                  <span className="text-[10px] text-[#6E6357]">Sand</span>
                </div>
                <div className="group text-center">
                  <div className="w-10 h-10 rounded-full bg-[#D6CDC2] border border-[#BFB3A5] shadow-sm mb-1"></div>
                  <span className="text-[10px] text-[#6E6357]">Oat</span>
                </div>
                <div className="group text-center">
                  <div className="w-10 h-10 rounded-full bg-[#A89482] border border-[#917E6E] shadow-sm mb-1"></div>
                  <span className="text-[10px] text-[#6E6357]">Taupe</span>
                </div>
                <div className="group text-center">
                  <div className="w-10 h-10 rounded-full bg-[#6B5445] border border-[#544134] shadow-sm mb-1"></div>
                  <span className="text-[10px] text-[#6E6357]">Mocha</span>
                </div>
                <div className="group text-center">
                  <div className="w-10 h-10 rounded-full bg-[#24201D] border border-[#161413] shadow-sm mb-1"></div>
                  <span className="text-[10px] text-[#6E6357]">Espresso</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-xl aspect-[16/10] bg-[#ECE5D8]">
              <img 
                src={heroImg} 
                alt="Models enjoying comfortable streetwear outdoors" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-[#FAF7F2]/90 backdrop-blur-md text-[#1E1B18]">
                <p className="font-serif-display text-lg italic text-[#26211D] mb-2">
                  &ldquo;The drape of the 480 GSM hoodie feels like luxury bespoke tailoring, but with the comfort of cozy loungewear.&rdquo;
                </p>
                <div className="text-xs font-semibold text-[#66584B]">
                  Elena Vance · Fashion & Design Editor
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
        <div className="bg-[#EFEAE1] rounded-3xl p-8 sm:p-12 border border-[#E0D5C3]">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#827163]">The Studio Journal</span>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-semibold tracking-tight text-[#1E1B18] mt-1 mb-3">
            Join the Komorebi Community
          </h2>
          <p className="text-xs sm:text-sm text-[#665D55] max-w-md mx-auto mb-6">
            Subscribers receive private early access to small-batch capsule drops and private seasonal archives.
          </p>
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              showToast("Thank you for subscribing! Check your inbox.");
            }}
            className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
          >
            <input 
              type="email" 
              required
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-full bg-[#FAF7F2] border border-[#DDD3C4] text-xs text-[#1E1B18] placeholder-[#9E9184] focus:outline-none focus:ring-2 focus:ring-[#24201D]"
            />
            <button 
              type="submit" 
              className="px-6 py-3 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-colors shadow-sm"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#191614] text-[#A69A8E] text-xs pt-16 pb-12 border-t border-[#2C2724]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-[#2C2724]">
            
            <div className="col-span-2">
              <span className="font-serif-display text-2xl font-bold tracking-tight text-white block mb-3">
                KOMOREBI
              </span>
              <p className="text-xs text-[#8C8075] max-w-sm mb-4 leading-relaxed">
                Elevating everyday comfort through minimalist craftsmanship, earth-toned heavyweight textiles, and relaxed contemporary tailoring.
              </p>
              <div className="text-[11px] text-[#786D63]">
                Customer Support: 03252331785 · Cash on Delivery
              </div>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Shop</h4>
              <ul className="space-y-2">
                <li><button onClick={() => setSelectedCategory('Men')} className="hover:text-white transition-colors">Men&apos;s Collection</button></li>
                <li><button onClick={() => setSelectedCategory('Women')} className="hover:text-white transition-colors">Women&apos;s Collection</button></li>
                <li><button onClick={() => setSelectedCategory('Unisex')} className="hover:text-white transition-colors">Unisex Capsule</button></li>
                <li><button onClick={() => setSelectedCategory('Accessories')} className="hover:text-white transition-colors">Headwear & Caps</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Customer Care</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Shipping & Tracking</a></li>
                <li><a href="#" className="hover:text-white transition-colors">30-Day Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Size Guide & Fit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Care Instructions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold uppercase tracking-wider text-white text-[11px] mb-3">Studio</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Sustainability Manifesto</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Organic Cotton Sourcing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Stockists & Retail</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#70655B]">
            <div>
              © 2026 Komorebi Wear Atelier. All rights reserved.
            </div>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Accessibility</a>
            </div>
          </div>
        </div>
      </footer>

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl border border-[#E3DACB] relative">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1B18] shadow transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div className="aspect-[4/5] bg-[#ECE5D8]">
                <img 
                  src={quickViewProduct.image} 
                  alt={quickViewProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#7C6B5E]">
                    {quickViewProduct.category} · {quickViewProduct.color}
                  </span>
                  <h3 className="font-serif-display text-2xl font-semibold text-[#1E1B18] mt-1 mb-2">
                    {quickViewProduct.name}
                  </h3>
                  <div className="text-xl font-bold text-[#1E1B18] mb-4 tabular-nums">
                    {formatPKR(quickViewProduct.price)}
                  </div>
                  <p className="text-xs text-[#5E544A] leading-relaxed mb-6">
                    {quickViewProduct.description}
                  </p>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-[#3D352F] block mb-2">Fabric & Craft</span>
                    <p className="text-xs text-[#6E6357]">{quickViewProduct.fabric}</p>
                  </div>

                  {/* Size Selector */}
                  <div className="mb-6">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#3D352F] mb-2">
                      <span>Select Size</span>
                      <span className="text-[#87786B] font-normal underline cursor-pointer">Size Guide</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {['S', 'M', 'L', 'XL'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`w-10 h-10 rounded-lg text-xs font-bold transition-all ${
                            selectedSize === size
                              ? 'bg-[#24201D] text-[#FAF7F2] shadow-sm'
                              : 'bg-[#EAE3D6] text-[#544A41] hover:bg-[#DDD3C4]'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    handleAddToCart(quickViewProduct, selectedSize);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-3.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-all flex items-center justify-center gap-2 shadow"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag · {formatPKR(quickViewProduct.price)}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-[#E3DACB] relative">
            <button 
              onClick={() => setIsSearchOpen(false)}
              className="absolute top-4 right-4 p-2 text-[#574E45] hover:text-[#1E1B18]"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-serif-display text-xl font-semibold text-[#1E1B18] mb-4">Search Catalog</h3>
            
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-[#8A7C6E]" />
              <input 
                type="text"
                autoFocus
                placeholder="Search hoodies, caps, sizing, colors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#EFEAE1] border border-[#DDD3C4] text-xs text-[#1E1B18] placeholder-[#8A7C6E] focus:outline-none focus:ring-2 focus:ring-[#24201D]"
              />
            </div>

            <div className="text-xs text-[#7A6D60] mb-2 font-semibold uppercase tracking-wider">
              Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {['Heavyweight Hoodie', 'Espresso Men', 'Oatmeal Fleece', 'Washed Cap', '480 GSM'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSearchQuery(tag);
                  }}
                  className="px-3 py-1 rounded-full bg-[#EAE3D6] text-xs text-[#4F453C] hover:bg-[#DFD5C6] transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SHOPPING BAG SLIDE-OVER DRAWER */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div 
            onClick={() => setIsCartOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#FAF7F2] shadow-2xl flex flex-col z-10 border-l border-[#E3DACB]">
            {/* Drawer Header */}
            <div className="p-6 border-b border-[#EAE3D6] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-[#24201D]" />
                <h3 className="font-serif-display text-xl font-semibold text-[#1E1B18]">
                  Your Bag ({cartItemCount})
                </h3>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-[#63574C] hover:text-[#1E1B18] rounded-full hover:bg-[#EFEAE1] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Free Shipping Progress Bar */}
            <div className="px-6 py-3 bg-[#EFEAE1] border-b border-[#E3DACB] text-xs">
              {freeShippingRemaining > 0 ? (
                <div>
                  <div className="flex justify-between font-medium text-[#544A40] mb-1.5">
                    <span>Add <strong>{formatPKR(freeShippingRemaining)}</strong> more for Free Delivery</span>
                    <span>{formatPKR(cartTotal)} / {formatPKR(freeShippingThreshold)}</span>
                  </div>
                  <div className="w-full h-1.5 bg-[#DDD3C4] rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-[#24201D] transition-all duration-300" 
                      style={{ width: `${Math.min(100, (cartTotal / freeShippingThreshold) * 100)}%` }}
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-[#24201D] font-bold">
                  <Check className="w-4 h-4 text-[#8C7663]" />
                  <span>You have unlocked complimentary express shipping!</span>
                </div>
              )}
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12 text-[#7C6E61]">
                  <ShoppingBag className="w-12 h-12 stroke-[1.5] text-[#B8AA9B] mb-3" />
                  <p className="font-serif-display text-lg font-semibold text-[#1E1B18] mb-1">Your bag is empty</p>
                  <p className="text-xs max-w-xs mb-6 text-[#857668]">Explore our latest drop of heavyweight terry essentials.</p>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="px-6 py-2.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider"
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div 
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-4 p-3 bg-white rounded-xl border border-[#EBE3D5] shadow-xs"
                  >
                    <img 
                      src={item.product.image} 
                      alt={item.product.name} 
                      className="w-20 h-20 rounded-lg object-cover bg-[#ECE5D8]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h4 className="font-serif-display text-sm font-semibold text-[#1E1B18]">
                            {item.product.name}
                          </h4>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, -item.quantity)}
                            className="text-[#9E9184] hover:text-[#1E1B18] text-xs p-1"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="text-[11px] text-[#7A6C5F]">
                          Size: {item.size} · {item.product.color}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2 border border-[#E3DACB] rounded-lg px-2 py-0.5 bg-[#FAF7F2]">
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, -1)}
                            className="text-[#594F45] hover:text-[#1E1B18]"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-semibold tabular-nums px-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.product.id, item.size, 1)}
                            className="text-[#594F45] hover:text-[#1E1B18]"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <span className="text-xs font-bold text-[#1E1B18] tabular-nums">
                          {formatPKR(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-white border-t border-[#EAE3D6] space-y-4">
                <div className="space-y-2 text-xs text-[#6B5F54]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#1E1B18] tabular-nums">{formatPKR(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="font-semibold text-[#1E1B18]">
                      {shippingFee === 0 ? 'Complimentary' : formatPKR(shippingFee)}
                    </span>
                  </div>
                  <div className="border-t border-[#EFEAE1] pt-2 flex justify-between text-sm font-bold text-[#1E1B18]">
                    <span>Total</span>
                    <span className="tabular-nums">
                      {formatPKR(grandTotal)}
                    </span>
                  </div>
                </div>

                {checkoutStep === 'processing' ? (
                  <div className="w-full py-3.5 rounded-full bg-[#3D352F] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Securing Order...</span>
                  </div>
                ) : (
                  <button 
                    onClick={openCheckout}
                    className="w-full py-3.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}

                <div className="text-[10px] text-center text-[#9E9184]">
                  Cash on Delivery · Delivery in 2–5 business days
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* COD CHECKOUT MODAL */}
      {checkoutStep === 'checkout' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E3DACB] my-8 overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-[#EAE3D6] flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#827163]">Checkout</span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-semibold text-[#1E1B18]">Cash on Delivery</h3>
                <p className="text-xs text-[#75685D] mt-1">Enter your delivery details. No debit/credit card is required.</p>
              </div>
              <button onClick={() => setCheckoutStep('idle')} className="p-2 rounded-full hover:bg-[#EFEAE1]"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleCheckout} className="p-6 sm:p-8 space-y-5">
              {checkoutError && <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">{checkoutError}</div>}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-semibold text-[#443B34]">Full Name<input required value={customer.name} onChange={e => setCustomer({...customer, name:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D]" placeholder="Your full name" /></label>
                <label className="text-xs font-semibold text-[#443B34]">Phone Number<input required type="tel" value={customer.phone} onChange={e => setCustomer({...customer, phone:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D]" placeholder="03XXXXXXXXX" /></label>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="text-xs font-semibold text-[#443B34]">Email (optional)<input type="email" value={customer.email} onChange={e => setCustomer({...customer, email:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D]" placeholder="you@example.com" /></label>
                <label className="text-xs font-semibold text-[#443B34]">City<input required value={customer.city} onChange={e => setCustomer({...customer, city:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D]" /></label>
              </div>
              <label className="text-xs font-semibold text-[#443B34] block">Complete Delivery Address<textarea required rows={3} value={customer.address} onChange={e => setCustomer({...customer, address:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D] resize-none" placeholder="House/Flat, Street, Area, Landmark" /></label>
              <label className="text-xs font-semibold text-[#443B34] block">Order Notes (optional)<textarea rows={2} value={customer.notes} onChange={e => setCustomer({...customer, notes:e.target.value})} className="mt-1.5 w-full px-4 py-3 rounded-xl bg-white border border-[#DDD3C4] outline-none focus:ring-2 focus:ring-[#24201D] resize-none" placeholder="Any delivery instructions?" /></label>
              <div className="p-4 rounded-2xl bg-[#EFEAE1] border border-[#E3DACB]">
                <div className="flex items-center gap-2 text-sm font-bold text-[#1E1B18] mb-3"><PackageCheck className="w-5 h-5" /> Cash on Delivery</div>
                <div className="space-y-1.5 text-xs text-[#65594E]">
                  <div className="flex justify-between"><span>Items</span><span>{formatPKR(cartTotal)}</span></div>
                  <div className="flex justify-between"><span>Delivery</span><span>{shippingFee ? formatPKR(shippingFee) : 'Free'}</span></div>
                  <div className="border-t border-[#D9CEBE] pt-2 flex justify-between font-bold text-[#1E1B18]"><span>Pay at delivery</span><span>{formatPKR(grandTotal)}</span></div>
                </div>
              </div>
              <button type="submit" disabled={checkoutStep === 'processing'} className="w-full py-4 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] disabled:opacity-60 flex items-center justify-center gap-2">
                {checkoutStep === 'processing' ? <><Loader2 className="w-4 h-4 animate-spin" /> Placing Order...</> : <>Place COD Order <ArrowRight className="w-4 h-4" /></>}
              </button>
              <div className="text-[10px] text-center text-[#9E9184]">Need help? Call 03252331785</div>
            </form>
          </div>
        </div>
      )}

      {/* CHECKOUT SUCCESS MODAL */}
      {checkoutStep === 'success' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-[#E3DACB] animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-[#EAE3D6] text-[#24201D] flex items-center justify-center mx-auto mb-4">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif-display text-2xl font-semibold text-[#1E1B18] mb-2">
              Order Confirmed!
            </h3>
            <p className="text-xs text-[#6B5F54] mb-6 leading-relaxed">
              Order #{orderNumber} has been placed successfully. Order details have been sent to the store email.
            </p>
            <div className="p-4 rounded-xl bg-[#EFEAE1] text-xs text-[#52483F] text-left mb-6 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-[#7A6D61]">Estimated Delivery:</span>
                <span className="font-semibold">3-4 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#7A6D61]">Carrier:</span>
                <span className="font-semibold">Komorebi Delivery</span>
              </div>
            </div>
            <button
              onClick={() => {
                setCheckoutStep('idle');
                setIsCartOpen(false);
              }}
              className="w-full py-3.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-colors shadow"
            >
              Back to Store
            </button>
          </div>
        </div>
      )}

      {/* HOSTINGER DEPLOYMENT STEP-BY-STEP MODAL */}
      {isHostingerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#E3DACB] my-8 relative max-h-[90vh] overflow-y-auto">
            
            <button 
              onClick={() => setIsHostingerModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-white/80 hover:bg-white text-[#1E1B18] shadow transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-2xl bg-[#24201D] text-[#FAF7F2] flex items-center justify-center shadow-md">
                <CloudUpload className="w-5 h-5 text-[#D8CEBE]" />
              </div>
              <div>
                <h3 className="font-serif-display text-2xl font-bold text-[#1E1B18]">
                  Deploy to Hostinger
                </h3>
                <p className="text-xs text-[#7A6B5F]">
                  5-minute guide to take Komorebi Wear live on your Hostinger domain.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5 text-xs text-[#4A423B]">
              {/* Step 1 */}
              <div className="p-4 rounded-2xl bg-[#EFEAE1] border border-[#E3DACB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E1B18] flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#24201D] text-white flex items-center justify-center text-[10px]">1</span>
                    Build Production Assets
                  </span>
                  <span className="text-[10px] uppercase font-bold text-[#8C7663] bg-white/70 px-2 py-0.5 rounded-full">Already Completed</span>
                </div>
                <p className="text-[#665D55]">
                  The app is built and packaged inside the <code className="bg-[#DDD3C4] px-1.5 py-0.5 rounded text-[#24201D] font-mono font-bold">dist/</code> directory, complete with all CSS, images, and <code className="bg-[#DDD3C4] px-1.5 py-0.5 rounded text-[#24201D] font-mono font-bold">.htaccess</code> routing file.
                </p>
                <div className="p-2.5 rounded-xl bg-[#24201D] text-[#ECE5D8] font-mono text-[11px] flex items-center justify-between">
                  <span>npm run build</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText('npm run build');
                      setCopiedTab('build');
                      setTimeout(() => setCopiedTab(null), 2000);
                    }}
                    className="hover:text-white transition-colors"
                  >
                    {copiedTab === 'build' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Step 2 */}
              <div className="p-4 rounded-2xl bg-[#EFEAE1] border border-[#E3DACB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E1B18] flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#24201D] text-white flex items-center justify-center text-[10px]">2</span>
                    Log into Hostinger hPanel
                  </span>
                </div>
                <p className="text-[#665D55]">
                  Go to <a href="https://hpanel.hostinger.com" target="_blank" rel="noreferrer" className="underline font-semibold text-[#1E1B18] inline-flex items-center gap-1">hPanel <ExternalLink className="w-3 h-3 inline" /></a> &gt; select your Domain or Hosting plan &gt; navigate to <strong>File Manager</strong>.
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-4 rounded-2xl bg-[#EFEAE1] border border-[#E3DACB] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E1B18] flex items-center gap-2 text-sm">
                    <span className="w-5 h-5 rounded-full bg-[#24201D] text-white flex items-center justify-center text-[10px]">3</span>
                    Upload into <code className="bg-[#DDD3C4] px-1.5 py-0.5 rounded text-[#24201D] font-mono font-bold">public_html</code>
                  </span>
                </div>
                <p className="text-[#665D55]">
                  Open your domain&apos;s <strong className="text-[#1E1B18]">public_html</strong> directory in File Manager. Upload the files inside the <code className="bg-[#DDD3C4] px-1 py-0.5 rounded font-mono font-bold text-[#1E1B18]">dist/</code> folder:
                </p>
                <ul className="list-disc list-inside space-y-1 text-[#544A41] pl-2 font-mono text-[11px]">
                  <li>index.html</li>
                  <li>assets/ (all bundled javascript, CSS, and lifestyle photos)</li>
                  <li>.htaccess (ensures direct URL reloads work seamlessly)</li>
                </ul>
              </div>

              {/* Step 4: .htaccess explanation */}
              <div className="p-4 rounded-2xl bg-[#FAF7F2] border border-[#DDD3C4] space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#1E1B18] text-sm">Included Apache .htaccess Rule</span>
                  <button 
                    onClick={() => {
                      navigator.clipboard?.writeText(`<IfModule mod_rewrite.c>\n  RewriteEngine On\n  RewriteBase /\n  RewriteRule ^index\\.html$ - [L]\n  RewriteCond %{REQUEST_FILENAME} !-f\n  RewriteCond %{REQUEST_FILENAME} !-d\n  RewriteRule . /index.html [L]\n</IfModule>`);
                      setCopiedTab('htaccess');
                      setTimeout(() => setCopiedTab(null), 2000);
                    }}
                    className="flex items-center gap-1 text-[11px] text-[#7A6C5F] hover:text-[#1E1B18]"
                  >
                    {copiedTab === 'htaccess' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedTab === 'htaccess' ? 'Copied' : 'Copy rule'}</span>
                  </button>
                </div>
                <p className="text-[#6B6055] text-[11px]">
                  This is already in your build, preventing 404 errors on browser refresh or sub-routes in Hostinger.
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-end gap-3 pt-4 border-t border-[#E3DACB]">
              <button
                onClick={() => setIsHostingerModalOpen(false)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#24201D] text-[#FAF7F2] text-xs font-bold uppercase tracking-wider hover:bg-[#3D352F] transition-all shadow"
              >
                Got It, Ready to Deploy
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

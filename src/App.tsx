/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  User, 
  ArrowRight, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Info,
  Search,
  ChevronRight,
  Menu,
  X,
  Plus
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
type View = 'home' | 'parts';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  tags: string[];
  sku: string;
  description: string;
}

// --- Data ---
const PRODUCTS: Product[] = [
  {
    id: 'v1-prime',
    name: 'AeroPrecision V1-Prime',
    category: 'Vacuums',
    price: 599,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7O4aDK7yaGtCokbeNE3p_WdPqmm2PDOGz0oNIcM9WfCA6lEgtyDilUU0yUjTlr9vV5MpcR3tXNMG17TrFC3A8LRw5KHDrvWecV6fDL4saMDx616Hrru_ztweCcHDWgs2FnE6KorMXKD2Ya-1mVPX8qqPAMGiD3qW4UDoFfrcIOw8IfkvzaU8HPuz6eRNQgWzQjoWQeFdYOyUF4WW8dNX2CUbqBztK-3_KeYt8dlSEdix9X13WW5rwHNBnG9Oa7I4FBNn18VqT70D7',
    tags: ['HEPA Filter', '60min Runtime'],
    sku: 'AP-VAC-001',
    description: 'Industrial Grade Cordless System'
  },
  {
    id: 'r-logic',
    name: 'AeroPrecision R-Logic',
    category: 'Vacuums',
    price: 849,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC-6l0VgQuGT3rX3Yl76_x09duCX7N2k8eURBgaHAIY_F08xDm0QMpxrDXb4pZwODdXdNKtbz98Lh5Bm-P65-ASoG2AIf4htOotkAk1NCBrcLKsb5GNHWMHwIScA4FuNBL0NZUdejqK4bjl6qowW-GYmYqbIXakjFevd8TN5PkI0lzOJCYQZZHwjiGMtcQO-Il3bJMYUOf09FYd8Fb8Zaltdso5yhfBti-1mGSz7BZCgVSmOf5ps86N6LHj1tc9Vd4oU7G050a3KYaW',
    tags: ['AI Mapping', 'Self-Emptying'],
    sku: 'AP-VAC-002',
    description: 'Autonomous Navigation Unit'
  },
  {
    id: 'moto-x',
    name: 'AeroPrecision Moto-X',
    category: 'Vacuums',
    price: 249,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAm2AtCh1jgEzLMf3yjNhjJFRVNi5xEKCK7gooce3B-prj4x0ljy6EH_tBV6so_J2gYIodftnB8POozLQUA0lxI96xwRFnHjsaFcoPpE4rdBTQgqU00RRAdkWBVFkOzYcddURmXeqe1jpk9zJLm02HNH1ysAXKsvG4bEIaJwN36EssIFdtVG5YPyA90QosOvUnOFlRSIlY3lVB_fFnQzccQco7AVLY0nL9GTQUrJ-fMNFruZqjzUHb1D5X4UdwtbY-Ro3ooRM92M8zJ',
    tags: ['Car Detail Kit', 'High Suction'],
    sku: 'AP-VAC-003',
    description: 'Compact Specialized Tool'
  }
];

const REPLACEMENT_PARTS: Product[] = [
  {
    id: 'hepa-h13',
    name: 'Ultra-Fine Particulate Filter',
    category: 'Filters & Seals',
    price: 42,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCx_yDXvMCMUETb-mpcU09dRDZJ8qsECMT75DBfd2Bv6VV2K3NiMxJn0TrTkYydBPHjCtuRuYHO7CXjiufwzdQszXn4z09NbaUpM_842ac5UFv13U2cXdQyl_fi4udayrz-Aen__QKuVhzFfaobh4Ommt_LnB5YEBzxr6JBb7i7OANzgk_iF0MCk1Mb_axWZaCE__TulEgaEDPu5xkIqrTNKvTXgrXZbuCxzqi_4sWMVF1xMN8_qRqq6ylLAbfgC-2aGSZXg9MqsboM',
    tags: ['HEPA-H13'],
    sku: 'AP-FIL-092',
    description: 'Compatible with all Pro-Series units. Replacement cycle: 6 months.'
  },
  {
    id: 'spiral-brush',
    name: 'Spiral Carbon-Fiber Brush',
    category: 'Rotary Brushes',
    price: 68,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAzUAkZ1g56-uvZEC5lElsCJuXzOI9MsTVd9lEJ4Tp0ZTspg_pxZZuc3wX1RfXQmbyF35YCMY-pyHJ108SVxfs7d1FuUopDXzjfdzmHcX-cVrcaZhF4DXV6-MEtSDewYTqMd3riIxU98GCtzF342A5scaDlZZwquGEyWIF__gYVwdvgwjJvyfrp2ewmZNX_WAZbOLx3Ob_gSWdeBUJbn3W2U6pIVdDv_HCoBjiNB2xFMIdf9n-RgAfyu7xlsJ-34HxODee8ry68dRFj',
    tags: ['Anti-Tangle'],
    sku: 'AP-BRS-115',
    description: 'Enhanced debris extraction for multi-surface flooring.'
  },
  {
    id: 'lithium-max',
    name: 'Lithium-Max Power Cell',
    category: 'Power Cells',
    price: 185,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdZJFDz3aZs1TCrZc6pPEdMONjviALglGRCT2Omf52n5JU4601C5XgA5TOo6H1ZckEyssEfHOsI8rYAmxIDsuzRYcHlePHzaPy57iDcUG5CWaBL8A2Mgx_2IVdaqinJXWXA4Jr9RaFmHcpZOGBbYMDgsK1bd7buz0BWxavL3BkbH-wgr6s3mlsUls4A_XsIUqoc3XzGrUuXs0lyrVcYd72YL1mPRufci-VomLXEbbrRszZfQjmvGVQB5wtv4kT35ciJJnkLNpYLzEu',
    tags: ['Extended Run'],
    sku: 'AP-PWR-500',
    description: '60-minute continuous runtime. Quick-charge enabled.'
  },
  {
    id: 'drive-belt',
    name: 'Kevlar Reinforced Drive Belt',
    category: 'Drive Systems',
    price: 18,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1e5T1PjKQfhd7KuEkbbOEn9DvD__XxAnjI_YW_hDkP-PBHclhkdQ9nlE-R_eIeFZanDWzuDf9r8CTVm8QtVVnQT6WjFLwkQlDc4-lLsXO-SZxuYDfJ358EXAxxnzIYrHqLwUrDy8mkf9SGIZHhF6j8E2dhXTAaAmrv42IclUVeumGn1zUv1oVpM2FpGI_DMEcYKD4aZNiruLvMuEYYJ4YxPN53iJJqZyrwv1AghulmG5_qxnTEXBA8vqMJmVhPZJWaVWT3XbWJH1Y',
    tags: ['Zero-Slip'],
    sku: 'AP-DRV-022',
    description: 'Zero-slip architecture for consistent torque delivery.'
  }
];

// --- Components ---

function Nav({ activeView, onViewChange }: { activeView: View, onViewChange: (v: View) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-surface shadow-sm border-b border-outline-variant h-16' : 'bg-surface h-20'}`}>
      <div className="max-w-container-max mx-auto h-full px-gutter flex items-center justify-between">
        <div 
          className="font-display font-bold text-2xl tracking-tight cursor-pointer"
          onClick={() => onViewChange('home')}
        >
          AeroPrecision
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <button 
            onClick={() => onViewChange('parts')}
            className={`font-mono text-sm uppercase tracking-widest transition-colors ${activeView === 'parts' ? 'text-primary border-b-2 border-primary ' : 'text-secondary hover:text-primary'}`}
          >
            Replacement Parts
          </button>
          <button className="font-mono text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            Maintenance Kits
          </button>
          <button className="font-mono text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            Insurance
          </button>
          <button className="font-mono text-sm uppercase tracking-widest text-secondary hover:text-primary transition-colors">
            Support
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center bg-surface-container-low border border-outline-variant rounded-lg px-3 py-1.5">
            <Search className="w-4 h-4 text-secondary mr-2" />
            <input 
              type="text" 
              placeholder="Find part by SKU..." 
              className="bg-transparent border-none focus:ring-0 text-sm font-mono w-40"
            />
          </div>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors">
            <User className="w-5 h-5" />
          </button>
          <button 
            className="md:hidden p-2 hover:bg-surface-container-low rounded-full transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-surface border-b border-outline-variant overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-6">
              <button 
                onClick={() => { onViewChange('parts'); setMobileMenuOpen(false); }}
                className="font-mono text-sm uppercase text-left"
              >
                Replacement Parts
              </button>
              <button className="font-mono text-sm uppercase text-left">Maintenance Kits</button>
              <button className="font-mono text-sm uppercase text-left">Insurance</button>
              <button className="font-mono text-sm uppercase text-left">Support</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ProductCard({ product, type = 'standard' }: { product: Product, type?: 'standard' | 'part' }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <div className={`aspect-[4/5] bg-white overflow-hidden rounded-sm relative mb-6 ${type === 'part' ? 'aspect-square' : ''}`}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.tags.length > 0 && (
          <div className="absolute top-4 left-4 flex gap-2">
            {product.tags.map(tag => (
              <span key={tag} className="bg-surface-container-highest/80 backdrop-blur-sm px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest text-on-surface-variant">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="font-mono text-[10px] text-secondary uppercase tracking-[0.2em]">{product.sku}</p>
        <h3 className="font-display font-semibold text-lg text-on-surface group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-sm text-secondary font-sans leading-relaxed">
          {product.description}
        </p>
        <div className="pt-4 flex items-center justify-between">
          <span className="font-display font-bold text-xl text-primary">${product.price.toFixed(2)}</span>
          <button className="bg-primary text-white p-2 rounded-sm hover:bg-primary/90 transition-all active:scale-95">
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function HomeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-20"
    >
      {/* Hero */}
      <section className="relative h-[700px] flex items-center overflow-hidden bg-on-background">
        <div className="absolute inset-0">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUH47OgcMFDQyjnA2Bo21cmRJwZplyOX55yXorCqSWNTDHsGcgoMiUFESOVGoO6rz_RCAMP-u4GX4b6x5BbPHoed4OrvL4IdH5dXVnd7pCGiSEHdNwXKsTyiICiiVNmmK3xniZuv0W2lWa0D1kfJqFXY1TrYMTJveoLWHjydhNHkKYazoY4vsi4MPZM7wwlt2MIndTV9XcGU6du5SHEm9ELWvPfShSNZbOB1B0a4nusYVXiqKK5JFJmUEUmmveCJl7GLmx_5mU0f0s" 
            alt="Hero Vacuum" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-gutter w-full">
          <div className="max-w-2xl">
            <motion.h1 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6"
            >
              Engineered for <br /> Absolute Precision.
            </motion.h1>
            <motion.p 
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-surface-variant max-w-lg mb-8 leading-relaxed"
            >
              Discover our full range of high-performance floor care systems, precision-machined replacement parts, and maintenance ecosystems.
            </motion.p>
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <button className="bg-primary text-white px-8 py-4 rounded-sm font-mono text-sm tracking-widest uppercase hover:bg-primary/90 transition-all active:scale-[0.98]">
                Shop Vacuums
              </button>
              <button className="border border-white text-white px-8 py-4 rounded-sm font-mono text-sm tracking-widest uppercase hover:bg-white/10 transition-all active:scale-[0.98]">
                Technical Specs
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Grid Categories */}
      <section className="py-24 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[600px]">
          <div className="md:col-span-8 relative group overflow-hidden rounded-sm bg-surface-container-low">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDZKqX8nZbv29knqjjXgIbHQO5D0w24hhpgin1WCecYojftCSizmjh0i3GM_1ozOTzVZHGRh9W2PnWDqB3DMqAKNdtKd03fGJG5uRZuDJIw5-NDmcswAooQ8Nfw9PAbD9_01CNDJVJ_EKxCy4ngRUhZzEjH4dhpEc_HhZZ6BIgNEbfw1RGht_5hdfZnIP7F5phavyTKVCL-CYYE6IfBHlWkifKahwBWSAILrUQW1FAKRfjFoOZuQGpuBPmpVyqZs-TkkDEzWVjajNWO" 
              alt="Vacuums" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-12 text-white">
              <h2 className="font-display text-4xl font-bold mb-4">Core Performance Series</h2>
              <p className="max-w-md text-surface-variant mb-6">Our flagship vacuum systems featuring hyper-efficient airflow technology and industry-leading runtime.</p>
              <button className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] hover:gap-4 transition-all">
                Explore Models <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex-1 relative group overflow-hidden rounded-sm bg-surface-container-low">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDuNVp_hvXkTWZPo6s1M1KdQ33sK9Z7xFseIsSPTjfIsO-6bOy0n6JZgbXvGQMcp-GOw_lH36o37JHoaZOButrI9pgUPwPRSHX--FKQNJDCqTqjYXseGJ9uj59zuQY9tjD8xMbA0PvMCFdy0drJwgjNdmhU9PNvUmU_-QEvoUM7gEU1nuGQvtDKc2zqjva94V8SsiWeNsdpFehAFHuraRU-ZcHc46pJr7dt1jNeLitI6Qi0-MeXK6_d6Jwwa8GVO9KZwXi1V5ddeK_S" 
                alt="Maintenance" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex flex-col justify-end p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Maintenance Kits</h3>
                <button className="font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/50 w-fit">View Kits</button>
              </div>
            </div>
            <div className="flex-1 relative group overflow-hidden rounded-sm bg-surface-container-low">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzYL5dVGCTxWI2JFBUuf1nNZ_XK7C5qNk9e1tkED_Ob_OCbtqNkykHU19MUb1Pz2_qxb5ibcjuLlU4aPaYc4gV-1Cbf2Y1vgc7GfMOHsT_40LDbK1cP65FIk8fV5c52XJBh-3shEx0pR5E7e9gT-1Gj9MuJ_M2Ne6-wSbRFy9knUH53eSeTCPLQsNH4aMCNq8zz6xtwftqD6W-XQ1dEYhPN9w2i3mOnhCpKXnhW9Q0dd87ZhfsJRVT9oJgoRKE1Yke998g9YdzqHAz" 
                alt="Service" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all flex flex-col justify-end p-8 text-white">
                <h3 className="font-display text-2xl font-bold mb-2">Technical Insurance</h3>
                <button className="font-mono text-[10px] uppercase tracking-[0.2em] border-b border-white/50 w-fit">Protect Your Unit</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-surface-container-low border-y border-outline-variant">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <p className="font-mono text-xs text-primary uppercase tracking-[0.25em] mb-3">Featured Collection</p>
              <h2 className="font-display text-4xl font-bold tracking-tight">Professional Grade Floor Care</h2>
            </div>
            <button className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-secondary hover:text-primary transition-colors">
              All Products <Filter className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PRODUCTS.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Lifecycle Support */}
      <section className="py-32 max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-5 space-y-8">
            <h2 className="font-display text-4xl font-bold leading-tight">Intelligent Lifecycle Support</h2>
            <p className="text-lg text-secondary leading-relaxed">
              Ensure peak performance for decades. Our maintenance ecosystem combines real-time diagnostics with scheduled technical support and precision replacement alerts.
            </p>
            <div className="p-8 bg-white border border-outline-variant rounded-sm shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <span className="font-mono text-sm uppercase tracking-wider">V1-Prime Health Monitor</span>
                <span className="font-mono text-sm text-primary font-bold">82% Efficient</span>
              </div>
              <div className="h-2 w-full bg-surface-container-low rounded-full overflow-hidden mb-6">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '82%' }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="h-full bg-primary"
                />
              </div>
              <div className="flex items-start gap-4">
                <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm text-secondary leading-relaxed">
                  Recommended: HEPA Filter replacement in 14 days to maintain 99.9% filtration efficiency and motor longevity.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-10 bg-white border border-outline-variant rounded-sm hover:border-primary transition-colors h-full flex flex-col">
              <h3 className="font-display text-2xl font-bold mb-2">Standard</h3>
              <p className="text-secondary text-sm mb-8">Basic protective maintenance and technical onboarding.</p>
              <div className="text-4xl font-display font-bold mb-8">$0 <span className="text-sm font-normal text-secondary">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[ 'Factory Warranty', 'App Sync', 'Digital Support'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-secondary" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full border border-primary text-primary py-3 font-mono text-xs uppercase tracking-widest hover:bg-primary/5 transition-colors">Included</button>
            </div>
            <div className="p-10 bg-white border-2 border-primary rounded-sm relative h-full flex flex-col shadow-lg shadow-primary/5">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 text-[10px] font-mono uppercase tracking-[0.2em]">Recommended</span>
              <h3 className="font-display text-2xl font-bold mb-2">Precision Pro</h3>
              <p className="text-secondary text-sm mb-8">Full-spectrum protection with annual precision hardware audits.</p>
              <div className="text-4xl font-display font-bold mb-8">$19 <span className="text-sm font-normal text-secondary">/mo</span></div>
              <ul className="space-y-4 mb-10 flex-grow">
                {[ 'Accident Protection', 'Annual Filter Kits', 'Priority Tech Support', 'On-Site Calibration'].map(item => (
                  <li key={item} className="flex items-center gap-3 text-sm font-mono uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4 text-primary" /> {item}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-primary text-white py-4 font-mono text-xs uppercase tracking-widest hover:bg-primary/90 transition-all active:scale-[0.98]">Upgrade Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Horizontal Scroller Parts */}
      <section className="py-24 bg-on-background text-white overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter mb-12">
          <h2 className="font-display text-3xl font-bold mb-4">Precision Machined Components</h2>
          <p className="text-surface-variant max-w-xl">Every nut, bolt, and filter is engineered to the same exacting standards as our primary vacuum systems.</p>
        </div>
        <div className="flex gap-6 overflow-x-auto px-gutter pb-12 hide-scrollbar snap-x">
          {REPLACEMENT_PARTS.map(part => (
            <div key={part.id} className="min-w-[300px] snap-start bg-white/5 p-6 border border-white/10 rounded-sm group hover:border-white/30 transition-all">
              <div className="aspect-square mb-6 overflow-hidden bg-white/10 rounded-sm">
                <img src={part.image} alt={part.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h4 className="font-display font-semibold text-lg mb-1">{part.name}</h4>
                  <p className="text-xs text-surface-variant uppercase tracking-widest font-mono">Compatible: {part.tags[0]}</p>
                </div>
                <span className="font-display font-bold text-lg text-primary">${part.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}

function PartsView() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const categories = ['All', 'Filters & Seals', 'Rotary Brushes', 'Drive Systems', 'Power Cells'];

  const filteredParts = activeCategory === 'All' 
    ? REPLACEMENT_PARTS 
    : REPLACEMENT_PARTS.filter(p => p.category === activeCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-24"
    >
      <div className="max-w-container-max mx-auto px-gutter">
        {/* Banner */}
        <div className="relative rounded-sm overflow-hidden h-64 mb-16 bg-on-background">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4wYGxNFG98oBmM5yKZTvLPNzpSuz0cTqBEX9COghXgzZGsn0irRWZ9Tk9_cceihU3A02s82g_aYQnCu1aQI5a2mLiKmlxqEfllnc7V86DFwnLvPBvYnFuD1Ei1qLEdIAT2aVQ2J3ooMGHwf_T9bdVS0ilfEZVZPjelthETLYNw0COmJlheS5nkVzzI9Tgwp2V60eWLU-qHg_Qa4qrREhl3f0wDAVFUzyQcLY4Y08lfxT5NZjzhIjvwf2eTsF9y-HKdo-rURKCiMgm" 
            alt="Parts Banner" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center p-12">
            <div className="max-w-lg">
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary font-bold mb-2">AeroPrecision Genuine Parts</p>
              <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Precision Engineered Replacement Parts</h1>
              <p className="text-surface-variant text-sm md:text-base leading-relaxed">
                Maintain absolute peak performance and system longevity with factory-certified components.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Filters Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-10">
              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary mb-6 border-b border-outline-variant pb-2">Categories</h3>
                <div className="flex flex-col gap-2">
                  {categories.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`text-left text-sm py-2 px-3 rounded-sm transition-all flex justify-between items-center ${activeCategory === cat ? 'bg-primary text-white font-semibold' : 'text-secondary hover:bg-surface-container-low'}`}
                    >
                      {cat}
                      <ChevronRight className={`w-3 h-3 transition-transform ${activeCategory === cat ? 'translate-x-1' : 'opacity-0'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-secondary mb-6 border-b border-outline-variant pb-2">Device Compatibility</h3>
                <div className="space-y-3">
                  {['AeroStream Pro X1', 'AeroStream Standard', 'Core V3 Series'].map(device => (
                    <label key={device} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 border border-outline rounded-sm group-hover:border-primary transition-colors flex items-center justify-center">
                        <CheckCircle2 className="w-3 h-3 text-primary opacity-0 group-hover:opacity-20 translate-y-0 transition-opacity" />
                      </div>
                      <span className="text-sm text-secondary group-hover:text-on-surface transition-colors">{device}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-surface-container-low rounded-sm">
                <p className="text-xs text-secondary leading-relaxed font-mono">
                  All components listed are factory-certified for 100% compatibility with specified models.
                </p>
              </div>
            </div>
          </aside>

          {/* Grid */}
          <div className="flex-grow">
            <div className="flex justify-between items-center mb-10">
              <p className="text-sm text-secondary"><span className="font-bold text-on-surface">{filteredParts.length}</span> individual components found</p>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-secondary">
                Sort by: <span className="text-on-surface font-bold cursor-pointer">Relevance</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-16 gap-x-8">
              {filteredParts.map(part => (
                <ProductCard key={part.id} product={part} type="part" />
              ))}
            </div>

            {/* Compatibility Table */}
            <div className="mt-32 border-t border-outline-variant pt-20">
              <h2 className="font-display text-3xl font-bold mb-4">Technical Compatibility Grid</h2>
              <p className="text-secondary mb-12">Consolidated compatibility data for mission-critical hardware ecosystems.</p>
              <div className="overflow-x-auto border border-outline-variant rounded-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-outline bg-surface-container-low">
                      <th className="p-6 font-mono text-[10px] uppercase tracking-widest">Component Type</th>
                      <th className="p-6 font-mono text-[10px] uppercase tracking-widest">Pro-Series X1</th>
                      <th className="p-6 font-mono text-[10px] uppercase tracking-widest">Stream Standard</th>
                      <th className="p-6 font-mono text-[10px] uppercase tracking-widest text-right">Core V3</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-outline-variant">
                    {[
                      { name: 'HEPA-H13 Filters', pro: true, stream: true, core: false },
                      { name: 'Carbon Brush Bars', pro: true, stream: false, core: false },
                      { name: 'Extended Power Cells', pro: true, stream: true, core: true },
                      { name: 'Micro-Drive Belts', pro: false, stream: true, core: true },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-surface-container-low/30 transition-colors">
                        <td className="p-6 font-display font-semibold">{row.name}</td>
                        <td className="p-6">{row.pro ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <XCircle className="w-5 h-5 text-outline" />}</td>
                        <td className="p-6">{row.stream ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <XCircle className="w-5 h-5 text-outline" />}</td>
                        <td className="p-6 text-right flex justify-end">{row.core ? <CheckCircle2 className="w-5 h-5 text-primary" /> : <XCircle className="w-5 h-5 text-outline" />}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-outline-variant pt-24 pb-12">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
          <div className="md:col-span-4 space-y-6">
            <div className="font-display font-bold text-2xl tracking-tight">AeroPrecision</div>
            <p className="text-secondary leading-relaxed max-w-xs">
              The global standard in precision floor care engineering. Delivering reliability through technical excellence and absolute component accuracy.
            </p>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface font-bold">Catalog</h4>
            <ul className="space-y-4">
              {['Vacuums', 'Replacement Parts', 'Maintenance Kits', 'AeroCare+'].map(item => (
                <li key={item}><a href="#" className="text-sm text-secondary hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2 space-y-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface font-bold">Service</h4>
            <ul className="space-y-4">
              {['Warranty Terms', 'Service Centers', 'Technical Docs', 'Parts Warranty'].map(item => (
                <li key={item}><a href="#" className="text-sm text-secondary hover:text-primary transition-colors">{item}</a></li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-4 space-y-6">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-on-surface font-bold">Never Miss a Service Interval</h4>
            <p className="text-sm text-secondary">Sign up for automated component health alerts and precision hardware updates.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-surface-container-low border border-outline-variant px-4 py-3 text-sm focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all flex-grow rounded-sm"
              />
              <button className="bg-primary text-white p-3 rounded-sm hover:bg-primary/90 transition-all">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-center border-t border-outline-variant pt-12 gap-6">
          <p className="text-xs text-secondary font-mono tracking-widest">© 2024 AeroPrecision Engineering. All rights reserved.</p>
          <div className="flex gap-8">
            <a href="#" className="text-xs text-secondary hover:text-primary transition-colors font-mono tracking-widest">Privacy Policy</a>
            <a href="#" className="text-xs text-secondary hover:text-primary transition-colors font-mono tracking-widest">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  return (
    <div className="flex flex-col min-h-screen">
      <Nav activeView={view} onViewChange={setView} />
      
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          {view === 'home' ? <HomeView key="home" /> : <PartsView key="parts" />}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

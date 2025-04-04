import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { ArrowRightIcon, CheckCircleIcon, InformationCircleIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { customBuildImages } from '../config/images';

const components = {
  cpu: {
    name: 'CPU',
    description: 'The brain of your PC that handles all instructions and calculations',
    position: { top: '30%', left: '50%' },
    options: [
      { id: 'cpu-1', name: 'Intel Core i9-13900K', price: 119998, specs: ['24 cores', '5.8GHz Max Turbo', 'DDR5 Support'] },
      { id: 'cpu-2', name: 'AMD Ryzen 9 7950X', price: 139998, specs: ['16 cores', '5.7GHz Max Boost', 'AM5 Socket'] },
      { id: 'cpu-3', name: 'Intel Core i7-13700K', price: 89998, specs: ['16 cores', '5.4GHz Max Turbo', 'DDR5 Support'] },
      { id: 'cpu-4', name: 'AMD Ryzen 7 7700X', price: 79998, specs: ['8 cores', '5.4GHz Max Boost', 'AM5 Socket'] },
    ],
  },
  motherboard: {
    name: 'Motherboard',
    description: 'The foundation that connects all components together',
    position: { top: '40%', left: '50%' },
    options: [
      { id: 'mb-1', name: 'ASUS ROG Maximus Z790', price: 119998, specs: ['Intel Z790', 'DDR5', 'PCIe 5.0'] },
      { id: 'mb-2', name: 'MSI MEG X670E ACE', price: 139998, specs: ['AMD X670E', 'DDR5', 'PCIe 5.0'] },
      { id: 'mb-3', name: 'GIGABYTE Z790 AORUS', price: 79998, specs: ['Intel Z790', 'DDR5', 'PCIe 5.0'] },
      { id: 'mb-4', name: 'ASRock X670E Steel', price: 89998, specs: ['AMD X670E', 'DDR5', 'PCIe 5.0'] },
    ],
  },
  gpu: {
    name: 'Graphics Card',
    description: 'Powers visual processing for gaming and graphics-intensive tasks',
    position: { top: '60%', left: '40%' },
    options: [
      { id: 'gpu-1', name: 'NVIDIA RTX 4090', price: 319998, specs: ['24GB GDDR6X', '2.52GHz Boost', 'PCIe 4.0'] },
      { id: 'gpu-2', name: 'AMD RX 7900 XTX', price: 199998, specs: ['24GB GDDR6', '2.5GHz Game Clock', 'PCIe 4.0'] },
      { id: 'gpu-3', name: 'NVIDIA RTX 4080', price: 239998, specs: ['16GB GDDR6X', '2.51GHz Boost', 'PCIe 4.0'] },
      { id: 'gpu-4', name: 'AMD RX 7900 XT', price: 179998, specs: ['20GB GDDR6', '2.4GHz Game Clock', 'PCIe 4.0'] },
    ],
  },
  ram: {
    name: 'Memory (RAM)',
    description: 'Temporary storage for quick data access during operations',
    position: { top: '30%', left: '70%' },
    options: [
      { id: 'ram-1', name: 'G.SKILL Trident Z5 RGB 32GB', price: 39998, specs: ['DDR5-6400', 'CL32', '2x16GB'] },
      { id: 'ram-2', name: 'Corsair Dominator 32GB', price: 45998, specs: ['DDR5-6200', 'CL36', '2x16GB'] },
      { id: 'ram-3', name: 'Crucial 32GB', price: 29998, specs: ['DDR5-5600', 'CL40', '2x16GB'] },
      { id: 'ram-4', name: 'Kingston Fury 32GB', price: 35998, specs: ['DDR5-6000', 'CL36', '2x16GB'] },
    ],
  },
  storage: {
    name: 'Storage',
    description: 'Persistent data storage for your operating system, files, and games',
    position: { top: '55%', left: '70%' },
    options: [
      { id: 'storage-1', name: 'Samsung 990 PRO 2TB', price: 39998, specs: ['NVMe PCIe 4.0', '7450MB/s Read', '6900MB/s Write'] },
      { id: 'storage-2', name: 'WD Black SN850X 2TB', price: 37998, specs: ['NVMe PCIe 4.0', '7300MB/s Read', '6600MB/s Write'] },
      { id: 'storage-3', name: 'Crucial P5 Plus 2TB', price: 33998, specs: ['NVMe PCIe 4.0', '6600MB/s Read', '5000MB/s Write'] },
      { id: 'storage-4', name: 'Seagate FireCuda 530 2TB', price: 41998, specs: ['NVMe PCIe 4.0', '7300MB/s Read', '6900MB/s Write'] },
    ],
  },
  psu: {
    name: 'Power Supply',
    description: 'Supplies and regulates power to all components in your system',
    position: { top: '80%', left: '30%' },
    options: [
      { id: 'psu-1', name: 'Corsair HX1200i', price: 59998, specs: ['1200W', '80+ Platinum', 'Fully Modular'] },
      { id: 'psu-2', name: 'EVGA SuperNOVA 1000 G6', price: 39998, specs: ['1000W', '80+ Gold', 'Fully Modular'] },
      { id: 'psu-3', name: 'be quiet! Dark Power 12', price: 49998, specs: ['1000W', '80+ Titanium', 'Fully Modular'] },
      { id: 'psu-4', name: 'Seasonic PRIME TX-1000', price: 55998, specs: ['1000W', '80+ Titanium', 'Fully Modular'] },
    ],
  },
  case: {
    name: 'Case',
    description: 'Houses and protects all your components while managing airflow',
    position: { top: '50%', left: '10%' },
    options: [
      { id: 'case-1', name: 'Lian Li O11 Dynamic EVO', price: 33998, specs: ['Mid Tower', 'Tempered Glass', 'E-ATX Support'] },
      { id: 'case-2', name: 'Fractal Design Torrent', price: 37998, specs: ['Mid Tower', 'High Airflow', 'E-ATX Support'] },
      { id: 'case-3', name: 'Phanteks Eclipse P500A', price: 29998, specs: ['Mid Tower', 'Mesh Front', 'E-ATX Support'] },
      { id: 'case-4', name: 'Corsair 5000D Airflow', price: 34998, specs: ['Mid Tower', 'High Airflow', 'E-ATX Support'] },
    ],
  },
};

// PC visualization SVG components
const PCVisualization = ({ selectedCategory, selectedComponents }) => {
  const [customBackgroundImage, setCustomBackgroundImage] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [backgroundUrl, setBackgroundUrl] = useState('');
  
  const isComplete = Object.keys(components).every(category => selectedComponents[category]);
  
  const handleBackgroundChange = () => {
    if (backgroundUrl.trim()) {
      setCustomBackgroundImage(backgroundUrl);
    }
  };

  const backgroundStyle = customBackgroundImage 
    ? { backgroundImage: `url(${customBackgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } 
    : {};
  
  return (
    <div>
      {/* Image URL input */}
      <div className="mb-4 bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">PC Background</h3>
          <button 
            onClick={() => setShowImageInput(!showImageInput)}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
          >
            {showImageInput ? 'Hide' : 'Change Background'}
          </button>
        </div>
        
        {showImageInput && (
          <div className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={backgroundUrl}
              onChange={(e) => setBackgroundUrl(e.target.value)}
              placeholder="Enter background image URL"
              className="flex-1 border border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-md px-3 py-1 text-sm"
            />
            <button
              onClick={handleBackgroundChange}
              className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700 transition text-sm"
            >
              Apply
            </button>
          </div>
        )}
      </div>
      
      <div className="relative w-full h-[500px] bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl overflow-hidden perspective-1000 shadow-2xl" style={backgroundStyle}>
        {/* 3D floating PC */}
        <motion.div 
          className="absolute inset-0 h-full w-full"
          animate={{ 
            rotateX: [0, 2, 0, -2, 0],
            rotateY: [0, 3, 0, -3, 0],
            y: [0, -5, 0, 5, 0]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6,
            ease: "easeInOut"
          }}
        >
          <svg viewBox="0 0 500 500" className="absolute inset-0 h-full w-full drop-shadow-2xl">
            {/* PC Case with 3D effect */}
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="5" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="caseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#333" />
                <stop offset="100%" stopColor="#111" />
              </linearGradient>
              <linearGradient id="selectedGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4299e1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#3182ce" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {/* Main case with 3D perspective */}
            <g transform="translate(10, 10)">
              {/* Main case with shadow */}
              <rect 
                x="50" y="50" width="400" height="400" rx="20" 
                fill="url(#caseGradient)" 
                stroke={selectedCategory === 'case' ? "#4299e1" : "#444"} 
                strokeWidth="3"
                filter="drop-shadow(0px 15px 10px rgba(0,0,0,0.4))"
              />
              
              {/* Glass side panel */}
              <rect 
                x="55" y="55" width="390" height="390" rx="15" 
                fill="rgba(30, 41, 59, 0.4)" 
                stroke={selectedComponents.case ? "rgba(255,255,255,0.2)" : "rgba(100,100,100,0.2)"} 
                strokeWidth="1"
                opacity="0.7"
              />
              
              {/* Motherboard with 3D effect */}
              <motion.rect 
                x="100" 
                y="100" 
                width="300" 
                height="300" 
                rx="5" 
                fill={selectedComponents.motherboard ? "#384d6a" : "#2c3e50"}
                stroke={selectedCategory === 'motherboard' ? "#60a5fa" : "#1e293b"}
                strokeWidth="2"
                animate={{ 
                  fill: selectedCategory === 'motherboard' 
                    ? [selectedComponents.motherboard ? "#384d6a" : "#2c3e50", selectedComponents.motherboard ? "#4a69bd" : "#3c6382", selectedComponents.motherboard ? "#384d6a" : "#2c3e50"] 
                    : selectedComponents.motherboard ? "#384d6a" : "#2c3e50"
                }}
                transition={{ repeat: Infinity, duration: 2 }}
                filter={selectedCategory === 'motherboard' ? "url(#glow)" : ""}
              />
              
              {/* CPU with glow effect */}
              <motion.g 
                animate={{ 
                  y: selectedCategory === 'cpu' ? [0, -2, 0, -2, 0] : 0 
                }}
                transition={{ repeat: Infinity, duration: 1 }}
                filter={selectedCategory === 'cpu' ? "url(#glow)" : ""}
              >
                <rect 
                  x="200" 
                  y="150" 
                  width="80" 
                  height="80" 
                  rx="5" 
                  fill={selectedComponents.cpu ? "#6baed6" : "#4682b4"}
                  stroke={selectedCategory === 'cpu' ? "#93c5fd" : "#2563eb"}
                  strokeWidth="2" 
                />
                {selectedComponents.cpu && (
                  <rect 
                    x="210" 
                    y="160" 
                    width="60" 
                    height="60" 
                    rx="3" 
                    fill="#3b82f6" 
                    opacity="0.4"
                  />
                )}
              </motion.g>
              
              {/* GPU with 3D effect */}
              <motion.g
                animate={{ 
                  y: selectedCategory === 'gpu' ? [0, 2, 0, 2, 0] : 0 
                }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                filter={selectedCategory === 'gpu' ? "url(#glow)" : ""}
              >
                <rect 
                  x="150" 
                  y="250" 
                  width="200" 
                  height="40" 
                  rx="5" 
                  fill={selectedComponents.gpu ? "#ff7043" : "#e64a19"}
                  stroke={selectedCategory === 'gpu' ? "#f97316" : "#9a3412"}
                  strokeWidth="2" 
                />
                {/* GPU fans */}
                {selectedComponents.gpu && (
                  <>
                    <circle cx="190" cy="270" r="12" fill="#333" stroke="#555" strokeWidth="1" />
                    <circle cx="230" cy="270" r="12" fill="#333" stroke="#555" strokeWidth="1" />
                    <circle cx="270" cy="270" r="12" fill="#333" stroke="#555" strokeWidth="1" />
                    
                    <motion.circle 
                      cx="190" cy="270" r="8" fill="#555" 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="230" cy="270" r="8" fill="#555" 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                    <motion.circle 
                      cx="270" cy="270" r="8" fill="#555" 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
                    />
                  </>
                )}
              </motion.g>
              
              {/* RAM Sticks with glow */}
              <motion.g
                animate={{ 
                  y: selectedCategory === 'ram' ? [0, -3, 0, -3, 0] : 0 
                }}
                transition={{ repeat: Infinity, duration: 1.2 }}
                filter={selectedCategory === 'ram' ? "url(#glow)" : ""}
              >
                <rect 
                  x="300" 
                  y="150" 
                  width="20" 
                  height="80" 
                  rx="2" 
                  fill={selectedComponents.ram ? "#81c784" : "#4caf50"}
                  stroke={selectedCategory === 'ram' ? "#22c55e" : "#16a34a"}
                  strokeWidth="2" 
                />
                
                <rect 
                  x="330" 
                  y="150" 
                  width="20" 
                  height="80" 
                  rx="2" 
                  fill={selectedComponents.ram ? "#81c784" : "#4caf50"}
                  stroke={selectedCategory === 'ram' ? "#22c55e" : "#16a34a"}
                  strokeWidth="2"
                />
                
                {/* RGB effect on RAM if selected */}
                {selectedComponents.ram && (
                  <>
                    <motion.rect 
                      x="300" y="152" width="20" height="10" 
                      animate={{ fill: ['#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      opacity="0.7"
                    />
                    <motion.rect 
                      x="330" y="152" width="20" height="10" 
                      animate={{ fill: ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'] }}
                      transition={{ repeat: Infinity, duration: 4 }}
                      opacity="0.7"
                    />
                  </>
                )}
              </motion.g>
              
              {/* Storage with glow */}
              <motion.g
                animate={{ 
                  x: selectedCategory === 'storage' ? [0, 2, 0, 2, 0] : 0 
                }}
                transition={{ repeat: Infinity, duration: 1.3 }}
                filter={selectedCategory === 'storage' ? "url(#glow)" : ""}
              >
                <rect 
                  x="300" 
                  y="250" 
                  width="60" 
                  height="30" 
                  rx="2" 
                  fill={selectedComponents.storage ? "#ba68c8" : "#9c27b0"}
                  stroke={selectedCategory === 'storage' ? "#d946ef" : "#a21caf"}
                  strokeWidth="2"
                />
                
                {/* SSD details */}
                {selectedComponents.storage && (
                  <rect 
                    x="305" y="255" width="50" height="20" rx="1" 
                    fill="#7e22ce" opacity="0.5" 
                  />
                )}
              </motion.g>
              
              {/* PSU with glow */}
              <motion.g
                animate={{ 
                  x: selectedCategory === 'psu' ? [0, -2, 0, -2, 0] : 0 
                }}
                transition={{ repeat: Infinity, duration: 1.4 }}
                filter={selectedCategory === 'psu' ? "url(#glow)" : ""}
              >
                <rect 
                  x="100" 
                  y="350" 
                  width="100" 
                  height="50" 
                  rx="5" 
                  fill={selectedComponents.psu ? "#ffd54f" : "#ffc107"}
                  stroke={selectedCategory === 'psu' ? "#facc15" : "#ca8a04"}
                  strokeWidth="2"
                />
                
                {/* PSU fan */}
                {selectedComponents.psu && (
                  <>
                    <circle cx="140" cy="375" r="15" fill="#333" stroke="#555" strokeWidth="1" />
                    <motion.circle 
                      cx="140" cy="375" r="10" fill="#555" 
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    />
                  </>
                )}
              </motion.g>
              
              {/* Front RGB lighting */}
              {Object.keys(selectedComponents).length > 0 && (
                <motion.rect 
                  x="55" y="100" width="5" height="300" 
                  animate={{ 
                    fill: ['#3b82f6', '#8b5cf6', '#ec4899', '#ef4444', '#f59e0b', '#84cc16', '#10b981', '#3b82f6']
                  }}
                  transition={{ repeat: Infinity, duration: 10 }}
                  opacity="0.7"
                />
              )}
              
              {/* Case highlight when selected */}
              <AnimatePresence>
                {selectedCategory === 'case' && (
                  <motion.rect 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    x="50" 
                    y="50" 
                    width="400" 
                    height="400" 
                    rx="20" 
                    fill="url(#selectedGlow)" 
                    stroke={selectedComponents.case ? "#60a5fa" : "#3b82f6"} 
                    strokeWidth="4"
                    strokeDasharray="10"
                  />
                )}
              </AnimatePresence>
            </g>
          </svg>
        </motion.div>
        
        {/* Component labels with hover effect */}
        {Object.entries(components).map(([key, component]) => (
          <motion.div 
            key={key}
            className={`absolute z-10 transform -translate-x-1/2 -translate-y-1/2 ${
              selectedCategory === key ? 'text-white font-bold' : 'text-gray-300'
            }`}
            style={{
              top: component.position.top,
              left: component.position.left,
            }}
            whileHover={{ scale: 1.2 }}
            animate={selectedCategory === key ? { scale: [1, 1.2, 1], opacity: [0.8, 1, 0.8] } : {}}
            transition={selectedCategory === key ? { repeat: Infinity, duration: 2 } : {}}
          >
            <div className={`p-2 rounded-full ${
              selectedCategory === key 
                ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                : 'bg-gray-700'
            }`}>
              <span className="text-xs whitespace-nowrap px-1">{component.name}</span>
            </div>
          </motion.div>
        ))}
        
        {/* Selected component info */}
        {selectedCategory && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-4 left-0 right-0 mx-auto w-4/5 bg-gray-800 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg text-white text-center border border-gray-700 shadow-lg"
          >
            <h3 className="text-lg font-bold">{components[selectedCategory].name}</h3>
            <p className="text-sm text-gray-300">{components[selectedCategory].description}</p>
            {selectedComponents[selectedCategory] && (
              <p className="text-sm font-semibold mt-2 text-blue-300">
                Selected: {selectedComponents[selectedCategory].name}
              </p>
            )}
          </motion.div>
        )}
        
        {/* Add a glowing effect around the entire PC when complete */}
        {isComplete && (
          <motion.div 
            className="absolute inset-0 rounded-xl"
            animate={{ 
              boxShadow: [
                '0 0 10px rgba(59, 130, 246, 0.5)', 
                '0 0 20px rgba(59, 130, 246, 0.7)', 
                '0 0 10px rgba(59, 130, 246, 0.5)'
              ]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        )}
      </div>
    </div>
  );
};

export default function CustomBuild() {
  const [selectedComponents, setSelectedComponents] = useState({});
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [buildProgress, setBuildProgress] = useState(0);
  const { addToCart } = useCart();
  const { requireAuth, isAuthenticated } = useAuth();
  const [addedToCart, setAddedToCart] = useState(false);

  const handleComponentSelect = (category, component) => {
    setSelectedComponents(prev => ({
      ...prev,
      [category]: component
    }));
  };

  useEffect(() => {
    // Calculate build progress
    const totalComponents = Object.keys(components).length;
    const selectedCount = Object.keys(selectedComponents).length;
    setBuildProgress((selectedCount / totalComponents) * 100);
  }, [selectedComponents]);

  const calculateTotal = () => {
    return Object.values(selectedComponents).reduce((total, component) => total + component.price, 0);
  };

  const handleAddToCart = () => {
    if (!isComplete) return;
    
    requireAuth(() => {
      const buildName = 'Custom Build';
      const specs = Object.entries(selectedComponents).map(([category, component]) => `${components[category].name}: ${component.name}`).join(', ');
      
      try {
        addToCart({
          id: 'custom-build-' + Date.now(),
          name: buildName,
          price: calculateTotal(),
          image: customBuildImages.pcBuild,
          specs: specs,
          quantity: 1,
          type: 'custom_build'
        });
        
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000); // Reset after 3 seconds
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    });
  };

  const isComplete = Object.keys(components).every(category => selectedComponents[category]);

  return (
    <div className="bg-white dark:bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Build Your Dream PC
            </h1>
            <p className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400">
              Customize every component to create the perfect system tailored to your needs
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 mb-10">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${buildProgress}%` }}
              transition={{ duration: 0.5 }}
              className="h-4 rounded-full bg-blue-600 dark:bg-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* PC Visualization */}
            <div className="lg:order-2">
              <div className="sticky top-10">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">PC Visualization</h2>
                <PCVisualization 
                  selectedCategory={selectedCategory} 
                  selectedComponents={selectedComponents} 
                />
                
                <div className="mt-10 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Build Summary</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {isComplete ? 'Your build is complete!' : `${Object.keys(selectedComponents).length} of ${Object.keys(components).length} components selected`}
                      </p>
                    </div>
                    <div className="text-3xl font-bold text-gray-900 dark:text-white">
                      Rs. {(calculateTotal() / 100).toFixed(2)}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddToCart}
                    disabled={!isComplete}
                    className={`mt-8 flex w-full items-center justify-center rounded-md border border-transparent px-8 py-4 text-base font-medium text-white transition-all ${
                      isComplete
                        ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {addedToCart ? (
                      <>
                        <CheckCircleIcon className="mr-2 h-5 w-5" />
                        Added to Cart!
                      </>
                    ) : (
                      <>
                        <ShoppingCartIcon className="mr-2 h-5 w-5" />
                        {isComplete ? "Add to Cart" : "Complete Your Build"}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Component Selection */}
            <div className="lg:order-1">
              <div className="space-y-10">
                {Object.entries(components).map(([category, { name, description, options }]) => (
                  <motion.div 
                    key={category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`border rounded-lg p-6 ${selectedCategory === category ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 flex items-center">
                          {name}
                          {selectedComponents[category] && (
                            <CheckCircleIcon className="ml-2 h-5 w-5 text-green-500" />
                          )}
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">{description}</p>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          {selectedComponents[category] ? 'Selected' : 'Choose'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {options.map((component) => (
                        <motion.div
                          key={component.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`relative flex flex-col rounded-lg border p-4 cursor-pointer transition-all ${
                            selectedComponents[category]?.id === component.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-300 hover:shadow'
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleComponentSelect(category, component);
                          }}
                        >
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-gray-900">{component.name}</h4>
                            <p className="mt-1 text-sm font-semibold text-blue-600">Rs. {component.price.toFixed(2)}</p>
                            <ul className="mt-2 space-y-1">
                              {component.specs.map((spec, index) => (
                                <li key={index} className="text-xs text-gray-500 flex items-center">
                                  <span className="h-1 w-1 rounded-full bg-gray-400 mr-2"></span>
                                  {spec}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {selectedComponents[category]?.id === component.id && (
                            <div className="absolute top-2 right-2">
                              <CheckCircleIcon className="h-5 w-5 text-blue-500" />
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
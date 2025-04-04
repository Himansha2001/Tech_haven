import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ComputerDesktopIcon, 
  CpuChipIcon, 
  WrenchScrewdriverIcon, 
  ShoppingCartIcon,
  ArrowRightIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { homeImages, productImages, placeholderImage } from '../config/images';

// Initial data
const initialCategories = [
  {
    name: 'PC Parts',
    description: 'High-quality components for your custom build',
    href: '/parts',
    icon: CpuChipIcon,
    image: homeImages.category1,
  },
  {
    name: 'Custom PCs',
    description: 'Pre-configured systems for every need',
    href: '/custom-pc',
    icon: ComputerDesktopIcon,
    image: 'https://www.digitalstorm.com/img/desktop-gaming-pcs.webp',
  },
  {
    name: 'Build Your Own',
    description: 'Create your perfect PC with our builder tool',
    href: '/custom-build',
    icon: WrenchScrewdriverIcon,
    image: 'https://www.corsair.com/pc-builder/WYSIWYG/welcome_2023.webp',
  },
];

// Initial products
const initialProducts = [
  {
    id: 'prod-1',
    name: 'NVIDIA RTX 4080',
    category: 'Graphics Card',
    price: 239998,
    image: productImages.gpu1,
  },
  {
    id: 'prod-2',
    name: 'Intel Core i9-13900K',
    category: 'Processor',
    price: 119998,
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTyHwptND2gsfvzNWxNzqL7izjkG1AE6DIsg&s',
  },
  {
    id: 'prod-3',
    name: 'G.SKILL Trident Z5 RGB 32GB',
    category: 'Memory',
    price: 39998,
    image: 'https://techzone.lk/wp-content/uploads/2022/02/G.SKILL-TRIDENT-Z-DDR5-5600MHZ-16GB-KIT.gif',
  },
  {
    id: 'prod-4',
    name: 'Samsung 990 PRO 2TB',
    category: 'Storage',
    price: 39998,
    image: 'https://www.gamestreet.lk/images/products/6234.jpg',
  },
];

export default function Home() {
  const [categories, setCategories] = useState(initialCategories);
  const [products, setProducts] = useState(initialProducts);
  const [categoryImageUrls, setCategoryImageUrls] = useState({});
  const [productImageUrls, setProductImageUrls] = useState({});
  const [showImageControls, setShowImageControls] = useState(false);

  // Handle category image URL change
  const handleCategoryImageChange = (index, url) => {
    setCategoryImageUrls(prev => ({
      ...prev,
      [index]: url
    }));
  };

  // Apply category image URL
  const applyCategoryImage = (index) => {
    if (categoryImageUrls[index]?.trim()) {
      setCategories(prev => {
        const newCategories = [...prev];
        newCategories[index] = {
          ...newCategories[index],
          image: categoryImageUrls[index]
        };
        return newCategories;
      });
    }
  };

  // Handle product image URL change
  const handleProductImageChange = (id, url) => {
    setProductImageUrls(prev => ({
      ...prev,
      [id]: url
    }));
  };

  // Apply product image URL
  const applyProductImage = (id) => {
    if (productImageUrls[id]?.trim()) {
      setProducts(prev => 
        prev.map(product => 
          product.id === id 
            ? { ...product, image: productImageUrls[id] } 
            : product
        )
      );
    }
  };

  return (
    <>
      {/* Admin panel for image management */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setShowImageControls(!showImageControls)}
          className="bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        >
          {showImageControls ? 'Hide Image Controls' : 'Manage Images'}
        </button>
      </div>

      {showImageControls && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Image URL Management</h2>
              <button
                onClick={() => setShowImageControls(false)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Category Images */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Category Images</h3>
              <div className="space-y-4">
                {categories.map((category, index) => (
                  <div key={index} className="flex flex-col sm:flex-row gap-4 border-b pb-4 dark:border-gray-700">
                    <div className="sm:w-32 flex-shrink-0">
                      <img 
                        src={category.image} 
                        alt={category.name} 
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">{category.name}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={categoryImageUrls[index] || ''}
                          onChange={(e) => handleCategoryImageChange(index, e.target.value)}
                          placeholder="Enter image URL"
                          className="flex-1 border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                          onClick={() => applyCategoryImage(index)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Images */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Product Images</h3>
              <div className="space-y-4">
                {products.map((product) => (
                  <div key={product.id} className="flex flex-col sm:flex-row gap-4 border-b pb-4 dark:border-gray-700">
                    <div className="sm:w-32 flex-shrink-0">
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white mb-2">{product.name}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          type="text"
                          value={productImageUrls[product.id] || ''}
                          onChange={(e) => handleProductImageChange(product.id, e.target.value)}
                          placeholder="Enter image URL"
                          className="flex-1 border rounded-md px-3 py-2 text-sm dark:bg-gray-700 dark:border-gray-600"
                        />
                        <button
                          onClick={() => applyProductImage(product.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hero section */}
      <div className="relative pt-16">
        {/* Background gradient */}
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden sm:-top-80 blur-3xl" aria-hidden="true">
          <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-600 to-purple-600 opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
        </div>
        
        {/* Main hero content */}
        <div className="relative px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <motion.div 
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                Building Your <span className="text-blue-600 dark:text-blue-400">Perfect PC</span> Just Got Easier
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                From high-end gaming rigs to professional workstations, we provide all the components you need to build your dream PC.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  to="/custom-build"
                  className="rounded-md bg-blue-600 dark:bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 dark:hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
                >
                  Start Building Now
                </Link>
                <Link to="/parts" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white group">
                  Browse PC Parts <ArrowRightIcon className="inline-block h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Hero image */}
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mb-16">
          <motion.div 
            className="overflow-hidden rounded-xl shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src={homeImages.hero}
              alt="High-end gaming computer setup"
              className="w-full object-cover h-64 sm:h-96 lg:h-[32rem]"
            />
          </motion.div>
        </div>
      </div>

      {/* Categories section */}
      <div className="bg-gray-50 dark:bg-gray-800/50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-base font-semibold leading-7 text-blue-600 dark:text-blue-400"
            >
              Discover Our Range
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Everything You Need For Your Perfect Setup
            </motion.p>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative overflow-hidden rounded-lg shadow-lg group"
                >
                  <div className="absolute inset-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
                  </div>
                  <div className="relative flex flex-col h-full justify-end px-6 py-8 text-white">
                    <category.icon className="h-8 w-8 text-white mb-2" aria-hidden="true" />
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                    <p className="mt-2 text-gray-200">{category.description}</p>
                    <Link
                      to={category.href}
                      className="mt-6 inline-flex items-center text-sm font-medium text-white hover:text-blue-400 transition-colors"
                    >
                      Explore {category.name} <ArrowRightIcon className="ml-1 h-4 w-4" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured products section */}
      <div className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center text-base font-semibold leading-7 text-blue-600 dark:text-blue-400"
            >
              <SparklesIcon className="h-5 w-5 mr-2" /> Featured Products
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
            >
              Top Rated Components
            </motion.p>
          </div>
          <div className="mx-auto mt-12 max-w-7xl">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800"
                >
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-60 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-blue-600 dark:text-blue-400">{product.category}</p>
                    <h3 className="mt-1 text-lg font-medium text-gray-900 dark:text-white">{product.name}</h3>
                    <p className="mt-3 text-xl font-bold text-gray-900 dark:text-white">Rs. {(product.price / 100).toFixed(2)}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <Link
                        to={`/parts?category=${encodeURIComponent(product.category)}`}
                        className="text-sm font-medium text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View details
                      </Link>
                      <button className="flex items-center justify-center rounded-full bg-blue-600 p-2 text-white hover:bg-blue-700 transition-colors">
                        <ShoppingCartIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">Add to cart</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-blue-600 dark:bg-blue-700">
        <div className="mx-auto max-w-7xl py-16 px-6 sm:py-24 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Build Your Dream PC Today</h2>
              <p className="mt-3 max-w-3xl text-lg text-blue-100">
                Use our custom PC builder to create the perfect system tailored to your needs and budget. Our experts are ready to assist you every step of the way.
              </p>
              <div className="mt-8">
                <Link
                  to="/custom-build"
                  className="inline-flex rounded-md bg-white px-6 py-3 text-base font-medium text-blue-600 shadow-md hover:bg-gray-100 transition-colors"
                >
                  Start Your Build
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8 lg:mt-0"
            >
              <img
                src={homeImages.featured1}
                alt="Custom PC Build"
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
} 
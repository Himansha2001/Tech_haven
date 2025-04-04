import { useState, Fragment } from 'react';
import { Tab, Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useCart } from '../context/CartContext';

const pcConfigurations = [
  {
    id: 'custom-1',
    name: 'Performance Gaming PC',
    image: 'https://m.media-amazon.com/images/I/81nYBFluqkL.jpg',
    price: 299998,
    category: 'Gaming',
    specs: {
      cpu: { name: 'Intel i7-13700K', price: 89998 },
      gpu: { name: 'NVIDIA RTX 4070 Ti', price: 159998 },
      ram: { name: '32GB DDR5', price: 39998 },
      storage: { name: '1TB NVMe SSD', price: 29998 },
      features: ['1440p Gaming', 'RGB Lighting', 'Liquid Cooling']
    }
  },
  {
    id: 'custom-2',
    name: 'Ultimate Gaming PC',
    image: 'https://igamingcomputer.com.au/cdn/shop/products/ultimate-gaming-computer-ryzen-9-7900x-rtx-4090-aero-32gb-6000mhz-everest-i-gaming-computer-627216.jpg?v=1678438341',
    price: 499998,
    category: 'Gaming',
    specs: {
      cpu: { name: 'Intel i9-13900K', price: 119998 },
      gpu: { name: 'NVIDIA RTX 4090', price: 319998 },
      ram: { name: '64GB DDR5', price: 79998 },
      storage: { name: '2TB NVMe SSD', price: 49998 },
      features: ['4K Gaming', 'RGB Lighting', 'Custom Water Cooling']
    }
  },
  {
    id: 'custom-3',
    name: 'Creator Workstation',
    image: 'https://nzxt.com/assets/cms/34299/1695875782-workstation-ww-09-08-23-hero-white-badge.png?ar64=MTox&auto=format&fit=crop&h=400&w=400',
    price: 399998,
    category: 'Workstation',
    specs: {
      cpu: { name: 'AMD Ryzen 9 7950X', price: 139998 },
      gpu: { name: 'NVIDIA RTX 4080', price: 239998 },
      ram: { name: '64GB DDR5', price: 79998 },
      storage: { name: '4TB NVMe SSD', price: 99998 },
      features: ['Content Creation', 'Video Editing', 'Multiple Displays']
    }
  }
];

const prebuiltPCs = [
  {
    id: 'prebuilt-1',
    name: 'Starter Gaming PC',
    image: 'https://i0.wp.com/usedcomputers.lk/wp-content/uploads/2024/12/gf-x455.png?fit=636%2C652&ssl=1',
    price: 199998,
    category: 'Gaming',
    specs: {
      cpu: { name: 'Intel i5-13600K', price: 63998 },
      gpu: { name: 'RTX 4060 Ti', price: 79998 },
      ram: { name: '16GB DDR5', price: 19998 },
      storage: { name: '1TB NVMe SSD', price: 19998 },
      features: ['1440p Gaming', 'RGB Lighting', 'Compact Design']
    }
  },
  {
    id: 'prebuilt-2',
    name: 'Pro Workstation',
    image: 'https://www.hp.com/content/dam/sites/worldwide/personal-computers/commercial/workstations/desktop-workstation-pc/new-image-update/z6-g5-a-desktop.jpg',
    price: 559998,
    category: 'Workstation',
    specs: {
      cpu: { name: 'AMD Ryzen 9 7900X', price: 109998 },
      gpu: { name: 'RTX 4080', price: 239998 },
      ram: { name: '64GB DDR5', price: 59998 },
      storage: { name: '2TB NVMe SSD', price: 39998 },
      features: ['CAD/CAM Ready', 'Professional Graphics', 'ECC Memory']
    }
  },
  {
    id: 'prebuilt-3',
    name: 'Budget Gaming PC',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-FxXg3u2vvUCKjQbLlIq9fFJsdncHIDymvQ&s',
    price: 159998,
    category: 'Gaming',
    specs: {
      cpu: { name: 'Intel i5-13400F', price: 43998 },
      gpu: { name: 'RTX 4060', price: 59998 },
      ram: { name: '16GB DDR5', price: 19998 },
      storage: { name: '500GB NVMe SSD', price: 13998 },
      features: ['1080p Gaming', 'RGB Lighting', 'Great Value']
    }
  }
];

const categories = ['All', 'Gaming', 'Workstation', 'Streaming'];
const priceRanges = [
  { label: 'All', range: [0, Infinity] },
  { label: 'Under Rs. 200,000', range: [0, 200000] },
  { label: 'Rs. 200,000 - Rs. 400,000', range: [200000, 400000] },
  { label: 'Rs. 400,000 - Rs. 600,000', range: [400000, 600000] },
  { label: 'Over Rs. 600,000', range: [600000, Infinity] }
];

const componentFilters = {
  cpu: [
    { label: 'All CPUs', range: [0, Infinity] },
    { label: 'Budget (Under Rs. 60,000)', range: [0, 60000] },
    { label: 'Mid-range (Rs. 60,000-Rs. 100,000)', range: [60000, 100000] },
    { label: 'High-end (Over Rs. 100,000)', range: [100000, Infinity] }
  ],
  gpu: [
    { label: 'All GPUs', range: [0, Infinity] },
    { label: 'Entry Level (Under Rs. 80,000)', range: [0, 80000] },
    { label: 'Mid-range (Rs. 80,000-Rs. 160,000)', range: [80000, 160000] },
    { label: 'High-end (Over Rs. 160,000)', range: [160000, Infinity] }
  ],
  ram: [
    { label: 'All RAM', range: [0, Infinity] },
    { label: 'Basic (Under Rs. 20,000)', range: [0, 20000] },
    { label: 'Performance (Rs. 20,000-Rs. 40,000)', range: [20000, 40000] },
    { label: 'High-capacity (Over Rs. 40,000)', range: [40000, Infinity] }
  ],
  storage: [
    { label: 'All Storage', range: [0, Infinity] },
    { label: 'Basic (Under Rs. 20,000)', range: [0, 20000] },
    { label: 'Performance (Rs. 20,000-Rs. 40,000)', range: [20000, 40000] },
    { label: 'High-capacity (Over Rs. 40,000)', range: [40000, Infinity] }
  ]
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function CustomPC() {
  const [selectedConfig, setSelectedConfig] = useState(pcConfigurations[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState(priceRanges[0]);
  const [componentPriceFilters, setComponentPriceFilters] = useState({
    cpu: componentFilters.cpu[0],
    gpu: componentFilters.gpu[0],
    ram: componentFilters.ram[0],
    storage: componentFilters.storage[0]
  });
  const { addToCart } = useCart();

  const handleAddToCart = (config) => {
    addToCart({
      id: config.id,
      name: config.name,
      price: config.price,
      image: config.image,
      specs: `${config.specs.cpu.name}, ${config.specs.gpu.name}, ${config.specs.ram.name}, ${config.specs.storage.name}`
    });
  };

  const filterPCs = (pcs) => {
    return pcs.filter(pc => {
      const categoryMatch = selectedCategory === 'All' || pc.category === selectedCategory;
      const priceMatch = pc.price >= selectedPriceRange.range[0] && pc.price <= selectedPriceRange.range[1];
      
      // Component price filtering
      const cpuMatch = pc.specs.cpu.price >= componentPriceFilters.cpu.range[0] && 
                      pc.specs.cpu.price <= componentPriceFilters.cpu.range[1];
      const gpuMatch = pc.specs.gpu.price >= componentPriceFilters.gpu.range[0] && 
                      pc.specs.gpu.price <= componentPriceFilters.gpu.range[1];
      const ramMatch = pc.specs.ram.price >= componentPriceFilters.ram.range[0] && 
                      pc.specs.ram.price <= componentPriceFilters.ram.range[1];
      const storageMatch = pc.specs.storage.price >= componentPriceFilters.storage.range[0] && 
                          pc.specs.storage.price <= componentPriceFilters.storage.range[1];

      return categoryMatch && priceMatch && cpuMatch && gpuMatch && ramMatch && storageMatch;
    });
  };

  const filteredCustomPCs = filterPCs(pcConfigurations);
  const filteredPrebuiltPCs = filterPCs(prebuiltPCs);

  const handleComponentFilterChange = (component, value) => {
    setComponentPriceFilters(prev => ({
      ...prev,
      [component]: componentFilters[component].find(filter => filter.label === value)
    }));
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedPriceRange(priceRanges[0]);
    setComponentPriceFilters({
      cpu: componentFilters.cpu[0],
      gpu: componentFilters.gpu[0],
      ram: componentFilters.ram[0],
      storage: componentFilters.storage[0]
    });
  };

  const activeFilters = [
    { type: 'Category', value: selectedCategory, clear: () => setSelectedCategory('All') },
    { type: 'Price', value: selectedPriceRange.label, clear: () => setSelectedPriceRange(priceRanges[0]) },
    ...Object.entries(componentPriceFilters).map(([key, value]) => ({
      type: key.toUpperCase(),
      value: value.label,
      clear: () => handleComponentFilterChange(key, componentFilters[key][0].label)
    }))
  ].filter(filter => filter.value !== 'All' && !filter.value.startsWith('All'));

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">PC Builds</h2>
            </div>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowFilters(true)}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <FunnelIcon className="h-5 w-5 mr-2" />
                Filters
              </button>
              <a
                href="/custom-build"
                className="flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
              >
                Build Your Own PC
              </a>
            </div>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="mt-4">
              <div className="flex items-center flex-wrap gap-2">
                {activeFilters.map((filter, index) => (
                  <span
                    key={`${filter.type}-${index}`}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                  >
                    {filter.type}: {filter.value}
                    <button
                      type="button"
                      onClick={filter.clear}
                      className="ml-1 inline-flex items-center p-0.5 rounded-full text-blue-800 hover:bg-blue-200 focus:outline-none"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </span>
                ))}
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              </div>
            </div>
          )}

          {/* Filter Slide-out Panel */}
          <Transition.Root show={showFilters} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setShowFilters}>
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-500"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-500"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                  <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                    <Transition.Child
                      as={Fragment}
                      enter="transform transition ease-in-out duration-500 sm:duration-700"
                      enterFrom="translate-x-full"
                      enterTo="translate-x-0"
                      leave="transform transition ease-in-out duration-500 sm:duration-700"
                      leaveFrom="translate-x-0"
                      leaveTo="translate-x-full"
                    >
                      <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                        <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                          <div className="px-4 py-6 sm:px-6">
                            <div className="flex items-start justify-between">
                              <Dialog.Title className="text-lg font-medium text-gray-900">
                                Filters
                              </Dialog.Title>
                              <div className="ml-3 flex h-7 items-center">
                                <button
                                  type="button"
                                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
                                  onClick={() => setShowFilters(false)}
                                >
                                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                              </div>
                            </div>
                          </div>

                          <div className="divide-y divide-gray-200 px-4 sm:px-6">
                            <div className="space-y-6 pb-6">
                              <div>
                                <h3 className="text-sm font-medium text-gray-900">Category</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {categories.map((category) => (
                                    <button
                                      key={category}
                                      onClick={() => setSelectedCategory(category)}
                                      className={classNames(
                                        'px-3 py-1.5 rounded-full text-sm font-medium',
                                        selectedCategory === category
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                      )}
                                    >
                                      {category}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <h3 className="text-sm font-medium text-gray-900">Price Range</h3>
                                <div className="mt-2 flex flex-wrap gap-2">
                                  {priceRanges.map((range) => (
                                    <button
                                      key={range.label}
                                      onClick={() => setSelectedPriceRange(range)}
                                      className={classNames(
                                        'px-3 py-1.5 rounded-full text-sm font-medium',
                                        selectedPriceRange.label === range.label
                                          ? 'bg-blue-600 text-white'
                                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                      )}
                                    >
                                      {range.label}
                                    </button>
                                  ))}
                                </div>
                              </div>

                              {Object.entries(componentFilters).map(([key, filters]) => (
                                <div key={key}>
                                  <h3 className="text-sm font-medium text-gray-900">{key.toUpperCase()} Price Range</h3>
                                  <div className="mt-2 flex flex-wrap gap-2">
                                    {filters.map((filter) => (
                                      <button
                                        key={filter.label}
                                        onClick={() => handleComponentFilterChange(key, filter.label)}
                                        className={classNames(
                                          'px-3 py-1.5 rounded-full text-sm font-medium',
                                          componentPriceFilters[key].label === filter.label
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                        )}
                                      >
                                        {filter.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Dialog.Panel>
                    </Transition.Child>
                  </div>
                </div>
              </div>
            </Dialog>
          </Transition.Root>

          <Tab.Group as="div" className="mt-12">
            <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                Custom Builds
              </Tab>
              <Tab
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-sm font-medium leading-5',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                    selected
                      ? 'bg-white text-blue-700 shadow'
                      : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                  )
                }
              >
                Prebuilt PCs
              </Tab>
            </Tab.List>

            <Tab.Panels className="mt-8">
              <Tab.Panel>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredCustomPCs.map((config) => (
                    <div key={config.id} className="group relative">
                      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={config.image}
                          alt={config.name}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">{config.name}</h3>
                        <p className="mt-2 text-2xl text-gray-900">Rs. {config.price.toFixed(2)}</p>
                        <dl className="mt-4 space-y-4">
                          {Object.entries(config.specs).map(([key, value]) => (
                            key !== 'features' && (
                              <div key={key}>
                                <dt className="text-sm font-medium text-gray-500">{key.toUpperCase()}</dt>
                                <dd className="mt-1 text-sm text-gray-900">{value.name}</dd>
                              </div>
                            )
                          ))}
                        </dl>
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(config)}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-8 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            <ShoppingCartIcon className="mr-2 h-5 w-5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
              <Tab.Panel>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                  {filteredPrebuiltPCs.map((config) => (
                    <div key={config.id} className="group relative">
                      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
                        <img
                          src={config.image}
                          alt={config.name}
                          className="object-cover object-center"
                        />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-lg font-medium text-gray-900">{config.name}</h3>
                        <p className="mt-2 text-2xl text-gray-900">Rs. {config.price.toFixed(2)}</p>
                        <dl className="mt-4 space-y-4">
                          {Object.entries(config.specs).map(([key, value]) => (
                            key !== 'features' && (
                              <div key={key}>
                                <dt className="text-sm font-medium text-gray-500">{key.toUpperCase()}</dt>
                                <dd className="mt-1 text-sm text-gray-900">{value.name}</dd>
                              </div>
                            )
                          ))}
                        </dl>
                        <div className="mt-6">
                          <button
                            type="button"
                            onClick={() => handleAddToCart(config)}
                            className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 py-2 px-8 text-sm font-medium text-white hover:bg-blue-700"
                          >
                            <ShoppingCartIcon className="mr-2 h-5 w-5" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </div>
  );
} 
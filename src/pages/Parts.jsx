import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingCartIcon, FunnelIcon, XMarkIcon } from '@heroicons/react/24/outline';

const partsCategories = [
  {
    name: 'CPUs',
    items: [
      { id: 'cpu-1', name: 'Intel Core i9-13900K', price: 599.99, image: 'https://sltechie.lk/wp-content/uploads/2022/10/en-box-t4-i9k-13th-left-transparent_4000pixels.png', brand: 'Intel', specs: '24 cores, 5.8GHz Max Turbo' },
      { id: 'cpu-2', name: 'AMD Ryzen 9 7950X', price: 699.99, image: 'https://i0.wp.com/www.redlinetech.lk/wp-content/uploads/2024/07/AMD-Ryzen-9-7950X3D-Processor-sri-lanka-1.webp', brand: 'AMD', specs: '16 cores, 5.7GHz Max Boost' },
      { id: 'cpu-3', name: 'Intel Core i7-13700K', price: 449.99, image: 'https://www.barclays.lk/mmBC/Images/CPUI6678.jpg', brand: 'Intel', specs: '16 cores, 5.4GHz Max Turbo' },
      { id: 'cpu-4', name: 'AMD Ryzen 7 7700X', price: 399.99, image: 'https://mdcomputers.lk/wp-content/uploads/2023/01/1839-20221006124741-1536834-amd-ryzen-7-7000-series-PIB-angle-1260x709-1.png', brand: 'AMD', specs: '8 cores, 5.4GHz Max Boost' },
    ]
  },
  {
    name: 'GPUs',
    items: [
      { id: 'gpu-1', name: 'NVIDIA RTX 4090', price: 1599.99, image: 'https://www.trustedreviews.com/wp-content/uploads/sites/7/2022/10/Nvidia-GeForce-RTX-4090-7-scaled.jpg', brand: 'NVIDIA', specs: '24GB GDDR6X, 2.52GHz Boost' },
      { id: 'gpu-2', name: 'AMD RX 7900 XTX', price: 999.99, image: 'https://m.media-amazon.com/images/I/81il2WdPPJL._SS400_.jpg', brand: 'AMD', specs: '24GB GDDR6, 2.5GHz Game Clock' },
      { id: 'gpu-3', name: 'NVIDIA RTX 4080', price: 1199.99, image: 'https://i5.walmartimages.com/seo/NVIDIA-GeForce-RTX-4080-SUPER-16GB-GDDR6X-Graphics-Card-Titanium-Black_da65504f-75b9-4f57-a7b0-ff32904af987.9a7ac467cdb2621dd467a2e6a8acdb02.jpeg', brand: 'NVIDIA', specs: '16GB GDDR6X, 2.51GHz Boost' },
      { id: 'gpu-4', name: 'AMD RX 7900 XT', price: 899.99, image: 'https://m.media-amazon.com/images/I/71tv3YrVPKL.jpg', brand: 'AMD', specs: '20GB GDDR6, 2.4GHz Game Clock' },
    ]
  },
  {
    name: 'Motherboards',
    items: [
      { id: 'mb-1', name: 'ASUS ROG Maximus Z790', price: 599.99, image: 'https://raretech.lk/pub/media/catalog/product/cache/0ed79f8b51e2ff6c0bf629cd9df2dacc/1/_/1_33.jpg', brand: 'ASUS', specs: 'Intel Z790, DDR5, PCIe 5.0' },
      { id: 'mb-2', name: 'MSI MEG X670E ACE', price: 699.99, image: 'https://storage-asset.msi.com/global/picture/image/feature/mb/X670/meg/MEG-X670E-ACE/meg-kv.png', brand: 'MSI', specs: 'AMD X670E, DDR5, PCIe 5.0' },
      { id: 'mb-3', name: 'GIGABYTE Z790 AORUS', price: 399.99, image: 'https://redtech.lk/wp-content/uploads/2022/11/GIGABYTE-Z790-AORUS-ELITE-AX-Intel-Motherboard_0003_REDTECH.LK-copy-11.png', brand: 'GIGABYTE', specs: 'Intel Z790, DDR5, PCIe 5.0' },
      { id: 'mb-4', name: 'ASRock X670E Steel', price: 449.99, image: 'https://i.ebayimg.com/images/g/a-UAAOSwnzxjoZda/s-l1200.jpg', brand: 'ASRock', specs: 'AMD X670E, DDR5, PCIe 5.0' },
    ]
  },
  {
    name: 'Memory',
    items: [
      { id: 'ram-1', name: 'G.SKILL Trident Z5 RGB 32GB', price: 199.99, image: 'https://techzone.lk/wp-content/uploads/2022/02/G.SKILL-TRIDENT-Z-DDR5-5600MHZ-16GB-KIT.gif', brand: 'G.SKILL', specs: 'DDR5-6400, CL32, 2x16GB' },
      { id: 'ram-2', name: 'Corsair Dominator 32GB', price: 229.99, image: 'https://redtech.lk/wp-content/uploads/2019/12/32-GB-Corsair-Dominator-Platinum-RGB-DDR4-3200MHz-RAM-Memory-Kit-16x2-1.png', brand: 'Corsair', specs: 'DDR5-6200, CL36, 2x16GB' },
      { id: 'ram-3', name: 'Crucial 32GB', price: 149.99, image: 'https://laptopcare.lk/wp-content/uploads/2024/09/crucial-DDR5-4800MHZ.jpg', brand: 'Crucial', specs: 'DDR5-5600, CL40, 2x16GB' },
      { id: 'ram-4', name: 'Kingston Fury 32GB', price: 179.99, image: 'https://www.tradeinn.com/f/13806/138061627/kingston-hyperx-fury-32gb-2x16gb-ddr4-3600mhz-rgb-ram-memory.webp', brand: 'Kingston', specs: 'DDR5-6000, CL36, 2x16GB' },
    ]
  },
  {
    name: 'Storage',
    items: [
      { id: 'storage-1', name: 'Samsung 990 PRO 2TB', price: 199.99, image: 'https://images.unsplash.com/photo-1628557119555-fb3d687cc310?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', brand: 'Samsung', specs: 'NVMe PCIe 4.0, 7450MB/s Read' },
      { id: 'storage-2', name: 'WD Black SN850X 2TB', price: 189.99, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvVPbl42c2ZunFTGf2BvHa3qmI2u-5wkrTRw&s', brand: 'Western Digital', specs: 'NVMe PCIe 4.0, 7300MB/s Read' },
      { id: 'storage-3', name: 'Crucial P5 Plus 2TB', price: 169.99, image: 'https://uk.crucial.com/content/dam/crucial/ssd-products/p5-plus/images/products/Crucial-p5-plus-ssd-standing-up-on-white-cropped-Image.psd.transform/small-jpg/img.jpg', brand: 'Crucial', specs: 'NVMe PCIe 4.0, 6600MB/s Read' },
      { id: 'storage-4', name: 'Seagate FireCuda 530 2TB', price: 209.99, image: 'https://aceperipherals.com/cdn/shop/products/seagate-firecuda-530-nvme-ssd-heatsink-593131.png?v=1691436218&width=720', brand: 'Seagate', specs: 'NVMe PCIe 4.0, 7300MB/s Read' },
    ]
  }
];

export default function Parts() {
  const [activeCategory, setActiveCategory] = useState(partsCategories[0].name);
  const [brandFilter, setBrandFilter] = useState('All');
  const { addToCart } = useCart();

  const handleAddToCart = (part) => {
    addToCart({
      id: part.id,
      name: part.name,
      price: part.price,
      image: part.image || '/images/placeholder.jpg',
      specs: part.specs
    });
  };

  // Get all unique brands for the current category
  const currentCategory = partsCategories.find(category => category.name === activeCategory);
  const brands = ['All', ...new Set(currentCategory.items.map(item => item.brand))];

  // Filter items by brand
  const filteredItems = currentCategory.items.filter(
    item => brandFilter === 'All' || item.brand === brandFilter
  );

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Computer Parts</h1>
        
        {/* Categories tabs */}
        <div className="mt-8 border-b border-gray-200">
          <div className="-mb-px flex space-x-8" aria-label="Tabs">
            {partsCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => {
                  setActiveCategory(category.name);
                  setBrandFilter('All');
                }}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                  ${activeCategory === category.name
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
                `}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Brand filter */}
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-500">Filter by Brand</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {brands.map((brand) => (
              <button
                key={brand}
                onClick={() => setBrandFilter(brand)}
                className={`px-3 py-1 rounded-full text-sm ${
                  brandFilter === brand
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </div>

        {/* Items grid */}
        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
          {filteredItems.map((part) => (
            <div key={part.id} className="group relative">
              <div className="relative w-full h-72 rounded-lg overflow-hidden bg-gray-200 group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1">
                <img
                  src={part.image || '/images/placeholder.jpg'}
                  alt={part.name}
                  className="w-full h-full object-center object-cover"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900">
                    {part.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{part.brand}</p>
                  <p className="mt-1 text-sm text-gray-500">{part.specs}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">Rs. {part.price.toFixed(2)}</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddToCart(part)}
                className="mt-4 w-full bg-blue-600 border border-transparent rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-blue-700"
              >
                <ShoppingCartIcon className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
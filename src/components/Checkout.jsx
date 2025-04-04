import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  TrashIcon, 
  ShoppingCartIcon, 
  ChevronRightIcon,
  CreditCardIcon,
  TruckIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';

export default function Checkout() {
  const { cart, removeFromCart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    phone: '',
    email: user?.email || ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleShippingInfoChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const handleRemoveItem = (id) => {
    removeFromCart(id);
  };

  const handleShippingSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      clearCart();
    }, 2000);
  };

  if (cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <ShoppingCartIcon className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
          <h2 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="mt-1 text-gray-500 dark:text-gray-400">Looks like you haven't added any items to your cart yet.</p>
          <div className="mt-6">
            <Link
              to="/parts"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Browse PC parts
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          {/* Checkout Steps */}
          <nav aria-label="Progress" className="mb-12">
            <ol className="flex items-center">
              {[
                { id: 1, name: 'Shopping Cart', href: '#' },
                { id: 2, name: 'Payment', href: '#' },
                { id: 3, name: 'Confirmation', href: '#' },
              ].map((s) => (
                <li key={s.name} className={`relative ${s.id !== 3 ? 'pr-8 sm:pr-20' : ''}`}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${s.id < step ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'}`} />
                  </div>
                  <button
                    className={`relative w-8 h-8 flex items-center justify-center rounded-full ${
                      s.id < step
                        ? 'bg-blue-600'
                        : s.id === step
                        ? 'bg-blue-600'
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {s.id < step ? (
                      <svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className={`text-sm font-medium ${s.id === step ? 'text-white' : 'text-gray-500 dark:text-gray-400'}`}>
                        {s.id}
                      </span>
                    )}
                  </button>
                  <div className="mt-2 text-xs absolute -bottom-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                    <span className={`font-medium ${s.id <= step ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
                      {s.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          {/* Shopping Cart (Step 1) */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Shopping Cart</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Review your items before checkout</p>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex py-6 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200 dark:border-gray-700">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                          <h3>{item.name}</h3>
                          <p className="ml-4">Rs. {item.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{item.specs || 'Standard configuration'}</p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <button
                          type="button"
                          onClick={() => handleRemoveItem(item.id)}
                          className="flex items-center text-red-600 dark:text-red-400 hover:text-red-500"
                        >
                          <TrashIcon className="h-4 w-4 mr-1" />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white">
                  <p>Subtotal</p>
                  <p>Rs. {calculateTotal().toFixed(2)}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500 dark:text-gray-400">Shipping and taxes calculated at checkout.</p>
                
                <form onSubmit={handleShippingSubmit} className="mt-6 space-y-6">
                  <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        First name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={shippingInfo.firstName}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last name
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={shippingInfo.lastName}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="address" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Address
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={shippingInfo.address}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="city" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        City
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={shippingInfo.city}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Postal code
                      </label>
                      <div className="mt-1">
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={shippingInfo.postalCode}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Phone
                      </label>
                      <div className="mt-1">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={shippingInfo.phone}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email
                      </label>
                      <div className="mt-1">
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={handleShippingInfoChange}
                          required
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      type="submit"
                      className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Continue to Payment
                      <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5" />
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          )}

          {/* Payment (Step 2) */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Method</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Choose how you want to pay for your order</p>
              </div>

              <form onSubmit={handlePaymentSubmit} className="border-t border-gray-200 dark:border-gray-700">
                <div className="px-4 py-5 sm:p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="relative flex items-start">
                      <div className="flex items-center h-5">
                        <input
                          id="card"
                          type="radio"
                          checked={paymentMethod === 'card'}
                          onChange={() => handlePaymentMethodChange('card')}
                          className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                        />
                      </div>
                      <div className="ml-3 flex items-center">
                        <CreditCardIcon className="h-6 w-6 text-gray-400" />
                        <label htmlFor="card" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Credit / Debit Card
                        </label>
                      </div>
                    </div>

                    {paymentMethod === 'card' && (
                      <div className="ml-7 mt-4 space-y-4">
                        <div>
                          <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Card number
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="col-span-2">
                            <label htmlFor="expiry" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Expiry date
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="expiry"
                                placeholder="MM / YY"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                required
                              />
                            </div>
                          </div>
                          <div>
                            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              CVC
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                id="cvc"
                                placeholder="123"
                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label htmlFor="nameOnCard" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name on card
                          </label>
                          <div className="mt-1">
                            <input
                              type="text"
                              id="nameOnCard"
                              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="relative flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="cash"
                        name="paymentMethod"
                        type="radio"
                        checked={paymentMethod === 'cash'}
                        onChange={() => handlePaymentMethodChange('cash')}
                        className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-300"
                      />
                    </div>
                    <div className="ml-3 flex items-center">
                      <TruckIcon className="h-6 w-6 text-gray-400" />
                      <label htmlFor="cash" className="ml-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Cash on Delivery
                      </label>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900 dark:text-white mb-4">
                    <p>Order total</p>
                    <p>Rs. {calculateTotal().toFixed(2)}</p>
                  </div>
                  
                  <div className="flex items-center mb-6 text-sm text-gray-500 dark:text-gray-400">
                    <ShieldCheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    <p>Your payment information is secure and encrypted</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-500 flex items-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                      </svg>
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className={`flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isProcessing ? 'opacity-75 cursor-not-allowed' : ''}`}
                    >
                      {isProcessing ? 'Processing...' : 'Complete Order'}
                    </button>
                  </div>
                </div>
              </form>
            </motion.div>
          )}

          {/* Confirmation (Step 3) */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white dark:bg-gray-800 shadow overflow-hidden sm:rounded-lg text-center py-12 px-4 sm:px-6"
            >
              <div className="rounded-full bg-green-100 p-3 mx-auto w-16 h-16 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900 dark:text-white">Order Confirmed!</h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Thank you for your purchase. Your order has been received and is being processed.
              </p>

              <div className="mt-8 max-w-md mx-auto border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-gray-50 dark:bg-gray-900">
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">Order Summary</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">A confirmation email has been sent to {shippingInfo.email}</p>
                  
                  <div className="mt-4 text-sm">
                    <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-700 dark:text-gray-300">Shipping address</div>
                      <div className="text-gray-500 dark:text-gray-400 text-right">
                        {shippingInfo.firstName} {shippingInfo.lastName}<br />
                        {shippingInfo.address}<br />
                        {shippingInfo.city}, {shippingInfo.postalCode}
                      </div>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-700 dark:text-gray-300">Payment method</div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                      </div>
                    </div>
                    <div className="flex justify-between py-2 border-t border-gray-200 dark:border-gray-700">
                      <div className="font-medium text-gray-700 dark:text-gray-300">Order total</div>
                      <div className="text-gray-900 dark:text-white font-bold">
                        Rs. {calculateTotal().toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue Shopping
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
} 
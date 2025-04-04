import { motion } from 'framer-motion';
import { teamImages, aboutImages } from '../config/images';

export default function About() {
  return (
    <div className="bg-white dark:bg-gray-900 pt-20">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* About hero section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl"
          >
            About TechHaven
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 max-w-3xl mx-auto text-xl text-gray-500 dark:text-gray-400"
          >
            Your trusted partner for high-quality PC components and custom builds in Sri Lanka.
          </motion.p>
        </div>

        {/* Our story section */}
        <div className="mb-20">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Story</h2>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Founded in 2018, TechHaven began with a simple mission: to provide computer enthusiasts in Sri Lanka with access to high-quality PC components and expert guidance.
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                What started as a small shop in Colombo has grown into a trusted brand serving customers nationwide. We pride ourselves on offering not just products, but complete solutions tailored to each customer's unique needs.
              </p>
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
                Our team of experienced technicians and customer service representatives are dedicated to ensuring that every interaction exceeds expectations. We believe in building long-term relationships with our customers through honesty, integrity, and excellence in service.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 lg:mt-0"
            >
              <img
                src={aboutImages.storeImage}
                alt="TechHaven store"
                className="rounded-lg shadow-lg object-cover w-full h-96"
              />
            </motion.div>
          </div>
        </div>

        {/* Our team section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Meet Our Team</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              The passionate experts behind TechHaven's success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { id: 'ceo', name: 'Samantha Fernando', role: 'Founder & CEO' },
              { id: 'cto', name: 'Rajiv Patel', role: 'CTO & PC Build Expert' },
              { id: 'designer', name: 'Anjali Suresh', role: 'UI/UX Designer' },
              { id: 'marketing', name: 'David Perera', role: 'Marketing Director' },
            ].map((person, index) => (
              <motion.div
                key={person.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden"
              >
                <img
                  src={teamImages[person.id]}
                  alt={person.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">{person.name}</h3>
                  <p className="text-sm text-blue-600 dark:text-blue-400">{person.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Our values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Our Values</h2>
            <p className="mt-4 max-w-3xl mx-auto text-lg text-gray-500 dark:text-gray-400">
              Principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Quality',
                description:
                  'We never compromise on quality. Every product we sell meets our stringent standards for performance and reliability.',
                icon: '⭐',
              },
              {
                title: 'Expertise',
                description:
                  'Our team stays at the cutting edge of technology, providing knowledgeable guidance for your specific needs.',
                icon: '🧠',
              },
              {
                title: 'Customer-First',
                description:
                  "Your satisfaction is our priority. We're not happy until you're thrilled with your purchase and experience.",
                icon: '🤝',
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-800 p-8 rounded-lg"
              >
                <div className="text-3xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-blue-600 dark:bg-blue-700 rounded-2xl overflow-hidden shadow-xl">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready to build your dream PC?
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-blue-100">
                Visit our store or contact us today to start your custom PC journey.
              </p>
            </div>
            <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="/custom-build"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
                >
                  Build Now
                </a>
              </div>
              <div className="ml-3 inline-flex rounded-md shadow">
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
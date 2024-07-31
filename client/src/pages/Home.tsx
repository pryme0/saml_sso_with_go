import React from "react";
import { Layout } from "../components/layout"; // Adjust the import path if necessary

export const HomePage: React.FC = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to My Website</h1>
          <p className="text-lg mb-8">
            Discover the best solutions for your business needs.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8 text-blue-500">
            Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="shadow-md p-6 rounded-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Feature One
              </h3>
              <p className="text-gray-700">
                Brief description of the feature. Explain how it benefits the
                user.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="shadow-md p-6 rounded-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Feature Two
              </h3>
              <p className="text-gray-700">
                Brief description of the feature. Explain how it benefits the
                user.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="shadow-md p-6 rounded-md bg-gray-50">
              <h3 className="text-xl font-semibold mb-2 text-blue-500">
                Feature Three
              </h3>
              <p className="text-gray-700">
                Brief description of the feature. Explain how it benefits the
                user.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-blue-500 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join Us Today</h2>
          <p className="text-lg mb-8">
            Sign up now to access exclusive features and stay updated.
          </p>
          <a
            href="/signup"
            className="bg-white text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-gray-100"
          >
            Sign Up
          </a>
        </div>
      </section>
    </Layout>
  );
};

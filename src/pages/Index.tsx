
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, BarChart2, CheckCircle2, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
          <div className="proval-container">
            <div className="flex flex-col-reverse md:flex-row items-center">
              <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pr-10">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Professional Valuation Software for Indian Valuers
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                  Streamline your valuation workflow with Proval - the all-in-one platform designed specifically for Land and Building Valuers in India.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/signup">
                    <Button className="bg-proval-500 hover:bg-proval-600 text-lg px-6 py-6 h-auto">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button variant="outline" className="text-lg px-6 py-6 h-auto">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <img 
                  src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
                  alt="Real Estate Valuation" 
                  className="rounded-lg shadow-lg w-full"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-white">
          <div className="proval-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Proval?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our platform is built specifically for Indian valuation professionals with features designed to meet local requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="bg-proval-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <BarChart2 className="text-proval-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Comprehensive Reports
                </h3>
                <p className="text-gray-600">
                  Generate professional valuation reports compliant with all Indian banking standards and regulatory requirements.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="bg-proval-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <Shield className="text-proval-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Secure Data Storage
                </h3>
                <p className="text-gray-600">
                  Your data is encrypted and stored securely with regular backups, ensuring your clients' information stays protected.
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all">
                <div className="bg-proval-50 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                  <CheckCircle2 className="text-proval-500 h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Easy Compliance
                </h3>
                <p className="text-gray-600">
                  Stay compliant with RBI, SEBI, and IBBI guidelines with our built-in compliance checkers and up-to-date templates.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="proval-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Trusted by Valuers Across India
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Join hundreds of professionals who have transformed their valuation practice with Proval.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-proval-100 flex items-center justify-center text-proval-600 font-bold">
                    RP
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Rajesh Patil</h4>
                    <p className="text-sm text-gray-500">Chartered Valuer, Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "Proval has simplified my entire workflow. The customized reports for Indian banks save me hours of work each week."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-proval-100 flex items-center justify-center text-proval-600 font-bold">
                    SS
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Shalini Singh</h4>
                    <p className="text-sm text-gray-500">Independent Valuer, Delhi</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The maps integration and area calculation tools are incredibly accurate and save so much time during site visits."
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-proval-100 flex items-center justify-center text-proval-600 font-bold">
                    VK
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Vikram Kumar</h4>
                    <p className="text-sm text-gray-500">Bank Empaneled Valuer, Bangalore</p>
                  </div>
                </div>
                <p className="text-gray-700">
                  "The invoice system has helped me track payments efficiently. Clients appreciate the professional reports we generate."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-proval-600 text-white">
          <div className="proval-container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Valuation Practice?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of Indian valuation professionals who are streamlining their workflow with Proval.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-proval-600 hover:bg-gray-100 text-lg px-6 py-6 h-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-proval-500 text-lg px-6 py-6 h-auto">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

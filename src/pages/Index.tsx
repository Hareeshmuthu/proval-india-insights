
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ArrowRight, BarChart2, CheckCircle2, Shield, FileText, Users } from "lucide-react";
import { useEffect } from "react";

const Index = () => {
  useEffect(() => {
    // Set dark mode for home page
    document.documentElement.classList.add("dark");
    localStorage.setItem("proval-theme", "dark");
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#121212]">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-violet-900/20 to-transparent"></div>
          <div className="absolute -top-24 right-0 w-96 h-96 bg-purple-500/30 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl opacity-20"></div>
          
          <div className="proval-container relative z-10">
            <div className="flex flex-col-reverse md:flex-row items-center">
              <div className="w-full md:w-1/2 mt-10 md:mt-0 md:pr-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">Professional Valuation</span>{" "}
                  Software for Indian Valuers
                </h1>
                <p className="text-xl text-gray-300 mb-8">
                  Streamline your valuation workflow with <span className="font-bold text-red-600">Proval</span> - the all-in-one platform designed specifically for Land and Building Valuers in India.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link to="/signup">
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-lg px-6 py-6 h-auto border-0">
                      Get Started <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link to="/demo">
                    <Button variant="outline" className="text-lg px-6 py-6 h-auto border-purple-500 text-purple-400 hover:bg-purple-900/20">
                      Watch Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="w-full md:w-1/2">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1460472178825-e5240623afd5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlYWwlMjBlc3RhdGUlMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D" 
                    alt="Real Estate Valuation" 
                    className="rounded-xl shadow-2xl w-full relative z-10 border border-purple-500/30"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 bg-[#121212]">
          <div className="proval-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Why Choose <span className="font-bold text-red-600">Proval</span>?
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our platform is built specifically for Indian valuation professionals with features designed to meet local requirements.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <BarChart2 className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Comprehensive Reports
                </h3>
                <p className="text-gray-300">
                  Generate professional valuation reports compliant with all Indian banking standards and regulatory requirements.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Shield className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Secure Data Storage
                </h3>
                <p className="text-gray-300">
                  Your data is encrypted and stored securely with regular backups, ensuring your clients' information stays protected.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-xl shadow-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group">
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-14 h-14 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <CheckCircle2 className="text-white h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  Easy Compliance
                </h3>
                <p className="text-gray-300">
                  Stay compliant with RBI, SEBI, and IBBI guidelines with our built-in compliance checkers and up-to-date templates.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section 2 */}
        <section className="py-16 bg-gradient-to-b from-[#121212] to-[#1e1e2f]">
          <div className="proval-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-6">Powerful Tools for Valuers</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <FileText className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">Professional Reports</h3>
                      <p className="text-gray-300">Generate customized reports for different banks and purposes with just a few clicks.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <Users className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">Client Management</h3>
                      <p className="text-gray-300">Keep track of all your clients and their properties in one centralized database.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="bg-gradient-to-br from-purple-600 to-pink-600 w-10 h-10 rounded-lg flex items-center justify-center shrink-0 mt-1">
                      <BarChart2 className="text-white h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white text-lg mb-2">Analytics Dashboard</h3>
                      <p className="text-gray-300">Get insights into your valuation business with comprehensive analytics and reports.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-lg"></div>
                <img 
                  src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Valuation Software" 
                  className="rounded-xl shadow-2xl w-full relative z-10 border border-purple-500/30"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-16 bg-[#1e1e2f]">
          <div className="proval-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-white mb-4">
                Trusted by Valuers Across India
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join hundreds of professionals who have transformed their valuation practice with <span className="font-bold text-red-600">Proval</span>.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    RP
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">Rajesh Patil</h4>
                    <p className="text-sm text-gray-400">Chartered Valuer, Mumbai</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "<span className="font-bold text-red-600">Proval</span> has simplified my entire workflow. The customized reports for Indian banks save me hours of work each week."
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    SS
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">Shalini Singh</h4>
                    <p className="text-sm text-gray-400">Independent Valuer, Delhi</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The maps integration and area calculation tools are incredibly accurate and save so much time during site visits."
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-6 rounded-xl shadow-xl border border-purple-500/20">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                    VK
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-white">Vikram Kumar</h4>
                    <p className="text-sm text-gray-400">Bank Empaneled Valuer, Bangalore</p>
                  </div>
                </div>
                <p className="text-gray-300">
                  "The invoice system has helped me track payments efficiently. Clients appreciate the professional reports we generate."
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-900 to-pink-900 text-white">
          <div className="proval-container text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Transform Your Valuation Practice?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-200">
              Join thousands of Indian valuation professionals who are streamlining their workflow with <span className="font-bold text-red-600">Proval</span>.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/signup">
                <Button className="bg-white text-purple-900 hover:bg-gray-100 text-lg px-6 py-6 h-auto">
                  Sign Up Now
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-6 py-6 h-auto">
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

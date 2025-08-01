import React, { useState } from 'react';
import { Mail, Users, PenTool, Menu, X } from 'lucide-react';
import { NewsletterSignup } from './components/NewsletterSignup';
import { SubscriberManagement } from './components/SubscriberManagement';
import { EmailTemplate } from './components/EmailTemplate';

type View = 'home' | 'subscribers' | 'templates';

function App() {
  const [currentView, setCurrentView] = useState<View>('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Home', icon: Mail, view: 'home' as View },
    { name: 'Subscribers', icon: Users, view: 'subscribers' as View },
    { name: 'Templates', icon: PenTool, view: 'templates' as View },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-light text-gray-900 tracking-tight">Newsletter</span>
              </div>
              
              <div className="hidden md:ml-16 md:flex md:space-x-12">
                {navigation.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => setCurrentView(item.view)}
                    className={`text-sm font-medium transition-colors duration-200 ${
                      currentView === item.view
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-100">
            <div className="px-6 pt-4 pb-6 space-y-4">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    setCurrentView(item.view);
                    setMobileMenuOpen(false);
                  }}
                  className={`block text-base font-medium transition-colors ${
                    currentView === item.view
                      ? 'text-gray-900'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main>
        {currentView === 'home' && (
          <div>
            {/* Hero Section */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 pt-24 pb-32">
              <div className="text-center space-y-12">
                <div className="space-y-8">
                  <h1 className="text-5xl md:text-7xl font-light text-gray-900 leading-tight tracking-tight">
                    Stay in the loop
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-2xl mx-auto">
                    Get thoughtful insights and updates delivered to your inbox. 
                    No spam, just quality content.
                  </p>
                </div>

                {/* Newsletter Signup */}
                <div className="pt-8">
                  <NewsletterSignup />
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="bg-gray-50 py-24">
              <div className="max-w-6xl mx-auto px-6 lg:px-8">
                <div className="text-center mb-20">
                  <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-6">
                    What to expect
                  </h2>
                  <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
                    Carefully curated content that respects your time and inbox
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <Mail className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium text-gray-900">Weekly Insights</h3>
                      <p className="text-gray-600 font-light leading-relaxed">
                        Thoughtful analysis and perspectives delivered every week
                      </p>
                    </div>
                  </div>

                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <Users className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium text-gray-900">Expert Curation</h3>
                      <p className="text-gray-600 font-light leading-relaxed">
                        Hand-picked content from industry leaders and innovators
                      </p>
                    </div>
                  </div>

                  <div className="text-center space-y-6">
                    <div className="w-16 h-16 bg-gray-900 rounded-full flex items-center justify-center mx-auto">
                      <PenTool className="w-7 h-7 text-white" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="text-xl font-medium text-gray-900">Actionable Ideas</h3>
                      <p className="text-gray-600 font-light leading-relaxed">
                        Practical insights you can apply to your work and life
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Testimonial Section */}
            <section className="py-24">
              <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
                <blockquote className="text-2xl md:text-3xl font-light text-gray-900 leading-relaxed mb-8">
                  "The most thoughtful newsletter I receive. Every issue is worth my time."
                </blockquote>
                <cite className="text-gray-600 font-light">— Sarah Chen, Product Designer</cite>
              </div>
            </section>
          </div>
        )}

        {currentView === 'subscribers' && (
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
            <SubscriberManagement />
          </div>
        )}

        {currentView === 'templates' && (
          <div className="max-w-4xl mx-auto px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-light text-gray-900 mb-4">Email Templates</h2>
              <p className="text-lg text-gray-600 font-light">Preview and customize your newsletter design</p>
            </div>
            <EmailTemplate isPreview={true} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <p className="text-gray-500 font-light">
              © 2025 Newsletter. Built with care.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
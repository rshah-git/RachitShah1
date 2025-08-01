import React from 'react';
import { Calendar, ExternalLink } from 'lucide-react';

interface EmailTemplateProps {
  subscriberName?: string;
  subject?: string;
  content?: string;
  isPreview?: boolean;
}

export function EmailTemplate({ 
  subscriberName = "Valued Subscriber", 
  subject = "Weekly Insights",
  content = "This week's thoughtful selection of insights and ideas...",
  isPreview = false 
}: EmailTemplateProps) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className={`max-w-2xl mx-auto bg-white ${isPreview ? 'border border-gray-200 rounded-lg shadow-sm' : ''}`}>
      {/* Email Header */}
      <div className="px-8 pt-12 pb-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-light text-gray-900 mb-2">Newsletter</h1>
          <div className="flex items-center justify-center text-gray-500 text-sm font-light">
            <Calendar className="w-4 h-4 mr-2" />
            {currentDate}
          </div>
        </div>
        
        <div className="border-b border-gray-100 pb-8">
          <h2 className="text-3xl font-light text-gray-900 mb-4 leading-tight">{subject}</h2>
          <p className="text-gray-600 font-light">Hello {subscriberName},</p>
        </div>
      </div>

      {/* Email Body */}
      <div className="px-8 pb-8">
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 leading-relaxed mb-8 font-light text-lg">
            {content}
          </p>
          
          <div className="bg-gray-50 border-l-4 border-gray-900 p-8 my-12">
            <h3 className="text-xl font-medium text-gray-900 mb-4">This Week's Highlight</h3>
            <p className="text-gray-700 mb-4 font-light leading-relaxed">
              A deep dive into the intersection of technology and human behavior, exploring how 
              small design decisions can have profound impacts on user experience.
            </p>
            <a 
              href="#" 
              className="inline-flex items-center text-gray-900 hover:text-gray-700 font-medium transition-colors"
            >
              Read the full article
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </div>

          <h3 className="text-2xl font-light text-gray-900 mb-6">Worth Reading</h3>
          <div className="space-y-6 mb-12">
            <div className="border-b border-gray-100 pb-6">
              <h4 className="font-medium text-gray-900 mb-2">The Future of Remote Work</h4>
              <p className="text-gray-600 font-light leading-relaxed mb-3">
                Insights from companies that have successfully transitioned to distributed teams.
              </p>
              <a href="#" className="text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                Read more →
              </a>
            </div>
            
            <div className="border-b border-gray-100 pb-6">
              <h4 className="font-medium text-gray-900 mb-2">Design Systems at Scale</h4>
              <p className="text-gray-600 font-light leading-relaxed mb-3">
                How leading tech companies maintain consistency across hundreds of products.
              </p>
              <a href="#" className="text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                Read more →
              </a>
            </div>
            
            <div className="pb-6">
              <h4 className="font-medium text-gray-900 mb-2">The Psychology of Decision Making</h4>
              <p className="text-gray-600 font-light leading-relaxed mb-3">
                Understanding cognitive biases and how they influence our daily choices.
              </p>
              <a href="#" className="text-gray-900 hover:text-gray-700 text-sm font-medium transition-colors">
                Read more →
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8">
          <div className="bg-gray-50 rounded-lg p-8 text-center">
            <h4 className="font-medium text-gray-900 mb-3">Share the Knowledge</h4>
            <p className="text-gray-600 font-light mb-6 leading-relaxed">
              Know someone who would enjoy these insights? Forward this email or share our newsletter.
            </p>
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Share Newsletter
            </button>
          </div>
        </div>
      </div>

      {/* Email Footer */}
      <div className="bg-gray-50 px-8 py-8 text-center border-t border-gray-100">
        <p className="text-gray-600 text-sm mb-3 font-light">
          Thank you for being part of our community.
        </p>
        <p className="text-gray-500 text-xs font-light">
          You're receiving this because you subscribed to our newsletter.
          <br />
          <a href="#" className="text-gray-600 hover:text-gray-800 underline transition-colors">
            Unsubscribe
          </a> or <a href="#" className="text-gray-600 hover:text-gray-800 underline transition-colors">
            Update preferences
          </a>
        </p>
      </div>
    </div>
  );
}
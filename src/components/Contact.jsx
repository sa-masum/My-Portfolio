import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';
import { getContactInfo, getPersonalInfo } from '../utils/dataLoader';

const Contact = () => {
  const contactInfo = getContactInfo();
  const personalInfo = getPersonalInfo();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState(null);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setFormStatus('sending');
    
    // Create mailto link with form data
    const mailtoLink = `mailto:${contactInfo.email}?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    
    setTimeout(() => {
      window.location.href = mailtoLink;
      setFormStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      setTimeout(() => {
        setFormStatus(null);
      }, 3000);
    }, 1000);
  };

  const isFormValid = formData.name && formData.email && formData.subject && formData.message;

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container-custom mx-4 md:mx-8 lg:mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <Mail size={48} className="text-blue-600 mr-4" />
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">Get In Touch</h2>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Let's discuss opportunities, collaborations, or just have a chat about technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Let's Connect</h3>
              <p className="text-gray-600 text-lg mb-8">
                I'm always interested in hearing about new opportunities, interesting projects, 
                or just having a conversation about technology and development.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-blue-100 p-4 rounded-xl mr-6">
                  <Mail size={24} className="text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Email</h4>
                  <a 
                    href={`mailto:${contactInfo.email}`}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                  <p className="text-sm text-gray-500 mt-1">Preferred contact method</p>
                </div>
              </div>

              {contactInfo.phone && (
                <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="bg-green-100 p-4 rounded-xl mr-6">
                    <Phone size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Phone</h4>
                    <a 
                      href={`tel:${contactInfo.phone}`}
                      className="text-green-600 hover:text-green-800 transition-colors"
                    >
                      {contactInfo.phone}
                    </a>
                    <p className="text-sm text-gray-500 mt-1">Available during business hours</p>
                  </div>
                </div>
              )}

              <div className="flex items-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="bg-purple-100 p-4 rounded-xl mr-6">
                  <MapPin size={24} className="text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Location</h4>
                  <p className="text-purple-600">{contactInfo.location}</p>
                  <p className="text-sm text-gray-500 mt-1">{contactInfo.availability}</p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Find me on</h4>
              <div className="flex space-x-4">
                <a
                  href={personalInfo.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors transform hover:scale-110"
                >
                  <Github size={20} />
                </a>
                <a
                  href={personalInfo.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-12 h-12 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors transform hover:scale-110"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center justify-center w-12 h-12 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors transform hover:scale-110"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Availability Status */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl p-6 border border-green-200">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
                <h4 className="font-semibold text-gray-900">Currently Available</h4>
              </div>
              <p className="text-gray-600">
                {contactInfo.availability} • Looking for exciting opportunities in web development and software engineering.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h3>
            
            {formStatus && (
              <div className={`mb-6 p-4 rounded-lg flex items-center gap-3 ${
                formStatus === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 
                formStatus === 'error' ? 'bg-red-50 text-red-800 border border-red-200' : 
                'bg-blue-50 text-blue-800 border border-blue-200'
              }`}>
                {formStatus === 'success' && <CheckCircle size={20} />}
                {formStatus === 'error' && <AlertCircle size={20} />}
                {formStatus === 'sending' && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>}
                <span>
                  {formStatus === 'success' && 'Message sent successfully! Opening email client...'}
                  {formStatus === 'error' && 'Something went wrong. Please try again.'}
                  {formStatus === 'sending' && 'Preparing to send message...'}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Project Collaboration"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
                  placeholder="Hi Masum, I'd like to discuss..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={!isFormValid || formStatus === 'sending'}
                className={`w-full flex items-center justify-center gap-3 py-3 px-6 rounded-lg font-semibold transition-all duration-200 ${
                  isFormValid && formStatus !== 'sending'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {formStatus === 'sending' ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-sm text-gray-500 text-center">
                * Required fields. Your message will open your default email client.
              </p>
            </form>
          </div>
        </div>

        {/* Quick Contact CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Ready to work together?</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Whether you have a project in mind, want to collaborate, or just want to say hello, 
              I'd love to hear from you. Let's build something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`mailto:${contactInfo.email}?subject=Let's work together!`}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                <Mail size={20} />
                Send Quick Email
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
              >
                <Linkedin size={20} />
                Connect on LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
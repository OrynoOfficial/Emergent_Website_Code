import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PillNav from '@/components/PillNav';
import Footer from '@/components/Footer';
import ChatbotWidget from '@/components/ChatbotWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft, Upload, Loader2, CheckCircle } from 'lucide-react';

const jobs = {
  1: { title: 'Senior Software Engineer', department: 'Engineering' },
  2: { title: 'Product Manager', department: 'Product' },
  3: { title: 'Customer Success Manager', department: 'Operations' },
  4: { title: 'Marketing Specialist', department: 'Marketing' },
  5: { title: 'UX Designer', department: 'Design' }
};

export default function CareersApplication() {
  const { jobId } = useParams();
  const job = jobs[jobId] || { title: 'Position', department: 'Department' };
  
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    linkedIn: '', portfolio: '', coverLetter: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="bg-white min-h-screen">
        <PillNav />
        <div className="pt-32 pb-16">
          <div className="max-w-lg mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Application Submitted!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for your interest in joining Oryno. We've received your application for {job.title} 
              and will review it shortly. You'll hear from us within 5-7 business days.
            </p>
            <Link to="/careers">
              <Button variant="outline">Back to Careers</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      <PillNav />
      
      <div className="pt-32 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link to="/careers" className="inline-flex items-center gap-2 text-[#082c59] hover:text-[#0a3d7a] mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Careers
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Apply for {job.title}</h1>
            <p className="text-gray-600">{job.department} Department</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <Input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <Input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                <Input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="+237 6XX XXX XXX" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">LinkedIn Profile</label>
              <Input name="linkedIn" value={formData.linkedIn} onChange={handleChange} placeholder="https://linkedin.com/in/..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Website</label>
              <Input name="portfolio" value={formData.portfolio} onChange={handleChange} placeholder="https://..." />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV *</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#082c59] transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500 mt-1">PDF, DOC up to 10MB</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
              <Textarea
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                rows={5}
                placeholder="Tell us why you're interested in this role..."
              />
            </div>

            <Button type="submit" disabled={submitting} className="w-full bg-[#082c59] hover:bg-[#0a3d7a] text-white py-3">
              {submitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
              ) : (
                'Submit Application'
              )}
            </Button>
          </form>
        </div>
      </div>

      <Footer />
      <ChatbotWidget />
    </main>
  );
}

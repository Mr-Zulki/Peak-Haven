import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

const Contact = () => {
  const [formData, setFormData] = useState({ full_name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted! Data:", formData);
    setLoading(true);
    try {
      console.log("Sending inquiry to peakhaven.inquiries...");
      const { error } = await supabase.schema('peakhaven').from('inquiries').insert([formData]);
      console.log("Insert response error:", error);
      setLoading(false);
      if (!error) {
        setSuccess(true);
      setFormData({ full_name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        alert("Error sending message: " + error.message);
      }
    } catch (err) {
      console.error("Unexpected error in handleSubmit:", err);
      setLoading(false);
    }
  };

  return (
    <>
  <div className="page-heading header-text">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <span className="breadcrumb"><a href="#">Home</a>  /  Contact Us</span>
          <h3>Contact Us</h3>
        </div>
      </div>
    </div>
  </div>

  <div className="contact-page section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6">
          <div className="section-heading">
            <h6>| Contact Us</h6>
            <h2>Get In Touch With Our Agents</h2>
          </div>
          <p>PeakHaven is your gateway to unforgettable stays near the world’s most breathtaking landscapes. Whether you're chasing mountain peaks, forest trails, or hidden coastal gems, we connect you with curated accommodations and adventure-ready travel packages designed to inspire, explore, and elevate your journey.</p> 
          <div className="row">
            <div className="col-lg-12">
              <div className="item phone">
                <img src="assets/images/phone-icon.png" alt="" style={{ maxWidth: '52px' }} />
                <h6>010-020-0340<br /><span>Phone Number</span></h6>
              </div>
            </div>
            <div className="col-lg-12">
              <div className="item email">
                <img src="assets/images/email-icon.png" alt="" style={{ maxWidth: '52px' }} />
                <h6>info@peakhaven.com<br /><span>Business Email</span></h6>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <form id="contact-form" onSubmit={handleSubmit}>
            <div className="row">
              {success && (
                <div className="col-lg-12 mb-4">
                  <div className="alert alert-success">Thank you! Your message has been sent successfully.</div>
                </div>
              )}
              <div className="col-lg-12">
                <fieldset>
                  <label htmlFor="name">Full Name</label>
                  <input type="text" name="name" id="name" placeholder="Your Name..." autoComplete="on" required value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <label htmlFor="email">Email Address</label>
                  <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" placeholder="Your E-mail..." required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <label htmlFor="subject">Subject</label>
                  <input type="text" name="subject" id="subject" placeholder="Subject..." autoComplete="on" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} />
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <label htmlFor="message">Message</label>
                  <textarea name="message" id="message" placeholder="Your Message" required value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea>
                </fieldset>
              </div>
              <div className="col-lg-12">
                <fieldset>
                  <button type="submit" id="form-submit" className="orange-button" disabled={loading}>{loading ? 'Sending...' : 'Send Message'}</button>
                </fieldset>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-12">
          <div id="map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12469.776493332698!2d-80.14036379941481!3d25.907788681148624!2m3!1f357.26927939317244!2f20.870722720054623!3f0!3m2!1i1024!2i768!4f35!3m3!1m2!1s0x88d9add4b4ac788f%3A0xe77469d09480fcdb!2sSunny%20Isles%20Beach!5e1!3m2!1sen!2sth!4v1642869952544!5m2!1sen!2sth" width="100%" height="500px" frameBorder={0} style={{ border: '0', borderRadius: '10px', boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.15)' }} allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </div>
  </div>
    </>
  );
};

export default Contact;

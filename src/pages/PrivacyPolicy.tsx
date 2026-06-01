import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="grain-overlay" />
      <div className="textured-bg min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
              Privacy Policy
            </h1>
            
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-sm text-foreground/60">Last updated: November 25, 2025</p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  Welcome to Goldwila. We respect your privacy and are committed to protecting your personal data. 
                  This privacy policy will inform you as to how we look after your personal data when you visit our website 
                  and tell you about your privacy rights and how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Data We Collect</h2>
                <p>
                  We collect minimal data necessary to provide our services. This includes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>Account Information:</strong> When you sign in with Google, we collect your name and email address to create your account.</li>
                  <li><strong>YouTube Subscription Status:</strong> We access your YouTube account information solely to verify if you are subscribed to the Goldwila channel. We do not store your viewing history or other YouTube activity.</li>
                  <li><strong>House Information:</strong> If you claim a house, we store the house name and number associated with your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>To register you as a new user and create your house in our village.</li>
                  <li>To verify your subscription status to the Goldwila YouTube channel.</li>
                  <li>To manage our relationship with you.</li>
                  <li>To improve our website, products/services, marketing or customer relationships.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. YouTube API Services</h2>
                <p>
                  Goldwila uses YouTube API Services to verify your subscription status. By using our service, you are agreeing to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube Terms of Service</a> and the <a href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>.
                </p>
                <p className="mt-2">
                  You can revoke Goldwila's access to your data via the <a href="https://security.google.com/settings/security/permissions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Security Settings page</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered or disclosed. 
                  In addition, we limit access to your personal data to those employees, agents, contractors and other third parties who have a business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Contact Us</h2>
                <p>
                  If you have any questions about this privacy policy or our privacy practices, please contact us via our Discord community or email us at support@goldwila.com.
                </p>
              </section>
            </div>
          </div>
        </div>
        
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;

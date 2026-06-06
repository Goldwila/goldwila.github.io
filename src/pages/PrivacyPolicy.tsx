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
              <p className="text-sm text-foreground/60">Last updated: June 6, 2026</p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Introduction</h2>
                <p>
                  Welcome to Goldwila. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website, tell you about your privacy rights, and explain how the law protects you.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Data We Collect</h2>
                <p>
                  We collect the minimal data necessary to provide our services. This includes:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li><strong>Account Information:</strong> When you sign in with Google, we collect your name and email address to create your account.</li>
                  <li><strong>YouTube Subscription Status:</strong> We access your YouTube account information solely to verify if you are subscribed to the Goldwila channel. We do not store your viewing history, playlists, or other YouTube activity.</li>
                  <li><strong>House Information:</strong> If you claim a house, we store the house name and number associated with your account.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
                <p>
                  We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>To register you as a new user and map your assigned house in our Minecraft village.</li>
                  <li>To verify your subscription status to the Goldwila YouTube channel.</li>
                  <li>To manage our relationship with you and provide community support.</li>
                  <li>To improve our website, products/services, and user experience.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. YouTube API Services</h2>
                <p>
                  Goldwila uses YouTube API Services to verify your subscription status. By using our service, you are agreeing to be bound by the <a href="https://www.youtube.com/t/terms" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">YouTube Terms of Service</a> and the <a href="http://www.google.com/policies/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Privacy Policy</a>.
                </p>
                <p className="mt-2">
                  You can revoke Goldwila's access to your data at any time via the <a href="https://security.google.com/settings/security/permissions" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Security Settings page</a>.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Data Sharing, Transfer, and Disclosure</h2>
                <p>
                  We do not sell, trade, lease, or otherwise transfer your Google user data to any third parties. Your data is strictly used internally to manage your account and house placement within the Goldwila community.
                </p>
                <p className="mt-2">
                  We do not share your personal data or information obtained via Google/YouTube APIs with external developers, advertisers, or business partners. We will only disclose your information if required to do so by law, to comply with a judicial proceeding, or to protect the safety and rights of our community.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Retention and Deletion</h2>
                <p>
                  We retain your Google user data (name, email address, and subscription status) only for as long as your account remains active and you are a participant in the Goldwila community.
                </p>
                <p className="mt-2">
                  If you wish to delete your account and have your data removed, you must initiate the deletion request directly through our website via your account settings page. Once initiated, your data will be held in a pending state for 30 days before being permanently deleted. During this 30-day window, you can log back into the website at any time to cancel the request and fully recover your account and data. If not recovered within 30 days, all Google user data, YouTube API-derived data, and associated account details will be permanently and irreversibly deleted from our databases.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Data Security</h2>
                <p>
                  We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal data to those core Goldwila team members and authorized contractors who have a strict business need to know.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
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

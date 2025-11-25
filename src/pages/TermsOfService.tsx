import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <div className="grain-overlay" />
      <div className="textured-bg min-h-screen">
        <Navbar />
        
        <div className="container mx-auto px-6 pt-32 pb-16">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 md:p-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-8">
              Terms of Service
            </h1>
            
            <div className="space-y-6 text-foreground/80 leading-relaxed">
              <p className="text-sm text-foreground/60">Last updated: November 25, 2025</p>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">1. Agreement to Terms</h2>
                <p>
                  By accessing or using the Goldwila website and services, you agree to be bound by these Terms of Service and our Privacy Policy. 
                  If you do not agree to these terms, please do not use our services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. Description of Service</h2>
                <p>
                  Goldwila provides a platform for Minecraft enthusiasts to join a community village. 
                  Subscribers to the Goldwila YouTube channel are eligible to have a house built in our Minecraft survival world.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. User Accounts and Subscription</h2>
                <p>
                  To access certain features, you must sign in with your Google account and grant us permission to verify your YouTube subscription status. 
                  You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. House Creation Policy</h2>
                <ul className="list-disc pl-6 mt-2 space-y-2">
                  <li>Eligibility: Only verified subscribers of the Goldwila YouTube channel are eligible for a house.</li>
                  <li>One House Per User: Each user is limited to one house in the village.</li>
                  <li>Content: House names and descriptions must not contain offensive, hateful, or inappropriate content. We reserve the right to remove or rename any house that violates this policy.</li>
                  <li>Construction: The actual construction of the house in the Minecraft world is performed by the Goldwila team or authorized builders. The website serves as a directory and claim system.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Intellectual Property</h2>
                <p>
                  The Goldwila website, including its design, code, and content, is the property of Goldwila. 
                  Minecraft is a trademark of Mojang Synergies AB. Goldwila is not affiliated with Mojang Synergies AB or Microsoft.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Termination</h2>
                <p>
                  We may terminate or suspend your access to our services immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. 
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us via our Discord community.
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

export default TermsOfService;

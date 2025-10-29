import { Link } from "react-router-dom";
import { Youtube, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/10 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="grain-overlay" />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Column */}
          <div>
            <h3 className="font-serif text-4xl font-bold text-foreground mb-4">
              Goldwila
            </h3>
            <p className="text-foreground/70 text-sm leading-relaxed">
              Building a Village Together in Minecraft
            </p>
          </div>

          {/* Pages Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Pages</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/village" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  Village
                </Link>
              </li>
              <li>
                <Link to="/membership" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  Membership
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-foreground/70 hover:text-foreground transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Column */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Join the Community</h4>
            <div className="flex flex-wrap gap-3">
              <a 
                href="https://www.youtube.com/@goldwila" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
                <span className="text-sm">YouTube</span>
              </a>
              <a 
                href="https://discord.gg/JeYge48R3G" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="Discord"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
                <span className="text-sm">Discord</span>
              </a>
              <a 
                href="https://www.instagram.com/goldwila_official/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">Instagram</span>
              </a>
              <a 
                href="https://www.threads.com/@goldwila_official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="Threads"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.018-5.11.924-6.54 2.693C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.768 3.631 2.674 6.54 2.692 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.74-1.76-.513-.6-1.364-.92-2.53-.953-1.423-.04-2.9.567-3.58 1.48l-.498-1.855c.88-.99 2.635-1.765 4.694-1.707 1.705.05 3.016.573 3.9 1.559.71.79 1.125 1.87 1.236 3.221.016.196.025.39.027.586.506.27.932.61 1.276 1.01.495.575.87 1.285 1.115 2.11.694 2.327-.066 5.158-1.91 6.98-1.523 1.505-3.568 2.232-6.08 2.252zM9.965 13.03c-.67.06-1.25.24-1.66.52-.492.336-.736.79-.715 1.33.02.51.265.926.725 1.23.493.323 1.174.5 1.926.5.07 0 .14-.002.21-.007 1.095-.058 1.975-.46 2.614-1.194.49-.562.83-1.342.966-2.26l-4.066-.12z"/>
                </svg>
                <span className="text-sm">Threads</span>
              </a>
              <a 
                href="https://x.com/goldwila" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="X (Twitter)"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a 
                href="https://www.reddit.com/r/Goldwila/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10"
                aria-label="Reddit"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
                </svg>
                <span className="text-sm">Reddit</span>
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/10 text-center">
          <p className="text-foreground/60 text-sm">
            © 2025 Goldwila
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

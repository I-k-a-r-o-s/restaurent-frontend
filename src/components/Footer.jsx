const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-200 text-base-content">
      {/* Main Footer */}
      <div className="footer sm:footer-horizontal bg-base-200 p-10 max-w-7xl mx-auto gap-8">
        {/* Brand Section */}
        <aside className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="btn btn-ghost btn-circle text-2xl">
              🍽️
            </div>
            <div>
              <h3 className="font-bold text-lg">FoodHub</h3>
              <p className="text-sm text-base-content/70">
                Serving delicious meals since 2020
              </p>
            </div>
          </div>
          <p className="text-sm text-base-content/70 max-w-xs">
            Experience authentic flavors and culinary excellence with our expertly curated menu and passionate team.
          </p>
        </aside>

        {/* Quick Links */}
        <nav className="flex flex-col gap-3">
          <h6 className="footer-title text-primary">🔗 Quick Links</h6>
          <a className="link link-hover hover:text-primary transition-colors">🏠 Home</a>
          <a className="link link-hover hover:text-primary transition-colors">🍽️ Menu</a>
          <a className="link link-hover hover:text-primary transition-colors">📅 Reservations</a>
          <a className="link link-hover hover:text-primary transition-colors">📍 Locations</a>
        </nav>

        {/* Services */}
        <nav className="flex flex-col gap-3">
          <h6 className="footer-title text-secondary">⭐ Services</h6>
          <a className="link link-hover hover:text-secondary transition-colors">🚚 Delivery</a>
          <a className="link link-hover hover:text-secondary transition-colors">🏪 Takeout</a>
          <a className="link link-hover hover:text-secondary transition-colors">🪑 Dine In</a>
          <a className="link link-hover hover:text-secondary transition-colors">🎉 Catering</a>
        </nav>

        {/* Company */}
        <nav className="flex flex-col gap-3">
          <h6 className="footer-title text-accent">ℹ️ Company</h6>
          <a className="link link-hover hover:text-accent transition-colors">📋 About Us</a>
          <a className="link link-hover hover:text-accent transition-colors">💼 Careers</a>
          <a className="link link-hover hover:text-accent transition-colors">📧 Contact</a>
          <a className="link link-hover hover:text-accent transition-colors">🤝 Partnership</a>
        </nav>

        {/* Legal */}
        <nav className="flex flex-col gap-3">
          <h6 className="footer-title text-warning">⚖️ Legal</h6>
          <a className="link link-hover hover:text-warning transition-colors">📝 Terms</a>
          <a className="link link-hover hover:text-warning transition-colors">🔒 Privacy</a>
          <a className="link link-hover hover:text-warning transition-colors">🍪 Cookies</a>
          <a className="link link-hover hover:text-warning transition-colors">📋 Disclaimer</a>
        </nav>
      </div>

      <div className="divider my-0"></div>

      {/* Bottom Footer */}
      <div className="footer footer-center bg-base-200 text-base-content p-6 border-t border-base-300">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between w-full max-w-7xl">
          {/* Social Links */}
          <div className="flex gap-4">
            <a className="link link-hover" title="Facebook">
              <button className="btn btn-circle btn-ghost text-lg">
                f
              </button>
            </a>
            <a className="link link-hover" title="Twitter">
              <button className="btn btn-circle btn-ghost text-lg">
                𝕏
              </button>
            </a>
            <a className="link link-hover" title="Instagram">
              <button className="btn btn-circle btn-ghost text-lg">
                📷
              </button>
            </a>
            <a className="link link-hover" title="YouTube">
              <button className="btn btn-circle btn-ghost text-lg">
                ▶️
              </button>
            </a>
            <a className="link link-hover" title="LinkedIn">
              <button className="btn btn-circle btn-ghost text-lg">
                in
              </button>
            </a>
          </div>

          {/* Copyright & Contact */}
          <div className="text-center text-sm text-base-content/70">
            <p>
              © {currentYear} FoodHub Restaurant. All rights reserved. | 
              <a href="tel:+91-XXXXXXXXXX" className="link link-primary ml-2">
                📞 +91-XXXXXXXXXX
              </a>
            </p>
          </div>

          {/* Newsletter Signup */}
          <div className="flex gap-2">
            <input
              type="email"
              placeholder="📧 Enter your email"
              className="input input-bordered input-sm rounded-full"
            />
            <button className="btn btn-primary btn-sm rounded-full">Subscribe</button>
          </div>
        </div>
      </div>

      {/* Footer Badge */}
      <div className="text-center py-3 bg-primary text-primary-content text-xs font-semibold">
        ✨ Made with ❤️ for food lovers everywhere
      </div>
    </footer>
  );
};

export default Footer;

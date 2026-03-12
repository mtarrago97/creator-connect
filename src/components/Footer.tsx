const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div>
          <span className="font-display text-xl font-bold text-gradient-primary">auctio</span>
          <p className="text-sm text-muted-foreground mt-2">The creator-fan auction marketplace. Own what matters.</p>
        </div>
        {[
          { title: "Marketplace", links: ["Explore", "Live Auctions", "Categories", "Creators"] },
          { title: "Company", links: ["About", "Careers", "Blog", "Press"] },
          { title: "Support", links: ["Help Center", "Trust & Safety", "Terms", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-6 text-center text-xs text-muted-foreground">
        © 2026 Auctio. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;

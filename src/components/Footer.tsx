const Footer = () => (
  <footer className="border-t border-border py-16">
    <div className="max-w-[1200px] mx-auto px-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
        <div className="lg:col-span-2">
          <span className="font-display text-xl font-semibold text-foreground">auctio</span>
          <p className="text-sm text-muted-foreground mt-3 max-w-xs leading-relaxed">
            The creator-fan auction marketplace. Own objects and experiences that matter.
          </p>
        </div>
        {[
          { title: "Marketplace", links: ["Explore", "Live Auctions", "Experiences", "Objects", "Categories"] },
          { title: "Company", links: ["About", "Careers", "Blog", "Press", "Partners"] },
          { title: "Support", links: ["Help Center", "Trust & Safety", "Terms", "Privacy", "Contact"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-display font-semibold text-sm text-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-muted-foreground">© 2026 Auctio. All rights reserved.</p>
        <div className="flex gap-6">
          {["Twitter", "Instagram", "Discord", "LinkedIn"].map((s) => (
            <a key={s} href="#" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{s}</a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

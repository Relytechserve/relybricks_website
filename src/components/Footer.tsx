import Link from "next/link";
import Logo from "./Logo";

const footerServices = [
  "Tenant Management",
  "Maintenance & Repair",
  "Interior Design",
  "Buying & Selling",
  "Land/Plot Maintenance",
];

const footerLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <Logo variant="full" />
            </Link>
            <p className="mt-4 text-sm leading-relaxed max-w-xs">
              We love helping homeowners maintain their valuable investment.
              Trusted property management in Chennai with digital solutions.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Our Services</h4>
            <ul className="space-y-2">
              {footerServices.map((service) => (
                <li key={service}>
                  <Link href="/services" className="hover:text-white transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <p className="text-sm">Chennai, India</p>
            <p className="mt-3">
              <a
                href="tel:+919952004948"
                className="hover:text-white transition-colors font-medium"
              >
                +91 99520 04948
              </a>
            </p>
            <p className="mt-3">
              <a
                href="mailto:info@relybricks.com"
                className="hover:text-white transition-colors"
              >
                info@relybricks.com
              </a>
            </p>
            <p className="mt-3">
              <a
                href="https://www.linkedin.com/company/relybricks-property-management"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors inline-flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-stone-700 text-center">
          <p className="text-sm text-stone-500">
            © {new Date().getFullYear()} RelyBricks. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

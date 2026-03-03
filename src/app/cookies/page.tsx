import Link from "next/link";

export const metadata = {
  title: "Cookie Policy | RelyBricks",
  description: "Cookie policy for RelyBricks - how we use cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <div>
      <section className="bg-gradient-to-br from-accent-700 to-stone-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-white">Cookie Policy</h1>
          <p className="mt-4 text-xl text-stone-300 max-w-2xl">
            Last updated:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </section>

      <section className="py-16 bg-stone-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-stone prose-lg max-w-none">
          <h2>1. What Are Cookies?</h2>
          <p>
            Cookies are small text files stored on your device when you visit a website. They help
            websites remember your preferences, understand how you use the site, and improve your
            experience. We also use similar technologies such as pixel tags and local storage.
          </p>

          <h2>2. How We Use Cookies</h2>
          <p>
            RelyBricks uses cookies and similar technologies to provide, secure, and improve our
            website. We use both first-party cookies (set by us) and third-party cookies (set by
            our service providers).
          </p>

          <h2>3. Types of Cookies We Use</h2>

          <h3>Strictly Necessary Cookies</h3>
          <p>
            These are essential for the website to function. They enable core features such as
            security and form submission. You cannot opt out of these.
          </p>

          <h3>Analytics Cookies</h3>
          <p>
            We may use analytics tools to understand how visitors use our website. These cookies
            collect information such as pages visited, time on site, and referral sources. This
            helps us improve our website and services.
          </p>
          <table className="w-full text-sm border-collapse border border-stone-300">
            <thead>
              <tr className="bg-stone-100">
                <th className="border border-stone-300 p-2 text-left">Cookie</th>
                <th className="border border-stone-300 p-2 text-left">Provider</th>
                <th className="border border-stone-300 p-2 text-left">Purpose</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-stone-300 p-2">_ga</td>
                <td className="border border-stone-300 p-2">Google Analytics</td>
                <td className="border border-stone-300 p-2">Distinguishes users</td>
              </tr>
              <tr>
                <td className="border border-stone-300 p-2">_ga_*</td>
                <td className="border border-stone-300 p-2">Google Analytics</td>
                <td className="border border-stone-300 p-2">Persists session state</td>
              </tr>
              <tr>
                <td className="border border-stone-300 p-2">_gid</td>
                <td className="border border-stone-300 p-2">Google Analytics</td>
                <td className="border border-stone-300 p-2">Distinguishes users</td>
              </tr>
            </tbody>
          </table>

          <h3>Functional Cookies</h3>
          <p>
            These remember your preferences, such as cookie consent choices, so we can provide a
            more personalised experience on repeat visits.
          </p>

          <h2>4. Cookie Consent</h2>
          <p>
            When you first visit our website, a cookie consent banner may appear. You can choose to
            accept all cookies, accept only necessary cookies, or manage your preferences. Your
            choice is stored so we do not ask again on subsequent visits. You can change your
            preferences at any time by clearing your browser cookies or contacting us.
          </p>

          <h2>5. Managing Cookies</h2>
          <p>
            You can control and delete cookies through your browser settings. Most browsers allow
            you to block third-party cookies, block cookies from specific sites, or block all
            cookies. Please note that blocking certain cookies may affect website functionality.
          </p>
          <p>
            For more information:{" "}
            <a
              href="https://www.aboutcookies.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-600 hover:underline"
            >
              aboutcookies.org
            </a>
          </p>

          <h2>6. Third-Party Cookies</h2>
          <p>
            Our website may include content or services from third parties (e.g. analytics
            providers). These providers may set their own cookies. We encourage you to review their
            privacy policies:
          </p>
          <ul>
            <li>
              Google:{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent-600 hover:underline"
              >
                policies.google.com/privacy
              </a>
            </li>
          </ul>

          <h2>7. Updates</h2>
          <p>
            We may update this Cookie Policy from time to time to reflect changes in our practices
            or for legal reasons. The &quot;Last updated&quot; date at the top indicates when changes were
            last made.
          </p>

          <h2>8. Contact</h2>
          <p>
            For questions about our use of cookies, contact us at{" "}
            <a href="mailto:info@relybricks.com" className="text-accent-600 hover:underline">
              info@relybricks.com
            </a>
            . For our general privacy practices, see our{" "}
            <Link href="/privacy" className="text-accent-600 hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}

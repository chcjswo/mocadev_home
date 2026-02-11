import type { Metadata } from 'next';
import { PageSEO } from '@/components/seo';
import { pageDefaults, seoConfig } from '@/lib/seo/config';

export const metadata: Metadata = {
  title: 'MokaDev Privacy Policy',
  description:
    'Privacy policy applicable to MokaDev services including Bapjeongne, Fortune Cookie, and Lunch Picker apps.',
  keywords: 'MokaDev privacy policy, privacy protection, terms',
  openGraph: {
    title: 'MokaDev Privacy Policy',
    description:
      'Privacy policy applicable to MokaDev services including Bapjeongne, Fortune Cookie, and Lunch Picker apps.',
    url: `${seoConfig.siteUrl}/privacy/en`,
    siteName: seoConfig.siteName,
    images: [
      {
        url: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
        width: 1200,
        height: 630,
        alt: 'MokaDev Privacy Policy',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'MokaDev Privacy Policy',
    description:
      'Privacy policy applicable to MokaDev services including Bapjeongne, Fortune Cookie, and Lunch Picker apps.',
  },
  alternates: {
    canonical: `${seoConfig.siteUrl}/privacy/en`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function PrivacyPageEN() {
  return (
    <>
      <PageSEO
        title="MokaDev Privacy Policy"
        description="Privacy policy applicable to MokaDev services including Bapjeongne, Fortune Cookie, and Lunch Picker apps."
        keywords="MokaDev privacy policy, privacy protection, terms"
        canonical="/privacy/en"
      />
      <div className="bg-white">
        <section className="border-b border-black/5 bg-gradient-to-r from-indigo-50 to-purple-50">
          <div className="mx-auto max-w-4xl px-4 py-16">
            <p className="text-sm font-semibold text-gray-500">Privacy Policy</p>
            <h1 className="mt-2 text-4xl font-bold text-gray-900">Privacy Policy</h1>
          </div>
        </section>

        <div className="mx-auto max-w-4xl space-y-12 px-4 py-16 text-sm text-gray-700">
          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 1 (Purpose)</h2>
            <p className="mt-4 leading-relaxed">
              MokaDev (hereinafter referred to as the &lsquo;Company&rsquo;) establishes this Privacy
              Policy (hereinafter referred to as the &lsquo;Policy&rsquo;) to protect the personal
              information (hereinafter referred to as &lsquo;Personal Information&rsquo;) of
              individuals (hereinafter referred to as &lsquo;Users&rsquo; or
              &lsquo;Individuals&rsquo;) who use the services provided by the Company (hereinafter
              referred to as &lsquo;Company Services&rsquo;), in compliance with relevant laws and
              regulations such as the Personal Information Protection Act and the Act on Promotion of
              Information and Communications Network Utilization and Information Protection (hereinafter
              referred to as the &lsquo;Information and Communications Network Act&rsquo;), and to
              promptly and smoothly handle complaints related to personal information protection of
              service users.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 2 (Principles of Personal Information Processing)</h2>
            <p className="mt-4 leading-relaxed">
              In accordance with relevant laws and regulations on personal information and this Policy,
              the Company may collect users&rsquo; personal information, and collected personal
              information may be provided to third parties only with the individual&rsquo;s consent.
              However, the Company may provide users&rsquo; personal information collected to third
              parties without prior consent of the individual if it is legally required by laws and
              regulations.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 3 (Disclosure of This Policy)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                The Company discloses this Policy on the first screen of the Company&rsquo;s homepage
                or a screen connected to the first screen so that users can easily check this Policy
                at any time.
              </li>
              <li>
                When the Company discloses this Policy in accordance with Paragraph 1, it uses font
                size, color, etc. to help users easily check this Policy.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 4 (Changes to This Policy)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                This Policy may be amended in accordance with changes in laws, guidelines, notices, or
                policies or contents of the government or Company Services related to personal
                information.
              </li>
              <li>
                When the Company amends this Policy in accordance with Paragraph 1, it notifies users
                by one or more of the following methods:
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>
                    Notification through the notice section on the first screen of the Internet homepage
                    operated by the Company or a separate window
                  </li>
                  <li>
                    Notification to users by written notice, facsimile transmission, e-mail, or similar
                    methods
                  </li>
                </ol>
              </li>
              <li>
                The Company provides notice under Paragraph 2 at least 7 days before the effective date
                of the amendment to this Policy. However, if there are important changes to user
                rights, notice is provided at least 30 days in advance.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 5 (Methods of Collecting Personal Information)</h2>
            <p className="mt-4 leading-relaxed">
              The Company collects users&rsquo; personal information through the following methods:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Method in which users enter their personal information on the Company&rsquo;s homepage
              </li>
              <li>
                Method in which users enter their personal information through services other than the
                homepage provided by the Company, such as applications
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 6 (Use of Personal Information)</h2>
            <p className="mt-4 leading-relaxed">
              The Company uses personal information in the following cases:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>When necessary for Company operations, such as delivery of notices</li>
              <li>
                When necessary for service improvement for users, such as responding to inquiries and
                handling complaints
              </li>
              <li>When necessary to provide the Company&rsquo;s services</li>
              <li>
                When necessary to prevent and sanction acts that interfere with the smooth operation of
                services, including measures to restrict use of members who violate laws and Company
                terms, and fraudulent use
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 7 (Retention and Use Period of Personal Information)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                The Company retains and uses users&rsquo; personal information for the period necessary
                to achieve the purpose of collecting and using personal information.
              </li>
              <li>
                Notwithstanding the foregoing, the Company retains records of fraudulent use of services
                for up to 1 year from the time of membership withdrawal in accordance with internal
                policies to prevent fraudulent registration and use.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Article 8 (Retention and Use Period of Personal Information under Laws)
            </h2>
            <p className="mt-4 leading-relaxed">
              The Company retains and uses personal information in accordance with relevant laws as
              follows:
            </p>
            <ol className="mt-4 list-decimal space-y-4 pl-5 leading-relaxed">
              <li>
                Information and retention period under the Act on Consumer Protection in Electronic
                Commerce
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Records on contracts or withdrawal of offers: 5 years</li>
                  <li>Records on payment and supply of goods: 5 years</li>
                  <li>Records on consumer complaints or dispute resolution: 3 years</li>
                  <li>Records on labeling and advertising: 6 months</li>
                </ol>
              </li>
              <li>
                Information and retention period under the Communication Secrets Protection Act
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Website log records: 3 months</li>
                </ol>
              </li>
              <li>
                Information and retention period under the Electronic Financial Transactions Act
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Records on electronic financial transactions: 5 years</li>
                </ol>
              </li>
              <li>
                Act on the Protection and Use of Location Information
                <ol className="mt-2 list-[lower-alpha] space-y-1 pl-5">
                  <li>Records on personal location information: 6 months</li>
                </ol>
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 9 (Principle of Destruction of Personal Information)</h2>
            <p className="mt-4 leading-relaxed">
              In principle, the Company destroys personal information without delay when it is no longer
              necessary, such as when the purpose of processing personal information is achieved or the
              retention and use period has elapsed.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 10 (Procedure for Destruction of Personal Information)</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Information entered by users for membership registration, etc., is moved to a separate
                database (or a separate document box in case of paper) after the purpose of processing
                personal information is achieved, stored for a certain period in accordance with
                internal policies and other relevant laws on information protection (refer to retention
                and use period), and then destroyed.
              </li>
              <li>
                The Company destroys personal information for which the reason for destruction has
                occurred after obtaining approval from the person in charge of personal information
                protection.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 11 (Method of Destruction of Personal Information)</h2>
            <p className="mt-4 leading-relaxed">
              The Company deletes personal information stored in electronic file format using technical
              methods that cannot reproduce records, and destroys personal information printed on paper
              by shredding or incineration.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Article 12 (Installation, Operation, and Refusal of Automatic Collection of Personal Information)
            </h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                The Company uses cookies, which are automatic collection devices for personal
                information (hereinafter referred to as &lsquo;Cookies&rsquo;) that store and retrieve
                usage information from time to time to provide users with individualized services.
                Cookies are small amounts of information sent by the server (http) used to operate the
                website to the user&rsquo;s web browser (including PC and mobile), and may be stored in
                the user&rsquo;s storage space.
              </li>
              <li>
                Users have the right to choose whether to install cookies. Therefore, users can allow
                all cookies, check each time cookies are stored, or refuse to store all cookies by
                setting options in their web browser.
              </li>
              <li>
                However, if you refuse to store cookies, you may have difficulty using some of the
                Company&rsquo;s services that require login.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Article 13 (Method of Specifying Cookie Installation Permission)</h2>
            <p className="mt-4 leading-relaxed">
              You can set cookie permissions, cookie blocking, etc. through web browser option settings.
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 leading-relaxed">
              <li>
                Edge: Settings menu in the upper right corner of the web browser &gt; Cookies and site
                permissions &gt; Manage and delete cookies and site data
              </li>
              <li>
                Chrome: Settings menu in the upper right corner of the web browser &gt; Privacy and
                security &gt; Cookies and other site data
              </li>
              <li>
                Whale: Settings menu in the upper right corner of the web browser &gt; Privacy &gt;
                Cookies and other site data
              </li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">
              Article 14 (Designation of Company&rsquo;s Personal Information Protection Officer)
            </h2>
            <p className="mt-4 leading-relaxed">
              The Company designates the relevant department and personal information protection officer
              as follows to protect users&rsquo; personal information and handle complaints related to
              personal information.
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-semibold text-gray-900">A. Personal Information Protection Officer</p>
              <ol className="mt-2 list-decimal space-y-1 pl-5">
                <li>Name: Mincheol Jeon</li>
                <li>Position: CEO</li>
                <li>Email: mocadev.tony@gmail.com</li>
              </ol>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900">Supplementary Provisions</h2>
            <p className="mt-4 leading-relaxed">Article 1 This Policy takes effect from November 10, 2025.</p>
          </section>
        </div>
      </div>
    </>
  );
}

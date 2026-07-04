import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function PrivacyPolicy() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#003d99] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Privacy Policy</h1>
          <p className="text-[#ff9500] text-lg">Rental Manager Pro</p>
        </div>

        {/* Privacy Card */}
        <Card className="bg-white/95 border-[#ff9500] border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-[#001a4d]">🔒 Your Privacy Matters</CardTitle>
            <CardDescription>How we handle your data and information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">1. Information We Collect</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Rental Manager Pro collects the following information:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Account information (name, email, phone number)</li>
                <li>Property details and rental information</li>
                <li>Tenant information and lease details</li>
                <li>Payment and transaction records</li>
                <li>Usage data and analytics</li>
                <li>Device information and IP address</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">2. How We Use Your Information</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We use the collected information for:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Providing and improving the service</li>
                <li>Processing transactions and payments</li>
                <li>Sending notifications and updates</li>
                <li>Analyzing usage patterns and trends</li>
                <li>Complying with legal obligations</li>
                <li>Preventing fraud and ensuring security</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">3. Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security of your information. You are responsible for maintaining the confidentiality of your login credentials.
              </p>
            </div>

            {/* Section 4 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">4. Third-Party Sharing</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                We may share your information with:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Payment processors and financial institutions</li>
                <li>SMS and email service providers</li>
                <li>Analytics and data analysis services</li>
                <li>Legal authorities when required by law</li>
              </ul>
              <p className="text-gray-700 leading-relaxed mt-2">
                We do not sell your personal information to third parties.
              </p>
            </div>

            {/* Section 5 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">5. Cookies and Tracking</h3>
              <p className="text-gray-700 leading-relaxed">
                Rental Manager Pro uses cookies and similar tracking technologies to enhance user experience and collect analytics data. You can control cookie settings through your browser preferences.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">6. Data Retention</h3>
              <p className="text-gray-700 leading-relaxed">
                We retain your data as long as your account is active. Upon account deletion, we will remove your personal information within 30 days, except where we are required by law to retain it.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">7. Your Rights</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Export your data</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">8. Children's Privacy</h3>
              <p className="text-gray-700 leading-relaxed">
                Rental Manager Pro is not intended for children under 18 years of age. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information, we will take steps to delete such information.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">9. Changes to Privacy Policy</h3>
              <p className="text-gray-700 leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on the app and updating the "Last Updated" date.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">10. Contact Us</h3>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about this privacy policy or our privacy practices, please contact us through the app's support section.
              </p>
            </div>

            {/* Important Notice */}
            <div className="border-t pt-4 bg-yellow-50 p-4 rounded-lg border-l-4 border-[#ff9500]">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-2">📌 Important</h3>
              <p className="text-gray-700">
                <strong>The developer is NOT responsible for any data breaches, unauthorized access, or misuse of your information by third parties. You use this service at your own risk.</strong>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-center">
          <Button
            onClick={() => setLocation("/")}
            className="bg-[#ff9500] hover:bg-[#ff9500]/90 text-[#001a4d] font-semibold px-8"
          >
            I Understand
          </Button>
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            className="border-white text-white hover:bg-white/10 px-8"
          >
            Go Back
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70 text-sm">
          <p>Rental Manager Pro - Privacy Policy</p>
          <p>Developed by Shahid Ibn Rashid</p>
          <p className="mt-2">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

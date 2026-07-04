import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function Disclaimer() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#003d99] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Disclaimer & Legal Notice</h1>
          <p className="text-[#ff9500] text-lg">Rental Manager Pro</p>
        </div>

        {/* Disclaimer Card */}
        <Card className="bg-white/95 border-[#ff9500] border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-[#001a4d]">⚠️ Important Disclaimer</CardTitle>
            <CardDescription>Please read carefully before using this application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">1. No Liability for Fraud or Scams</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>The developer (Shahid Ibn Rashid) and all associated parties are NOT responsible for any fraud, scams, illegal activities, or unauthorized use of this application.</strong> Users are solely responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Protecting their login credentials and passwords</li>
                <li>Verifying all transactions and payments</li>
                <li>Reporting suspicious activities immediately</li>
                <li>Complying with all applicable laws and regulations</li>
                <li>Using the application only for lawful purposes</li>
              </ul>
            </div>

            {/* Section 2 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">2. User Responsibility</h3>
              <p className="text-gray-700 leading-relaxed">
                By using Rental Manager Pro, you acknowledge that:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>You are responsible for all activities under your account</li>
                <li>You will not use this app for illegal or fraudulent purposes</li>
                <li>You will not attempt to hack, breach, or compromise the system</li>
                <li>You will not share your credentials with unauthorized persons</li>
                <li>You will report any suspicious activity immediately</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">3. No Warranty</h3>
              <p className="text-gray-700 leading-relaxed">
                This application is provided "AS IS" without any warranties, express or implied. The developer does not guarantee:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Uninterrupted service or availability</li>
                <li>Accuracy of all data or calculations</li>
                <li>Protection against all security threats</li>
                <li>Recovery of lost or deleted data</li>
                <li>Compatibility with all devices or browsers</li>
              </ul>
            </div>

            {/* Section 4 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">4. Data Security</h3>
              <p className="text-gray-700 leading-relaxed">
                While we implement security measures, no system is 100% secure. Users are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Keeping their passwords confidential and strong</li>
                <li>Using secure networks when accessing the app</li>
                <li>Logging out after each session</li>
                <li>Reporting any unauthorized access immediately</li>
                <li>Understanding that data breaches can occur</li>
              </ul>
            </div>

            {/* Section 5 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">5. Limitation of Liability</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>In no event shall the developer be liable for any damages, losses, or claims arising from:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Use or misuse of this application</li>
                <li>Unauthorized access to user accounts</li>
                <li>Loss of data or financial losses</li>
                <li>Service interruptions or downtime</li>
                <li>Third-party actions or fraud</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </div>

            {/* Section 6 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">6. Fraud Prevention</h3>
              <p className="text-gray-700 leading-relaxed">
                <strong>If you suspect any fraudulent activity:</strong>
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Stop using the application immediately</li>
                <li>Change your password</li>
                <li>Contact support with details</li>
                <li>Report to relevant authorities if necessary</li>
                <li>Do NOT share sensitive information via email</li>
              </ul>
            </div>

            {/* Section 7 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">7. Third-Party Services</h3>
              <p className="text-gray-700 leading-relaxed">
                This application may integrate with third-party services (payment gateways, SMS providers, email services, etc.). The developer is NOT responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Actions or failures of third-party services</li>
                <li>Data handling by third parties</li>
                <li>Security breaches in third-party systems</li>
                <li>Charges or fees imposed by third parties</li>
              </ul>
            </div>

            {/* Section 8 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">8. Compliance & Legal</h3>
              <p className="text-gray-700 leading-relaxed">
                Users must comply with all applicable laws and regulations including:
              </p>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                <li>Local, state, and national laws</li>
                <li>Data protection and privacy regulations</li>
                <li>Financial and tax regulations</li>
                <li>Terms of service of this application</li>
                <li>Intellectual property rights</li>
              </ul>
            </div>

            {/* Section 9 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">9. Acknowledgment</h3>
              <p className="text-gray-700 leading-relaxed font-semibold bg-yellow-50 p-4 rounded-lg border-l-4 border-[#ff9500]">
                By using Rental Manager Pro, you acknowledge that you have read, understood, and agree to this disclaimer. You accept all risks associated with using this application and assume full responsibility for your actions.
              </p>
            </div>

            {/* Section 10 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">10. Changes to Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed">
                The developer reserves the right to modify this disclaimer at any time. Continued use of the application after changes constitutes acceptance of the new terms.
              </p>
            </div>

            {/* Contact Section */}
            <div className="border-t pt-4 bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-2">Questions or Concerns?</h3>
              <p className="text-gray-700">
                If you have any questions about this disclaimer or concerns about your account, please contact support immediately. Do not ignore suspicious activities.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Acknowledgment Section */}
        <Card className="bg-[#001a4d] border-[#ff9500] border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-white">📋 User Acknowledgment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 p-4 rounded-lg border border-[#ff9500]">
              <p className="text-white font-semibold mb-3">
                ✓ I have read and understood this disclaimer
              </p>
              <p className="text-white/90 text-sm leading-relaxed mb-4">
                I acknowledge that I am solely responsible for my use of Rental Manager Pro. I understand that the developer (Shahid Ibn Rashid) is not responsible for any fraud, scams, data loss, or unauthorized access. I will use this application only for lawful purposes and will protect my credentials.
              </p>
              <p className="text-[#ff9500] font-semibold text-sm">
                Last Updated: July 4, 2026
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
            I Agree & Continue
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
          <p>Rental Manager Pro - Disclaimer & Legal Notice</p>
          <p>Developed by Shahid Ibn Rashid</p>
          <p className="mt-2">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

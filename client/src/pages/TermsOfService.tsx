import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function TermsOfService() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#001a4d] to-[#003d99] p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-[#ff9500] text-lg">Rental Manager Pro</p>
        </div>

        {/* Terms Card */}
        <Card className="bg-white/95 border-[#ff9500] border-2 mb-6">
          <CardHeader>
            <CardTitle className="text-[#001a4d]">📋 Terms & Conditions</CardTitle>
            <CardDescription>Please read these terms carefully</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Section 1 */}
            <div>
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">1. Acceptance of Terms</h3>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using Rental Manager Pro, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            {/* Section 2 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">2. Use License</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                Permission is granted to temporarily download one copy of the materials (information or software) on Rental Manager Pro for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the app</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
              </ul>
            </div>

            {/* Section 3 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">3. Disclaimer</h3>
              <p className="text-gray-700 leading-relaxed">
                The materials on Rental Manager Pro are provided on an 'as is' basis. The developer makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </div>

            {/* Section 4 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">4. Limitations</h3>
              <p className="text-gray-700 leading-relaxed">
                In no event shall Rental Manager Pro or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Rental Manager Pro, even if the developer or an authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </div>

            {/* Section 5 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">5. Accuracy of Materials</h3>
              <p className="text-gray-700 leading-relaxed">
                The materials appearing on Rental Manager Pro could include technical, typographical, or photographic errors. The developer does not warrant that any of the materials on the app are accurate, complete, or current. The developer may make changes to the materials contained on the app at any time without notice.
              </p>
            </div>

            {/* Section 6 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">6. Links</h3>
              <p className="text-gray-700 leading-relaxed">
                The developer has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by the developer of the site. Use of any such linked website is at the user's own risk.
              </p>
            </div>

            {/* Section 7 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">7. Modifications</h3>
              <p className="text-gray-700 leading-relaxed">
                The developer may revise these terms of service for the app at any time without notice. By using this app, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </div>

            {/* Section 8 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">8. Governing Law</h3>
              <p className="text-gray-700 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction where the developer is located, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </div>

            {/* Section 9 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">9. User Conduct</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                You agree not to use the app for any purpose that is unlawful or prohibited by these terms, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                <li>Harassing or causing distress or inconvenience to any person</li>
                <li>Obscene or offensive statements or otherwise abusive behavior</li>
                <li>Disrupting the normal flow of dialogue within the app</li>
                <li>Attempting to gain unauthorized access to systems</li>
                <li>Transmitting obscene or offensive material</li>
              </ul>
            </div>

            {/* Section 10 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">10. Account Responsibility</h3>
              <p className="text-gray-700 leading-relaxed">
                If you create an account on Rental Manager Pro, you are responsible for maintaining the confidentiality of your account information and password and for restricting access to your computer. You agree to accept responsibility for all activities that occur under your account or password. You must notify the developer immediately of any unauthorized uses of your account.
              </p>
            </div>

            {/* Section 11 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">11. Intellectual Property Rights</h3>
              <p className="text-gray-700 leading-relaxed">
                All content included on the app, such as text, graphics, logos, images, and software, is the property of the developer or its content suppliers and is protected by international copyright laws.
              </p>
            </div>

            {/* Section 12 */}
            <div className="border-t pt-4">
              <h3 className="text-lg font-semibold text-[#001a4d] mb-3">12. Termination</h3>
              <p className="text-gray-700 leading-relaxed">
                The developer may terminate your use of the app and any related services provided at any time, for any reason, including if the developer believes you have violated these terms of service.
              </p>
            </div>

            {/* Important Notice */}
            <div className="border-t pt-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
              <h3 className="text-lg font-semibold text-red-700 mb-2">⚠️ Important Notice</h3>
              <p className="text-gray-700">
                <strong>The developer (Shahid Ibn Rashid) is NOT responsible for any fraud, scams, data loss, unauthorized access, or any other damages arising from your use of this application. You use this service at your own risk and assume full responsibility for all consequences.</strong>
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
            I Accept
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
          <p>Rental Manager Pro - Terms of Service</p>
          <p>Developed by Shahid Ibn Rashid</p>
          <p className="mt-2">© 2026 All Rights Reserved</p>
        </div>
      </div>
    </div>
  );
}

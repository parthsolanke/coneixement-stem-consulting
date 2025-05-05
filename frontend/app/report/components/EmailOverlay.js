import { SignInButton } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";

const EmailOverlay = ({ onSubmit, isSubmitting }) => {
  const { isSignedIn, user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignedIn) {
      onSubmit({
        name: user.fullName,
        email: user.primaryEmailAddress.emailAddress
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-xl">
        {isSignedIn ? (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Send Report to Email
            </h2>
            <p className="text-gray-600 mb-6">
              We'll send a copy of this report to your email address: {user.primaryEmailAddress.emailAddress}
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition disabled:bg-blue-400"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                    Sending...
                  </div>
                ) : (
                  'Send Report'
                )}
              </button>
            </form>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Sign in to View Report
            </h2>
            <p className="text-gray-600 mb-6">
              Please sign in to view and receive a copy of your STEM career report.
            </p>
            <SignInButton className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition">
              Sign In
            </SignInButton>
          </>
        )}
      </div>
    </div>
  );
};

export default EmailOverlay;

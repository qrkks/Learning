import { useState } from 'react';

function CookieConsent() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="fixed bottom-0 left-0 flex items-center justify-between w-full p-4 text-center text-white bg-gray-800">
          <p className="text-sm">
            We use cookies to improve your experience. By continuing, you agree to our privacy policy.
          </p>
          <button
            className="px-4 py-2 text-white transition duration-200 bg-blue-500 rounded hover:bg-blue-600"
            onClick={() => setShow(false)}
          >
            Agree
          </button>
        </div>
      )}
    </>
  );
}

export default CookieConsent;

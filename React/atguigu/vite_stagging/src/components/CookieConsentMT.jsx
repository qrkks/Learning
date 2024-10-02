import { useState } from 'react';
import { Button } from '@material-tailwind/react';

function CookieConsent() {
  const [show, setShow] = useState(true);

  return (
    <>
      {show && (
        <div className="fixed bottom-0 left-0 flex items-center justify-between w-full p-4 text-center text-white bg-gray-800">
          <p className="text-sm">
            We use cookies to improve your experience. By continuing, you agree to our privacy policy.
          </p>
          <Button
            color="blue"
            onClick={() => setShow(false)}
            ripple="light"
            className="text-white"
          >
            Agree
          </Button>
        </div>
      )}
    </>
  );
}

export default CookieConsent;

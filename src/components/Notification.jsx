import { useEffect } from 'react';

// This component shows success or error messages to the user
// It automatically disappears after 3 seconds
function Notification({ message, type }) {
  // If there's no message, don't show anything
  if (!message) return null;

  return (
    <div className={`notification notification-${type}`}>
      {message}
    </div>
  );
}

export default Notification;

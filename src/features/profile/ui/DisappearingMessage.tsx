import React, {useState, useEffect} from 'react';

const DEFAULT_TIMEOUT = 3000;

const MessageType = {
  DEFAULT: 'default',
  ERROR: 'error',
  SUCCESS: 'success',
};

const ERROR_ICON = 'path-to-your-error-icon'; // Define the error icon path here

interface DisappearingMessageProps {
  message: string;
  timeout?: number;
  type?: string;
  styleClass?: string;
  fixed?: boolean;
  messageDisappeared?: () => void;
}

const DisappearingMessage: React.FC<DisappearingMessageProps> = ({
  message,
  timeout = DEFAULT_TIMEOUT,
  type = MessageType.DEFAULT,
  styleClass = '',
  fixed = false,
  messageDisappeared = () => {},
}) => {
  const [displayedMessage, setDisplayedMessage] = useState(message);
  const [dynamicType, setDynamicType] = useState(type);

  useEffect(() => {
    setDisplayedMessage(message);
    setDynamicType(type);

    const timeoutId = setTimeout(() => {
      setDisplayedMessage('');
      if (messageDisappeared) {
        messageDisappeared();
      }
    }, timeout);

    return () => clearTimeout(timeoutId);
  }, [message, timeout, type, messageDisappeared]);

  if (!displayedMessage) {
    return null;
  }

  return (
    <div
      className={`disappearing-message ${dynamicType} ${styleClass} ${fixed ? 'fixed' : ''}`}
    >
      {dynamicType === MessageType.ERROR && (
        <img src={ERROR_ICON} alt="Error Icon" />
      )}
      <span>{displayedMessage}</span>
    </div>
  );
};

export default DisappearingMessage;

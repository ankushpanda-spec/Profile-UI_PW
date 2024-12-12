import React, { useRef, useState } from 'react';
import { InputField } from '@pw-tech/omni-ui'; // Assuming InputField is from omni-ui

const OtpComponent = ({
  otpLength = 6,
  onChange,
  isLoading = false,
}: {
  otpLength?: number; // Number of OTP inputs
  onChange: (otp: string) => void; // Callback to get the complete OTP value
  isLoading?: boolean; // Disable input fields if loading
}) => {
  const containerRefs = useRef<(HTMLDivElement | null)[]>([]); // Refs for parent divs
  const [otpValues, setOtpValues] = useState<string[]>(Array(otpLength).fill(''));

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    if (/^\d$/.test(value)) {
      const updatedValues = [...otpValues];
      updatedValues[index] = value;
      setOtpValues(updatedValues);
      onChange(updatedValues.join('')); // Notify parent with the OTP

      // Move to the next input if not the last
      if (index < otpLength - 1) {
        const nextInput = containerRefs.current[index + 1]?.querySelector('input');
        nextInput?.focus();
      }
    } else if (value === '') {
      // Clear the current value
      const updatedValues = [...otpValues];
      updatedValues[index] = '';
      setOtpValues(updatedValues);
    } else {
      e.target.value = ''; // Clear invalid input
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !e.currentTarget.value) {
      const updatedValues = [...otpValues];
      updatedValues[index] = ''; // Clear the current value
      setOtpValues(updatedValues);
      onChange(updatedValues.join('')); // Notify parent with the updated OTP

      // Move to the previous input if not the first
      if (index > 0) {
        const prevInput = containerRefs.current[index - 1]?.querySelector('input');
        prevInput?.focus();
      }
    }
  };

  return (
    <div className="flex gap-[8px] w-full justify-center">
      {Array.from({ length: otpLength }).map((_, index) => (
        <div
          key={index}
          ref={(el) => (containerRefs.current[index] = el)} // Attach ref to parent div
          className="w-[48px] h-[48px] flex items-center justify-center border border-gray-300 rounded-md"
        >
          <InputField
            value={otpValues[index]}
            onChange={(e) => handleInputChange(e, index)}
            maxLength={1}
            placeholder="•"
            disabled={isLoading}
            autoFocus={index === 0} // Auto-focus the first input
            className="text-center text-lg focus:outline-none"
            onKeyDown={(e) => handleKeyDown(e, index)}
          />
        </div>
      ))}
    </div>
  );
};

export default OtpComponent;

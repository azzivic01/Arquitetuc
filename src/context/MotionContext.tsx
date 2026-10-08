/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useReducedMotion as useSystemReducedMotion } from 'motion/react';

interface MotionContextValue {
  isReducedMotion: boolean;
  toggleReducedMotion: () => void;
  setReducedMotion: (value: boolean) => void;
}

const MotionContext = createContext<MotionContextValue>({
  isReducedMotion: false,
  toggleReducedMotion: () => {},
  setReducedMotion: () => {},
});

export const MotionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const systemPrefersReduced = useSystemReducedMotion();
  const [manualOverride, setManualOverride] = useState<boolean | null>(null);

  // When system preference changes, sync it unless manually overridden
  const isReducedMotion = manualOverride !== null ? manualOverride : !!systemPrefersReduced;

  useEffect(() => {
    if (systemPrefersReduced) {
      setManualOverride(true);
    }
  }, [systemPrefersReduced]);

  const toggleReducedMotion = () => {
    setManualOverride((prev) => (prev !== null ? !prev : !systemPrefersReduced));
  };

  const setReducedMotion = (val: boolean) => {
    setManualOverride(val);
  };

  return (
    <MotionContext.Provider
      value={{
        isReducedMotion,
        toggleReducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </MotionContext.Provider>
  );
};

export const useMotionPreference = () => useContext(MotionContext);

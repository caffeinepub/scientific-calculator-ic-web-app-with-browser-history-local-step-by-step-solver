import { useState, useEffect } from 'react';

const PREMIUM_STORAGE_KEY = 'calculator_premium_unlocked';

export function usePremium() {
  const [isPremium, setIsPremium] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  // Load premium status from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(PREMIUM_STORAGE_KEY);
      if (stored === 'true') {
        setIsPremium(true);
      }
    } catch (error) {
      console.error('Failed to load premium status:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Unlock premium and persist to localStorage
  const unlockPremium = () => {
    try {
      localStorage.setItem(PREMIUM_STORAGE_KEY, 'true');
      setIsPremium(true);
    } catch (error) {
      console.error('Failed to save premium status:', error);
    }
  };

  // Reset premium (for development/testing)
  const resetPremium = () => {
    try {
      localStorage.removeItem(PREMIUM_STORAGE_KEY);
      setIsPremium(false);
    } catch (error) {
      console.error('Failed to reset premium status:', error);
    }
  };

  return {
    isPremium,
    isLoading,
    unlockPremium,
    resetPremium,
  };
}

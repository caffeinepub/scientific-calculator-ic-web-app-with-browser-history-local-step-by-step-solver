import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Crown, Heart, CheckCircle2 } from 'lucide-react';

interface PremiumSectionProps {
  isPremium: boolean;
  onUnlock: () => void;
}

export function PremiumSection({ isPremium, onUnlock }: PremiumSectionProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleUnlockClick = () => {
    // Open UPI payment link
    window.open(
      'upi://pay?pa=soumya83918@ptyes&pn=Soumyajit Dutta&tn=AI Premium Feature&am=50&cu=INR',
      '_blank'
    );
    // Show confirmation button
    setShowConfirmation(true);
  };

  const handleConfirmPayment = () => {
    onUnlock();
    setShowConfirmation(false);
  };

  const handleDonateClick = () => {
    window.open(
      'upi://pay?pa=soumya83918@ptyes&pn=Soumyajit Dutta&tn=Donation&cu=INR',
      '_blank'
    );
  };

  if (isPremium) {
    return (
      <div className="bg-card rounded-xl border border-border shadow-sm p-4">
        <div className="flex items-center gap-2 text-primary">
          <Crown className="w-5 h-5" />
          <span className="font-semibold">Premium Unlocked</span>
          <CheckCircle2 className="w-5 h-5 ml-auto" />
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          You have access to detailed step-by-step solutions!
        </p>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-3"
          onClick={handleDonateClick}
        >
          <Heart className="w-4 h-4 mr-2" />
          Support via Donation
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-xl border border-border shadow-sm p-4">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-5 h-5 text-primary" />
        <span className="font-semibold text-foreground">Unlock Premium Features</span>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Get access to detailed step-by-step AI solutions for all calculations.
      </p>

      <div className="space-y-2">
        <Button
          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
          onClick={handleUnlockClick}
        >
          <Crown className="w-4 h-4 mr-2" />
          Unlock Premium (₹50)
        </Button>

        {showConfirmation && (
          <Button
            variant="outline"
            className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-50"
            onClick={handleConfirmPayment}
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            I have paid, unlock premium
          </Button>
        )}

        <Button
          variant="outline"
          size="sm"
          className="w-full"
          onClick={handleDonateClick}
        >
          <Heart className="w-4 h-4 mr-2" />
          Donate via UPI
        </Button>
      </div>
    </div>
  );
}

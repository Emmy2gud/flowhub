import { Gift, CreditCard, Landmark, Layers } from "lucide-react";

export function RewardIcon({ type }) {
  const icons = {
    bank: Landmark,
    paypal: CreditCard,
    visa: CreditCard,
    gift: Gift,
    stack: Layers,
  };

  const Icon = icons[type] || Gift;

  return (
    <div className="flex h-10 w-10 items-center justify-center mx-auto rounded-lg bg-purple-100 text-purple-600">
      <Icon size={20}/>
    </div>
  );
}

import { RewardIcon } from "./RewardIcon";


export default function RewardCard({ reward }: { reward: {
   id: number;
  title: string;
  description: string;
  points: number;
  status: string;
  icon: string;

} }) {
  const isComingSoon = reward.status === "coming-soon";

  return (
    <div className="rounded-xl border border-purple-200 bg-white p-6 shadow-sm text-center">
      {/* Icon */}
      <RewardIcon type={reward.icon} />

      {/* Title */}
      <h3 className="mt-4 text-sm font-semibold text-gray-900">
        {reward.title}
      </h3>

  
      <p className="mt-2 text-xs text-gray-500 leading-relaxed">
        {reward.description}
      </p>

    
      <div className="mt-4 flex items-center justify-center gap-1 text-sm text-purple-600">
        ⭐ {reward.points.toLocaleString()} pts
      </div>

   
      <button
        disabled
        className="mt-4 w-full rounded-md bg-gray-200 py-2 text-xs font-medium text-gray-400 cursor-not-allowed"
      >
        {isComingSoon ? "Coming Soon" : "Locked"}
      </button>
    </div>
  );
}

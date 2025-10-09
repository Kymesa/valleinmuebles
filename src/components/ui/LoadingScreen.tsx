import { Spinner } from "@/components/ui/spinner";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/5 backdrop-blur-xs z-50">
      <Spinner className="w-12 h-12 text-[#7168D3]" />
    </div>
  );
};

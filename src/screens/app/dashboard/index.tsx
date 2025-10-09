import { useAuth } from "@/context/AuthContext";
import { MainDashboard } from "./page";
import { LoadingScreen } from "@/components/ui/LoadingScreen";

export const Dashboard = () => {
  const { loading } = useAuth();

  return (
    <>
      {loading ? <LoadingScreen /> : null}
      <MainDashboard />
    </>
  );
};

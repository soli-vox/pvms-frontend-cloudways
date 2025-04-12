import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const BankDashboard = () => {
  const { slug } = useParams();
  const { user } = useAuth();

  if (user?.slug !== slug) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <div>Bank Dashboard for slug: {slug}</div>;
};

export default BankDashboard;

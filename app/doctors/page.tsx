import getCurrentUser from "../actions/getCurrentUser";
import Navbar from "../components/navbar/Navbar";

export default async function Doctors() {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative pb-10">
      <Navbar page="doctors" currentUser={currentUser} />
    </div>
  );
}

import getCurrentUser from "../actions/getCurrentUser";
import MapComponent from "../components/map/MapComponent";
import Navbar from "../components/navbar/Navbar";

export default async function Ambulance() {
  const currentUser = await getCurrentUser();

  return (
    <div className="relative pb-10">
      <Navbar page="ambulance" currentUser={currentUser} />
      <MapComponent />
    </div>
  );
}

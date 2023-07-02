import getCurrentUser from "../actions/getCurrentUser";
import Destination from "../components/map/Destination";
import MapComponent from "../components/map/MapComponent";
import Navbar from "../components/navbar/Navbar";
export default async function Ambulance() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Navbar page="ambulance" currentUser={currentUser} />
      <div className="flex flex-col justify-start px-20 ">
        <h1 className="text-[50px] font-semibold ">
          <span className="text-red-500">Emergency</span> Services For Ambulance
        </h1>
        <div className="flex px-10 pt-5">
          <div className="flex-1">
            <Destination placeholder="Enter your location" />
          </div>
          <div className="flex-1">
            <MapComponent />
          </div>
        </div>
      </div>
    </>
  );
}

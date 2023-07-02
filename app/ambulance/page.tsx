import getCurrentUser from "../actions/getCurrentUser";
import Destination from "../components/map/Destination";
import MapComponent from "../components/map/MapComponent";
import Navbar from "../components/navbar/Navbar";
export default async function Ambulance() {
  const currentUser = await getCurrentUser();
  return (
    <>
      <Navbar page="ambulance" currentUser={currentUser} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          // alignItems: "center",
          justifyContent: "center",
        }}
      >
        <h1 style={{}}>
          <span style={{ color: "red" }}>Emergency</span> Services For Ambulance
        </h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ flex: 1 }}>
            <Destination />
          </div>
          <div style={{ flex: 1 }}>
            <MapComponent />
          </div>
        </div>
      </div>
    </>
  );
}

import MapComponent from "../../app/components/map/MapComponent";

export default function Ambulance() {
  return (
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
          <div>
            <label>Enter your location</label>
            <input type="text" />
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <MapComponent />
        </div>
      </div>
    </div>
  );
}

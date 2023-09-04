import { AddUserSensor } from "../components/SensorPageComponents/AddUserSensor";
import { AddSensor } from "../components/SensorPageComponents/AddSensor";

export const Sensor = () => {
  return (
    <div>
      <h1>Sensor Page</h1>
      <br></br>
      <AddUserSensor />
      <br></br>
      <AddSensor />
    </div>
  );
};

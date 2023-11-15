import { AddUserSensor } from "../components/SensorPageComponents/AddUserSensor";
import { AddSensor } from "../components/SensorPageComponents/AddSensor";
import { AddSensorType} from "../components/SensorPageComponents/AddSensorType";

export const Sensors = () => {
  return (
    <div>
      <h1>Sensor Page</h1>
      <br></br>
      <AddUserSensor />
      <br></br>
      <AddSensor />
      <br></br>
      <AddSensorType />
      <br></br>
    </div>
  );
};

import { useSensors} from "../../hooks/useSensors";
import { useState, useEffect} from "react";
import {Table} from "react-bootstrap";
import { SensorsActionsDropdownButton} from "../DrowpdownButtons/SensorsActionsDropdownButton";

export const SensorsTableComponent = () => {

    const { getSensors, getSensorsTypes } = useSensors();
    const [sensors, setSensors] = useState([]);
    const [sensorsTypes, setSensorsTypes] = useState([]);

    useEffect(() => {
        const fetchSensorsAndTypes = async () => {
            const sensorsData = await getSensors();
            const sensorsTypesData = await getSensorsTypes();
            if (Array.isArray(sensorsData)) {
                setSensors(sensorsData);
            } else {
                setSensors([]);
            }
            if (Array.isArray(sensorsTypesData)) {
                setSensorsTypes(sensorsTypesData);
            } else {
                setSensorsTypes([]);
            }
        };

        fetchSensorsAndTypes();
    }, []);

    
    return (
        <div>
        <h4>Sensors Table</h4>
        <div className="table-container">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Sensor name</th>
                    <th>Type name</th>
                    <th>Type details</th>
                    <th>Is Active?</th>
                    <th>Unit of measurement</th>
                    <th>Minimum range</th>
                    <th>Maximum range</th>
                    <th>Other details</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {sensors.map((item, index) => {
                    const sensor = item.sensor;
                    return (
                    <tr key={index}>
                        <td>{index}</td>
                        <td>{sensor.sensorName}</td>
                        <td>{sensor.sensorType ? sensor.sensorType.typeName : 'N/A'}</td>
                        <td>{sensor.sensorType ? sensor.sensorType.typeDetails: 'N/A'}</td>
                        <td>{sensor.isActive ? 'Yes' : 'No'}</td>
                        <td>{sensor.unitOfMeasurement ? sensor.unitOfMeasurement : 'N/A'}</td>
                        <td>{sensor.minimumRange ? sensor.minimumRange : 'N/A'}</td>
                        <td>{sensor.maximumRange ? sensor.maximumRange : 'N/A'}</td>
                        <td>{sensor.otherDetails ? sensor.otherDetails : 'N/A'}</td>
                        <td><SensorsActionsDropdownButton /></td>
                    </tr>
                )})}
                </tbody>
            </Table>
        </div>
        </div>
    )
}

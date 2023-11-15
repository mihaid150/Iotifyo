import Container from "react-bootstrap/Container";
import {OneFormControl} from "../Forms/OneFormControl";
import { useState } from 'react'
import {SimpleButton} from "../Buttons/SimpleButton";
import { useSensors} from "../../hooks/useSensors";
import {SucceedDiv} from "../Labels/SucceedDiv";
import {ErrorDiv} from "../Labels/ErrorDiv";

export const AddSensorType = () => {
    const [typeName, setTypeName] = useState('')
    const [typeDetails, setTypeDetails] = useState('')
    const [succeedDiv, setSucceedDiv] = useState('')
    const [errorDiv, setErrorDiv] = useState('')
    const { addSensorType } = useSensors();
    const handleAddSensorType = async (e) => {
        e.preventDefault();
        const type = {
            typeName: typeName,
            typeDetails: typeDetails,
        }
        const response = await addSensorType(type);
        console.log(response);
        if (response.status === 200 || response.status === 201) {
            setSucceedDiv(<SucceedDiv succeedType="sensorTypeSaved" />);
        } else {
            setErrorDiv(<ErrorDiv errorType="sensorTypeNotSaved" />);
        }
    }

    return (
      <div>
          <h4>Sensors Type Creation</h4>
          <Container>
              <OneFormControl hasSetup={false} label="Type name" type="text" id="typeName" setState={setTypeName} placeholder="Type name" />
              <OneFormControl hasSetup={false} label="Type details" type="text" id="typeDetais" setState={setTypeDetails} placeholder="Type details" />
          </Container>
          <br></br>
          <SimpleButton
             variant="small"
             label="Add Sensors Type"
             handleSubmit={handleAddSensorType}
          />
          <br></br>
          <br></br>
          {succeedDiv}
          {errorDiv}
      </div>
    );
}
import {useState} from 'react'
import {OneFormControl} from "../Forms/OneFormControl";
import Container from "react-bootstrap/Container";
import Switch from "react-bootstrap/Switch";
export const ControllerForm = () => {
    const [controllerName, setControllerName] = useState('')
    const [controllerId, setControllerId] = useState('')
    const [controllerAssociations, setControllerAssociations] = useState([])

    const handleControllerAssociationOnChange = (e) => {
        const newControllerAssociation = {
            type: e.target.value,
            label: e.target.value,
        };
        setControllerAssociations([...controllerAssociations, newControllerAssociation]);
    };

    return (
        <div>
            <h1>Controllers Page</h1>
            <Container>
                <OneFormControl hasSetup={false} type="text" id="controllerName" setState={setControllerName} label="Controller Name" placeholder="Controller Name"/>
                <OneFormControl hasSetup={false} type="text" id="controllerId" setState={setControllerId} label="Controller ID" placeholder="Controller ID"/>
                <div>
                    <h2>Controller Associations</h2>
                    <ul>
                        {controllerAssociations.map((association, index) => {
                            <li key={{index}}>
                                {association.type} - {association.label}
                            </li>
                        })}
                    </ul>
                    <select
                        name="controlerAssociationType"
                        onChange={handleControllerAssociationOnChange}
                    >
                        <option value="button">Button</option>
                        <option value="switch">Switch</option>
                        <option value="slider">Slider</option>
                        <option value="radioButton">Radio button</option>
                        <option value="field">Field</option>
                    </select>
                </div>
                <br></br>
                <button type="submit">Create controller</button>
                
            </Container>
        </div>
    );
}
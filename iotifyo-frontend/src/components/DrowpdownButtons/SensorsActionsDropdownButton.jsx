import { useState } from 'react';
import Dropdown from "react-bootstrap/Dropdown";

export const SensorsActionsDropdownButton = (props) => {
    const [selectedOption, setSelectedOption] = useState('Select an option');

    const handleOptionSelect = async (option) => {
        setSelectedOption(option);
        switch (option) {
            case "Activate sensor" : {
                break;
            }
            case "Deactivate sensor" : {
                break;
            }
            case "Delete sensor" : {
                break;
            }
            default : {
                break;
            }

        }
    }

    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant="secondary">{selectedOption}</Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item>Activate sensor</Dropdown.Item>
                    <Dropdown.Item>Deactivate sensor</Dropdown.Item>
                    <Dropdown.Item>Delete sensor</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )
}
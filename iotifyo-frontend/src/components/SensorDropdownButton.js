import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export const SensorDropdownButton = (props) => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const { dataList, onOptionDataSelect } = props;

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    onOptionDataSelect(option);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">{selectedOption}</Dropdown.Toggle>

      <Dropdown.Menu>
        {dataList.map((item, index) => (
          <div key={index}>
            <Dropdown.Item onClick={() => handleOptionSelect(item)}>
              {item}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

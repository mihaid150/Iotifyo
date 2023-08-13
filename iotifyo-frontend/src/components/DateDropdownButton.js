import Dropdown from "react-bootstrap/Dropdown";
import { useState } from "react";

export const DateDropdownButton = (props) => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const { datesList, onOptionDateSelect } = props;

  const handleOptionSelect = (option) => {
    setSelectedOption(`${option.day}-${option.month}-${option.year}`);
    onOptionDateSelect(`${option.day}-${option.month}-${option.year}`);
  };

  return (
    <Dropdown>
      <Dropdown.Toggle variant="secondary">{selectedOption}</Dropdown.Toggle>

      <Dropdown.Menu>
        {datesList.map((item, index) => (
          <div key={index}>
            <Dropdown.Item onClick={() => handleOptionSelect(item)}>
              {" "}
              {`${item.day}-${item.month}-${item.year}`}
            </Dropdown.Item>
          </div>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
};

import Dropdown from "react-bootstrap/Dropdown";
import { useState, useEffect } from "react";
import { useGetData } from "../../hooks/useGetData";

export const DateDropdownButton = (props) => {
  const [selectedOption, setSelectedOption] = useState("Select an option");
  const [isFetched, setIsFetched] = useState(false);
  const {
    datesList,
    onOptionDateSelect,
    optionData,
    optionType,
    isOptionDataSelected,
    isOptionTypeSelected,
    setSensorDates,
    setIsOptionDataSelected,
  } = props;

  const handleOptionSelect = (option) => {
    setSelectedOption(`${option.day}-${option.month}-${option.year}`);
    onOptionDateSelect(`${option.day}-${option.month}-${option.year}`);
  };
  const { getDate } = useGetData();
  useEffect(() => {
  
    if(!isFetched) {
      const fetchSensorsDates = async () => {
        if (optionData !== null) {
          const sensorDates = await getDate(optionData, optionType);

          if (sensorDates) {
            setSensorDates(sensorDates);
          }
        }
      };
  
      if (isOptionDataSelected && isOptionTypeSelected) {
        fetchSensorsDates();
        setIsOptionDataSelected(false);
        setIsFetched(true);
      }
    }
  }, [
    datesList,
    isFetched,
    getDate,
    optionData,
    optionType,
    setSensorDates,
    setIsOptionDataSelected,
    isOptionDataSelected,
    isOptionTypeSelected,
  ]);

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

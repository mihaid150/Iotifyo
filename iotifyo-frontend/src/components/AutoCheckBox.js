import Form from "react-bootstrap/Form";

function AutoCheckBox(props) {
  const { onChangeOfCheck } = props;

  const handleCheckBoxChange = (event) => {
    onChangeOfCheck(event.target.checked);
  };

  return (
    <Form>
      <Form.Check // prettier-ignore
        type="switch"
        id="custom-switch"
        label="Auto update the Graph"
        onChange={handleCheckBoxChange}
      />
    </Form>
  );
}

export default AutoCheckBox;

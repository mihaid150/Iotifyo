export const SucceedDiv = ({ succeedType }) => {
  if (succeedType === "sensorSaved") {
    return (
      <>
        <div>
          <br></br>
          <div>Sensor saved</div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

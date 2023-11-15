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
  } else if (succeedType === "mailSent") {
    return (
      <>
        <div>
          <br></br>
          <div>Mail Sent</div>
        </div>
      </>
    );
  } else if (succeedType === "sensorTypeSaved") {
      return (
          <>
              <div>
                  <br></br>
                  <div>Sensor Type Saved</div>
              </div>
          </>
      )
  } else {
    return null;
  }
};

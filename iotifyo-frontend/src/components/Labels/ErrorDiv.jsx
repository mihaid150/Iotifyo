export const ErrorDiv = ({ errorType }) => {
  if (errorType === "wrongCredentials") {
    return (
      <>
        <div>
          <br />
          <div className="alert alert-danger" role="alert">
            Wrong credentials. Please try again!
          </div>
        </div>
      </>
    );
  } else if (errorType === "sensorNotSaved") {
    return (
      <>
        <div>
          <br></br>
          <div>Sensor not saved</div>
        </div>
      </>
    );
  } else if (errorType === "mailNotSent") {
    return (
      <>
        <div>
          <br></br>
          <div>Mail not sent</div>
        </div>
      </>
    );
  } else {
    return null;
  }
};

import Button from "react-bootstrap/Button";

export const SimpleButton = ({ variant, label, handleSubmit }) => {
  if (variant === "medium") {
    return (
      <>
        <br></br>
        <div className="mb-2">
          <Button variant="primary" size="lg" onClick={handleSubmit}>
            {label}
          </Button>
        </div>
        <br></br>
      </>
    );
  } else if (variant === "small") {
    return (
      <>
        <Button variant="primary" size="sm-10" onClick={handleSubmit}>
          {label}
        </Button>
      </>
    );
  }
};

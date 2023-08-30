import "./Home.css";
import { useUserSpecifications } from "../../hooks/useUserSpecifications";
import { useEffect, useState} from "react";

export const Home = () => {
  const [isFetched, setIsFetched] = useState(false);
  const [userSpec, setUserSpec] = useState({
    firstname: "",
    lastname: "",
  });
  const { getUserSpecifications } = useUserSpecifications();

  useEffect(() => {
    if(!isFetched) {
      const fetchUserSpecifications = async () => {
        const userSpecifications = await getUserSpecifications();
        if (userSpecifications) {
          setUserSpec(userSpecifications);
          setIsFetched(true);
        }
      };
      fetchUserSpecifications();
    }
  },[getUserSpecifications, isFetched]);

  return (
    <div>
      <div className="container-fluid bg-info">
        <h2>HOME PAGE</h2>
        <h4>
          WELCOME BACK {userSpec?.firstname} {userSpec?.lastname}!
        </h4>
        <p>
          IOTIFYO is a great app for creating a wide area system which gathers
          information from surrounding sensors and storing it
        </p>
        <p>An easy IoT system for personal use</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="container bg-primary">
            <h3>Bullet 1</h3>
            <ul>
              <li>Collect data from temperature and humidity sensors.</li>
              <li>Store and analyze data in real-time.</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="container bg-danger">
            <h3>Bullet 2</h3>
            <ul>
              <li>Monitor energy consumption using smart meters.</li>
              <li>Generate detailed reports on energy usage patterns.</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="container bg-success">
            <h3>Bullet 3</h3>
            <ul>
              <li>Integrate with motion sensors for security purposes.</li>
              <li>Send instant alerts in case of unauthorized access.</li>
            </ul>
          </div>
        </div>
      </div>
      <br></br>
      <div className="container-fluid bg-info">
        <h2>This is the same container from the beginning.</h2>
        <p>Some informative text goes here.</p>
      </div>
    </div>
  );
};

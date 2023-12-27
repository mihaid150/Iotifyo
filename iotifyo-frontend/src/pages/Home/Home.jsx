import "./Home.css";
import { useUserSpecifications } from "../../hooks/useUserSpecifications";
import { useEffect, useState} from "react";
import { Carousel } from "./Carousel";
import { FetchCarouselImagesComponent } from "../../components/BackgroundFetchers/FetchCarouselImagesComponent";

export const Home = () => {
  const [carouselImages, setCarouselImages] = useState([]);
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
      <FetchCarouselImagesComponent setCarouselImages={setCarouselImages}/>
      <Carousel carouselImages={carouselImages} />
      <br />
      <div className="container-fluid bg-info">
        <h2>HOME PAGE</h2>
        <h4>
          WELCOME BACK {userSpec?.firstname} {userSpec?.lastname}!
        </h4>
        <p>
          First platform for monitoring and controlling your house comfort
        </p>
        <p>Iotifyo is a tool dedicated for house environment, collecting data such as temperature, humidity and power consumption, all to come up with recommendations for a sustainable and environment-friendly house.</p>
      </div>
      <div className="row">
        <div className="col-md-4">
          <div className="container bg-primary">
            <h3>Feature 1</h3>
            <ul>
              <li>The application was designed to be used by every customer that wants a better living in his house so fell free to explore all the features that we have designed for you.</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="container bg-danger">
            <h3>Feature 2</h3>
            <ul>
              <li>We understand the need for a high-quality platform that answers to all the desires a customers could have. All the pages and utilities have a friendly interface in order to make you fell please.</li>
            </ul>
          </div>
        </div>
        <div className="col-md-4">
          <div className="container bg-success">
            <h3>Feature 3</h3>
            <ul>
              As we are at the beginning of our development of the Iotifyo platform, we give you free and open-source access to the application in order to gain a high trustworthy relationship between provider and customer.
            </ul>
          </div>
        </div>
      </div>
      <br></br>
      <div className="container-fluid bg-info">
        <p>Iotifyo is a tool dedicated for house environment, collecting data such as temperature, humidity and power consumption, all to come up with recommendations for a sustainable and environment-friendly house.</p>
      </div>
    </div>
  );
};

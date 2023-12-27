import { useEffect, useContext} from "react";
import { fetchCarouselImages } from "./fetchCarouselImages";
import { AppContext} from "../../App";

export const FetchCarouselImagesComponent = ({setCarouselImages}) => {
    const { isAuthenticated } = useContext(AppContext);

    useEffect(() => {
        fetchCarouselImages(isAuthenticated, setCarouselImages);
    },[isAuthenticated, setCarouselImages]);
}
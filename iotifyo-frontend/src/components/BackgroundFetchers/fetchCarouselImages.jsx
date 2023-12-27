import { getDownloadURL, ref, listAll } from "firebase/storage";
import { storage } from "../../Firebase";

export const fetchCarouselImages = async (isAuthenticated, setCarouselImages) => {
    if (isAuthenticated) {
        const imagesRef = ref(storage, 'landingPage');
        try {
            const result = await listAll(imagesRef);
            const urlPromises = result.items.map(imageRef => getDownloadURL(imageRef));

            // Retrieve download URLs for each file in the folder
            const urls = await Promise.all(urlPromises);
            setCarouselImages(urls);
        } catch (error) {
            console.error("Error retrieving landing page images: " + error);
        }
    }
};

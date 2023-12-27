import { useState, useEffect } from 'react'
import { useStatistics } from "../../hooks/useStatistics";

export const HeatIndexFetch = () => {
    const [heatIndex, setHeatIndex] = useState(0)
    const { getHeatIndex } = useStatistics();

    useEffect(() => {
        const fetchHeatIndex = async() => {
            const heatIndex = await getHeatIndex();
            if (heatIndex) {
                setHeatIndex(heatIndex)
            }
        }
        fetchHeatIndex();
    }, []);
    return {heatIndex}
}
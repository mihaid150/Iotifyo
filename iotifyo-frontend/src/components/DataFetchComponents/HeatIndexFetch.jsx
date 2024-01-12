import { useState, useEffect } from 'react'
import { useStatistics } from "../../hooks/useStatistics";

export const HeatIndexFetch = (date) => {
    const [heatIndex, setHeatIndex] = useState(0)
    const { getHeatIndex } = useStatistics();

    useEffect(() => {
        const fetchHeatIndex = async() => {
            const heatIndex = await getHeatIndex(date);
            if (heatIndex) {
                setHeatIndex(heatIndex)
            }
        }
        fetchHeatIndex();
    }, [date, getHeatIndex]);
    return {heatIndex}
}
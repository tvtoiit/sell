import { useState, useEffect} from 'react';
function useCustomApi (apiEndpoint) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        fetch(apiEndpoint)
        .then(response => {
            return response.json();
        })
        .then(data => {
            setData(data);
        })
        .catch(err => {
            setError(err);
        })

    }, [apiEndpoint]);
    return {data, error};
}
export default useCustomApi;
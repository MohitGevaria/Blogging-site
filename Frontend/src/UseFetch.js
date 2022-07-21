import { useEffect, useState } from "react";


const useFetch = (url) => {
    
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const abortController = new AbortController();
        
        setTimeout(() => {
            fetch(url, { signal:abortController.signal })
            .then(res => {
                if (!res.ok){
                    throw Error("Could not fetch Data.")
                }
                return res.json();
            })
            .then(data => {
                setData(data);
                // console.log(data.categories[0]);

                setIsPending(false);
                setError(null);
            })
            .catch((err) => {
                if (Error.name === 'AbortError'){
                    console.log("Fetch aborted")
                }
                else{
                    setError(err.message);
                    setIsPending(false);
                }            
            })
        }, 500);

        return () => {
            abortController.abort();
        }
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;

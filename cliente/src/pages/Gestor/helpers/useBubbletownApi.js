import { CancelToken, isCancel } from "axios";
import { useEffect, useState } from "react";

import { bubbletownApi } from "../api";
 
const memoizedStorage = {};

// This function provides a React hook functionality to make 
// request to any API with cancelation and with or
// without memoization lodash method _.
// memoized = false,  es igual al valor por defecto
const useBubbletownApi = ({ memoize = false,  path }) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (memoize && memoizedStorage.hasOwnProperty(path)){
            memoizedStorage[path].then(res => {
                setData(res.data)
            });

            return ;
        } 
         
        const source = CancelToken.source();

        const promise = bubbletownApi.get(path, {
            cancelToken: source.token 
        })
        .then(res => {
            setData(res.data);
        })
        .catch(e => {
            if (isCancel(e)) return ;
            throw e;
        });

        if (memoize) memoizedStorage[path] = promise;

        return () => {
            source.cancel();
        }
    }, []);

    return {
        data, 
        loading: data === null
    };
}

export default useBubbletownApi;
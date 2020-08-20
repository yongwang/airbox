import { useEffect, useState } from "react";

const useSubscription = (subscribe, getState, initialState) =>
{
    const [value, updateHandler] = useState(initialState)

    useEffect(() =>
    {
        let subscription = subscribe((state) =>
        {
            updateHandler(getState(state));
        });

        return () =>
        {
            if (subscription)
            {
                subscription();
            }
            subscription = null;
        };

    }, [subscribe, getState, value]);

    return value;
}

export default useSubscription;
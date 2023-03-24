import * as React from "react";

function useData<T>(endpoint: string) {
  const [data, setData] = React.useState<T | undefined>();
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    console.log("SHIT");
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [endpoint]);

  return { isLoading, data };
}

export default useData;

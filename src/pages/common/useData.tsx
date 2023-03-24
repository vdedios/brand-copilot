import * as React from "react";

function useData<T>(endpoint: string) {
  const [data, setData] = React.useState<T | undefined>();
  const [reload, setReload] = React.useState<boolean>(true);
  const [url, setUrl] = React.useState<string>(endpoint);
  const [isLoading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (reload) {
      setLoading(true);
      setReload(false);
      console.log("SHIT");
      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
        });
    }
  }, [endpoint, reload, url]);

  return { isLoading, data, setReload, setUrl };
}

export default useData;

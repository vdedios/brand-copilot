import { Data } from "../api/analysisSentiment";
import useData from "../common/useData";
import {
  Spinner,
  Tag,
  IconCloseRegular,
  IconAlertRegular,
  IconCheckRegular,
  IconInformationRegular,
} from "@telefonica/mistica";

const tagMapper = (sentiment: string) => {
  if (sentiment.includes("ositive")) {
    return (
      <Tag Icon={IconCheckRegular} type="success">
        Positive
      </Tag>
    );
  } else if (sentiment.includes("egative")) {
    return (
      <Tag Icon={IconAlertRegular} type="error">
        Negative
      </Tag>
    );
  } else {
    return (
      <Tag Icon={IconInformationRegular} type="inactive">
        Neutral
      </Tag>
    );
  }
};

const Sentiment = ({ tweet }: { tweet: string }) => {
  const { data, isLoading } = useData<Data>(
    `/api/analysisSentiment?tweet=${tweet}`
  );

  if (isLoading || !data) {
    return <Spinner />;
  }

  return tagMapper(data.sentiment);
};

export default Sentiment;

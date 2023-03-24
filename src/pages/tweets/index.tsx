import * as React from "react";
import {
  MasterDetailLayout,
  NegativeBox,
  Row,
  RowList,
  Stack,
  Text5,
  Box,
  LoadingBar,
  Image,
} from "@telefonica/mistica";
import useData from "../common/useData";
import { Data } from "../api/tweets";
import { UserTweet } from "../api/tweets";
import Sentiment from "./Sentiment";
import ResponseDetail from "./ResponseDetail";

const cropText = (text: string) => text.substring(0, 100) + "...";

const Tweets = () => {
  const [option, setOption] = React.useState<UserTweet | null>(null);
  const { data, isLoading } = useData<Data>("/api/tweets");

  return (
    <Box paddingTop={24}>
      <LoadingBar visible={isLoading} />
      <MasterDetailLayout
        isOpen={!!option}
        master={
          <Stack space={32}>
            {data?.response.map((entry, idx) => (
              <Stack key={idx} space={8}>
                <NegativeBox>
                  <RowList>
                    <Row
                      key={idx}
                      title={entry.user}
                      description={cropText(entry.tweet)}
                      asset={
                        <Image alt="avatar" src={entry.avatar} width={40} />
                      }
                      onPress={() => {
                        setOption(entry);
                      }}
                      extra={<Sentiment tweet={entry.tweet} />}
                    />
                  </RowList>
                </NegativeBox>
              </Stack>
            ))}
          </Stack>
        }
        detail={
          <div style={{ position: "fixed", width: "50%" }}>
            {option ? (
              <ResponseDetail
                tweet={option.tweet}
                user={option.user}
                setOption={setOption}
                followers={option.followers}
                favorites={option.favorites}
                retweets={option.retweets}
                link={option.tweetUrl}
              />
            ) : (
              <Text5>
                Select one of the tweets from the sidebar to start moderating.
              </Text5>
            )}
          </div>
        }
      />
    </Box>
  );
};

export default Tweets;

import * as React from "react";
import { Data } from "../api/generateResponse";
import useData from "../common/useData";
import {
  TextField,
  Spinner,
  Stack,
  Inline,
  Text3,
  Text5,
  ButtonLayout,
  ButtonSecondary,
  ButtonPrimary,
  Tag,
} from "@telefonica/mistica";
import { UserTweet } from "../api/tweets";

const ResponseDetail = ({
  tweet,
  user,
  setOption,
  followers,
  retweets,
  favorites,
  link,
}: {
  tweet: string;
  user: string;
  setOption: React.Dispatch<React.SetStateAction<UserTweet | null>>;
  favorites: number;
  retweets: number;
  followers: number;
  link: string;
}) => {
  const { data, isLoading } = useData<Data>(
    `/api/generateResponse?tweet=${tweet}&user=${user}`
  );
  const [text, setText] = React.useState(data?.text);

  React.useEffect(() => {
    if (!isLoading && data?.text) {
      setText(data.text.trim());
    } else if (isLoading) {
      setText("");
    }
  }, [data, setText, isLoading]);

  return (
    <Stack space={24}>
      <Text5 as="h2">{user}</Text5>
      <Text3 light>{tweet}</Text3>
      <Inline space={12}>
        <Tag type="warning">{`Posible impacto: ${followers} usuarios`}</Tag>
        <Tag type="active">{`Retweets: ${retweets}`}</Tag>
        <Tag type="active">{`Favoritos: ${favorites}`}</Tag>
      </Inline>
      <TextField
        name="text"
        label="AI generated response"
        maxLength={200}
        multiline
        fullWidth
        disabled={isLoading}
        value={text ?? ""}
        onChangeValue={setText}
      ></TextField>
      {isLoading && (
        <Inline space={24}>
          <Spinner />
          <Text3 regular> Generating response...</Text3>
        </Inline>
      )}
      <ButtonLayout>
        <ButtonSecondary small onPress={() => setOption(null)}>
          Close
        </ButtonSecondary>
        <ButtonPrimary small onPress={() => alert("message sent!")}>
          Send
        </ButtonPrimary>
      </ButtonLayout>
    </Stack>
  );
};

export default ResponseDetail;

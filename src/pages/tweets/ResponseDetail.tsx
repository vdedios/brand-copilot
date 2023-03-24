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
  RadioButton,
  RadioGroup,
  Chip,
  IconLightningFilled,
} from "@telefonica/mistica";
import { UserTweet } from "../api/tweets";
import { Mood } from "../api/generateResponse";

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
  const [mood, setMood] = React.useState<Mood>("asertiva");
  const { data, isLoading, setReload, setUrl } = useData<Data>(
    `/api/generateResponse?tweet=${tweet}&user=${user}&mood=${mood}`
  );
  const [text, setText] = React.useState(data?.text);

  React.useEffect(() => {
    if (!isLoading && data?.text) {
      setText(data.text.replace(/^[\s\n]*\.*[\s\n]*/, ""));
    } else if (isLoading) {
      setText("");
    }
  }, [data, setText, isLoading]);

  React.useEffect(() => {
    console.log("cambiando mood");
    setUrl(`/api/generateResponse?tweet=${tweet}&user=${user}&mood=${mood}`);
    setReload(true);
  }, [mood, setUrl, user, tweet, setReload]);

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
        maxLength={300}
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
      <RadioGroup name="chip-group" defaultValue="1" disabled={isLoading}>
        <Inline space={8}>
          <RadioButton
            value="1"
            render={({ checked, labelId }) => {
              checked && setMood("asertiva");
              return (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Respuesta asertiva
                </Chip>
              );
            }}
          />
          <RadioButton
            value="2"
            render={({ checked, labelId }) => {
              checked && setMood("divertida");
              return (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Respuesta divertida
                </Chip>
              );
            }}
          />
          <RadioButton
            value="3"
            render={({ checked, labelId }) => {
              checked && setMood("troll");
              return (
                <Chip active={checked} id={labelId} Icon={IconLightningFilled}>
                  Respuesta troll
                </Chip>
              );
            }}
          />
        </Inline>
      </RadioGroup>
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

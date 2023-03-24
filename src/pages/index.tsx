import React from "react";
import {
  MainNavigationBar,
  Header,
  MainSectionHeaderLayout,
  ThemeContextProvider,
  getTelefonicaSkin,
} from "@telefonica/mistica";
import "@telefonica/mistica/css/reset.css";
import "@telefonica/mistica/css/mistica.css";
import Tweets from "./tweets";
import Stats from "./stats";

const App = () => {
  const [index, setIndex] = React.useState(0);

  const mainSections = ["MovistarES", "O2UK", "VivoBR", "BlauDE"] as const;

  return (
    <>
      <div>
        <MainNavigationBar
          isInverse
          selectedIndex={index}
          sections={mainSections.map((section, idx) => ({
            title: section,
            onPress: () => setIndex(idx),
          }))}
        />
        <SectionSelector index={index} />
      </div>
    </>
  );
};

const SectionSelector = ({ index }: { index: number }) => {
  switch (index) {
    case 0:
      return <Tweets twitterAccount="movistar_es" />;
    case 1:
      return <Tweets twitterAccount="O2" />;
    case 2:
      return <Tweets twitterAccount="vivobr" />;
    case 3:
      return <Tweets twitterAccount="blau_presse" />;
    default:
      throw new Error("index doesnt exits:" + index);
  }
};

export default function Home() {
  return (
    <ThemeContextProvider
      theme={{
        skin: getTelefonicaSkin(),
        i18n: {
          locale: "es-ES",
          phoneNumberFormattingRegionCode: "ES",
        },
        enableTabFocus: true,
      }}
    >
      <App />
    </ThemeContextProvider>
  );
}

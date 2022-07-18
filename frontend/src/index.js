import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Theme } from "@twilio-paste/core/theme";
import View from "./View"
// import { Box } from "@twilio-paste/core/box";
// import { Flex } from "@twilio-paste/core/flex";
// import { Text } from "@twilio-paste/core/text";

// import { SortableColumnsDataGrid } from "./App";
// import UserScore from "./UserScorePage";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <Theme.Provider theme="default">
        <View />
    </Theme.Provider>,
  rootElement
);

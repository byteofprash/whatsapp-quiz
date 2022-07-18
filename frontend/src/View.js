import React from 'react';
import { Box } from "@twilio-paste/core/box";
import { Flex } from "@twilio-paste/core/flex";
import { Text } from "@twilio-paste/core/text";
import { SortableColumnsDataGrid } from "./App";
import UserScore from "./UserScorePage";

function View() {
  const [selectedUser, setSelectedUser] = React.useState("")
  const handleSelectedUser = (phone) => {
      console.log("This is the parent ", phone)
      setSelectedUser(phone)
  }
  return (
    <Flex hAlignContent="center" vertical>
        <Flex >
          <Box backgroundColor="colorBackgroundBrand" padding="space40" width="100vw" style={{justifyContent: "center"}}>
            <Text
              as="h1"
              fontSize={["fontSize20", "fontSize40", "fontSize60"]}
              color={["colorTextBrandHighlight", "colorTextSuccess", "colorTextError"]}
            >
              Hello
            </Text>
          </Box>
        </Flex >
        <Flex grow padding="space60">
          <Box>
            <SortableColumnsDataGrid handleSelectedUser={handleSelectedUser} />
          </Box>
        </Flex>
       { selectedUser && <p> Showing the answers for {selectedUser[1]} </p> }
       { selectedUser &&
        <Flex grow>
          <Box>
            <UserScore userPhone={selectedUser}/>
          </Box>
        </Flex>
       }
    </Flex>
       
  );
}

export default View;


import React from 'react';
import {
  DataGrid,
  DataGridHead,
  DataGridRow,
  DataGridHeader,
  DataGridBody,
  DataGridCell,
} from "@twilio-paste/core/data-grid";
import {Spinner} from '@twilio-paste/core/spinner';
import { UserScoreHeader } from "./constants";
import axios from 'axios'

function UserScore({ userPhone }) {

  const [userData, setUserData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState([false])

  let getData = async () => {
    setIsLoading(true)
    setUserData([])
    const { data } = await axios.get(`/quiz/userPerformance`, { params:{phone: userPhone[0]}});
    setIsLoading(false)
    setUserData(data.map((answer) => [answer.question, answer.rightAnswer, answer.yourAnswer, answer.correct]))
  };

  React.useEffect(() => {
    getData();
  }, [userPhone]);
 

  if (isLoading) {
    return (
      <Spinner size="sizeIcon70" decorative={false} title="Loading" />
    )
  }

  return (
    <DataGrid aria-label="User information table" striped>
      <DataGridHead >
        <DataGridRow >
          <DataGridHeader>{UserScoreHeader[0]}</DataGridHeader>
          <DataGridHeader>{UserScoreHeader[1]}</DataGridHeader>
          <DataGridHeader>{UserScoreHeader[2]}</DataGridHeader>
          <DataGridHeader>{UserScoreHeader[3]}</DataGridHeader>
        </DataGridRow>
      </DataGridHead>
      <DataGridBody>
        {userData.map((row, rowIndex) => (
          <DataGridRow key={"row-" + rowIndex}>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][0]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][1]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][2]}
              </DataGridCell>
              <DataGridCell key={"cell-" + rowIndex + "-0"}>
                {userData[rowIndex][3] ? "✅" : "❌"}
              </DataGridCell>
          </DataGridRow>
        ))}
      </DataGridBody>
    </DataGrid>
  );
}

export default UserScore;
/*
 {row.map((col, colIndex) => (
              <DataGridCell key={"cell-" + rowIndex + "-" + colIndex}>
                <div style={{color:row[1]!=row[2]? "red": ""}}>
                    {col}
                </div>
              </DataGridCell>
            ))}
  
 */

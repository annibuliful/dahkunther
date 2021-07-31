import { Box } from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ISelectValue } from "./@types";
import { SelectBox } from "./components/SelectBox";

function App() {
  const [selectedBox, setSelectedBox] = useState("");
  const onSelectBox = (value: ISelectValue["value"]) => {
    if (value === selectedBox) {
      setSelectedBox("");
      return;
    }

    setSelectedBox(value);
  };

  return (
    <Box>
      <SelectBox
        onSelectBox={onSelectBox}
        label="ประยวนหัวครุท"
        value="1"
        isSelected={selectedBox === "1"}
      />
    </Box>
  );
}

export default App;

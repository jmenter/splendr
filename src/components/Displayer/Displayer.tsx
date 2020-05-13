import { observer } from "mobx-react";
import React from "react";
import stores from "../../stores/Stores";

export default observer(() => {
  return (
    <>
      <h1>hello im app</h1>
      <h2>my current name is {}</h2>
    </>
  );
});

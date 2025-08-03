import React from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";

const ViewPrintBoardPage = () => {
  return (
    <ViewKanbanBoardPage
      mainStatus="Printing"
      subStatuses={[
        // "print To Do",
        "Print",
        "SWIFT 1",
        "SWIFT 2",
        "SWIFT 3",
        "SAHIL",
        "RULLING",
        "SCREEN",
        "RISO",
        "RISO COM COLOR",
        "KONICA MINOLTA",
        "Binding",
      ]}
      printSubStatus="Binding"
    />
  );
};

export default ViewPrintBoardPage;

import React from "react";
import ViewKanbanBoardPage from "../components/pageKanbanBoard/ViewKanbanBoardPage";

const ViewPrintBoardPage = () => {
  return (
    <ViewKanbanBoardPage
      mainStatus="Printing"
      subStatuses={[
        // "print To Do",
        "Print",
        "Printer 1",
        "Printer 2",
        "Printer 3",
        "Printer 4",
        "Printer 5",
        "Binding",
      ]}
      printSubStatus="Binding"
    />
  );
};

export default ViewPrintBoardPage;

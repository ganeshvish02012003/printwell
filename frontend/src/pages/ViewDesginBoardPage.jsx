import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";

const ViewDesginBoardPage = () => {
  const [allJob, setAllJob] = useState([]);
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();
    const jobs = dataResponse?.data || [];
    setAllJob(jobs);

    const statuses = [
      "To Do",
      "Designer 1",
      "Designer 2",
      "Proof",
      "Final",
      "Print",
      "send to print"
    ];

    const boardList = statuses.map((status) => {
      // Filter jobs matching the current status
      let cards = jobs
        .filter((job) => job?.job?.status === status)
        .map((job) => ({
          id: job._id,
          title: job.job?.jobName || "Untitled",
          job: job.job,
          general: job.general,
          createdAt: job.createdAt,
        }));

      // Also add "Desgin" status jobs to "To Do" (as a copy)
      if (status === "To Do") {
        const desginJobs = jobs
          .filter((job) => job?.job?.status === "Desgin")
          .map((job) => {
            const clonedJob = JSON.parse(JSON.stringify(job)); // deep clone
            return {
              id: clonedJob._id + "-copy",
              title: clonedJob.job?.jobName || "Untitled",
              job: clonedJob.job,
              general: clonedJob.general,
              createdAt: clonedJob.createdAt,
            };
          });

        cards = [...cards, ...desginJobs];
      }

      return {
        id: `${status.toLowerCase().replace(/\s+/g, "-")}-board`,
        title: status,
        cards,
      };
    });

    setBoards(boardList);
  };

  useEffect(() => {
    fetchAllJob();
  }, []);

  const handleDragEnter = (cardId, boardId) => {
    setTargetCard({ bid: boardId, cid: cardId });
  };

const handleDragEnd = (cardId, sourceBoardId) => {
  const sourceBoardIndex = boards.findIndex((b) => b.id === sourceBoardId);
  const targetBoardIndex = boards.findIndex((b) => b.id === targetCard.bid);
  if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

  const sourceBoard = boards[sourceBoardIndex];
  const targetBoard = boards[targetBoardIndex];

  const cardIndex = sourceBoard.cards.findIndex((c) => c.id === cardId);
  const dropIndex = targetBoard.cards.findIndex((c) => c.id === targetCard.cid);

  // Don't proceed if dragging into same board and same position
  if (
    sourceBoardId === targetCard.bid &&
    (dropIndex === cardIndex ||
     dropIndex === cardIndex + 1 ||
     dropIndex === cardIndex - 1 ||
     dropIndex === -1)
  ) {
    setTargetCard({ bid: "", cid: "" });
    return;
  }

  const cardToMove = sourceBoard.cards[cardIndex];
  if (!cardToMove) return;

  const updatedSourceCards = [...sourceBoard.cards];
  updatedSourceCards.splice(cardIndex, 1);

  const updatedTargetCards = [...targetBoard.cards];
  if (dropIndex === -1) {
    updatedTargetCards.push(cardToMove);
  } else {
    updatedTargetCards.splice(dropIndex, 0, cardToMove);
  }

  const updatedBoards = [...boards];
  updatedBoards[sourceBoardIndex] = {
    ...sourceBoard,
    cards: updatedSourceCards,
  };
  updatedBoards[targetBoardIndex] = {
    ...targetBoard,
    cards: updatedTargetCards,
  };

  setBoards(updatedBoards);
  setTargetCard({ bid: "", cid: "" });
};


  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      {boards.map((board) => (
        <DesginBoard
          key={board.id}
          boards={board}
          handleDragEnd={handleDragEnd}
          handleDragEnter={handleDragEnter}
          fetchAllJob={fetchAllJob}
        />
      ))}
    </div>
  );
};

export default ViewDesginBoardPage;




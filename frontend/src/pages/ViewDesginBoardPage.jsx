import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";

// Mapping of board DOM IDs to subStatus values
const boardIdToSubStatus = {
  "to-do-board": "To Do",
  "designer-1-board": "Designer 1",
  "designer-2-board": "Designer 2",
  "proof-board": "Proof",
  "final-board": "Final",
  "print-board": "Print",
  "send-to-print-board": "send to print",
};

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
      "send to print",
    ];

    const boardList = statuses.map((status) => {
      let cards = [];

      if (status === "Print") {
        cards = jobs
          .filter(
            (job) =>
              job.job?.status === "Printing" && job.job?.subStatus === "Print"
          )
          .map((job) => ({
            id: job._id,
            title: job.job?.jobName || "Untitled",
            job: job.job,
            general: job.general,
            createdAt: job.createdAt,
          }));
      } else if (status === "To Do") {
        const validSubStatuses = statuses.slice(1); // exclude "To Do"
        cards = jobs
          .filter(
            (job) =>
              job.job?.status === "Desgin" &&
              (!job.job?.subStatus ||
                !validSubStatuses.includes(job.job?.subStatus))
          )
          .map((job) => ({
            id: job._id + "-copy",
            title: job.job?.jobName || "Untitled",
            job: job.job,
            general: job.general,
            createdAt: job.createdAt,
          }));
      } else {
        cards = jobs
          .filter(
            (job) =>
              job.job?.status === "Desgin" && job.job?.subStatus === status
          )
          .map((job) => ({
            id: job._id,
            title: job.job?.jobName || "Untitled",
            job: job.job,
            general: job.general,
            createdAt: job.createdAt,
          }));
      }

      return {
        id: `${status.toLowerCase().replace(/\s+/g, "-")}-board`,
        title: status,
        cards,
      };
    });

    setBoards(boardList);
  };

  // ✅ Throttle the fetch for safe re-renders
  const throttledFetchJobs = useMemo(
    () => throttle(fetchAllJob, 1000),
    [fetchAllJob]
  );

  // ✅ Auto-fetch on mount & sync on localStorage change
  useEffect(() => {
    fetchAllJob();

    const onStorage = (e) => {
      if (e.key === "kanban_sync") {
        throttledFetchJobs();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      throttledFetchJobs.cancel();
    };
  }, [throttledFetchJobs]);

  const handleDragEnter = (cardId, boardId) => {
    setTargetCard({ bid: boardId, cid: cardId });
  };

  const handleDragEnd = async (cardId, sourceBoardId) => {
    const sourceBoardIndex = boards.findIndex((b) => b.id === sourceBoardId);
    const targetBoardIndex = boards.findIndex((b) => b.id === targetCard.bid);
    if (sourceBoardIndex === -1 || targetBoardIndex === -1) return;

    const sourceBoard = boards[sourceBoardIndex];
    const targetBoard = boards[targetBoardIndex];

    const cardIndex = sourceBoard.cards.findIndex((c) => c.id === cardId);
    const dropIndex = targetBoard.cards.findIndex(
      (c) => c.id === targetCard.cid
    );

    const cardToMove = sourceBoard.cards[cardIndex];
    if (!cardToMove) return;

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

    try {
      const newSubStatus = boardIdToSubStatus[targetCard.bid] || "To Do";
      const newStatus = newSubStatus === "Print" ? "Printing" : "Desgin";

      await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: cardToMove.id.replace("-copy", ""),
          job: {
            ...cardToMove.job,
            status: newStatus,
            subStatus: newSubStatus,
          },
        }),
      });

      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Failed to update job subStatus:", err);
    }
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

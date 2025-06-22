import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";

const boardIdToSubStatus = {
  "print-to-do-board": "print To Do",
  "printer-1-board": "Printer 1",
  "printer-2-board": "Printer 2",
  "printer-3-board": "Printer 3",
  "printer-4-board": "Printer 4",
  "printer-5-board": "Printer 5",
  "binding-board": "Binding",
};

const ViewPrintBoardPage = () => {
  const [allJob, setAllJob] = useState([]);
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();
    const jobs = dataResponse?.data || [];
    setAllJob(jobs);

    const statuses = [
      "print To Do",
      "Printer 1",
      "Printer 2",
      "Printer 3",
      "Printer 4",
      "Printer 5",
      "Binding",
    ];

    const boardList = statuses.map((status) => {
      let cards = [];

      if (status === "Binding") {
        cards = jobs
          .filter(
            (job) =>
              job.job?.status === "Printing" && job.job?.subStatus === "Binding"
          )
          .map((job) => ({
            id: job._id + "-copy",
            title: job.job?.jobName || "Untitled",
            job: job.job,
            general: job.general,
            createdAt: job.createdAt,
          }));
      } else if (status === "print To Do") {
        const validSubStatuses = statuses.slice(1); // exclude "To Do"
        cards = jobs
          .filter(
            (job) =>
              job.job?.status === "Printing" &&
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
              job.job?.status === "Printing" && job.job?.subStatus === status
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

  // ✅ Throttled wrapper for fetchAllJob
  const throttledFetchJobs = useMemo(
    () => throttle(fetchAllJob, 1000),
    [fetchAllJob]
  );

  // ✅ Auto-reload when localStorage changes
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
      let newSubStatus = boardIdToSubStatus[targetCard.bid] || "print To Do";

      // Clear subStatus if removed from Binding
      if (
        cardToMove.job?.subStatus === "Binding" &&
        newSubStatus !== "Binding"
      ) {
        newSubStatus = "";
      }

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
            status: "Printing",
            subStatus: newSubStatus,
          },
        }),
      });

      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Failed to update print subStatus:", err);
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

export default ViewPrintBoardPage;

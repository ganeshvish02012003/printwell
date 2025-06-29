import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";

// ✅ Mapping of board DOM IDs to subStatus values
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
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  // ✅ Fetch All Jobs
  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      const jobs = dataResponse?.data || [];

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
                job.job?.status === "Printing" &&
                job.job?.subStatus === "Print"
            )
            .map((job) => ({
              _id: job._id,
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
              _id: job._id + "-copy",
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        } else {
          cards = jobs
            .filter(
              (job) =>
                job.job?.status === "Desgin" &&
                job.job?.subStatus === status
            )
            .map((job) => ({
              _id: job._id,
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
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // ✅ Throttle fetch function
  const throttledFetchJobs = useMemo(() => throttle(fetchAllJob, 1000), []);

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

  // ✅ Drag Enter Handler
  const handleDragEnter = (cid, bid) => {
    setTargetCard({ cid, bid });
  };

  // ✅ Drag End Handler with duplication fix
  const handleDragEnd = async (cid, bid) => {
    const sourceBoardIndex = boards.findIndex((b) => b.id === bid);
    const targetBoardIndex = boards.findIndex((b) => b.id === targetCard.bid);
    if (sourceBoardIndex < 0 || targetBoardIndex < 0) return;

    const sourceBoard = boards[sourceBoardIndex];
    const targetBoard = boards[targetBoardIndex];

    const sourceCardIndex = sourceBoard.cards.findIndex((c) => c._id === cid);
    const targetCardIndex = targetBoard.cards.findIndex(
      (c) => c._id === targetCard.cid
    );

    if (sourceCardIndex < 0) return;

    const cardToMove = sourceBoard.cards[sourceCardIndex];

    // ✅ Prevent dropping on the same board without changing order
    if (sourceBoard.id === targetBoard.id) {
      const isDroppingOnEmptySpace = targetCard.cid === "";
      const isSameCard = targetCard.cid === cid;
      const isSamePosition =
        sourceCardIndex === targetCardIndex || targetCardIndex === -1;

      if (isDroppingOnEmptySpace || isSameCard || isSamePosition) {
        setTargetCard({ bid: "", cid: "" });
        return;
      }
    }

    const updatedSourceCards = [...sourceBoard.cards];
    updatedSourceCards.splice(sourceCardIndex, 1);

    const updatedTargetCards = [...targetBoard.cards];
    if (targetCardIndex === -1) {
      updatedTargetCards.push(cardToMove);
    } else {
      updatedTargetCards.splice(targetCardIndex, 0, cardToMove);
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

    // ✅ Backend Update
    try {
      const newSubStatus = boardIdToSubStatus[targetBoard.id] || "To Do";
      const newStatus = newSubStatus === "Print" ? "Printing" : "Desgin";

      await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: cid.replace("-copy", ""),
          job: {
            ...cardToMove.job,
            status: newStatus,
            subStatus: newSubStatus,
          },
        }),
      });

      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Backend update failed", err);
    }
  };

  return (
    <div className="flex gap-1 mx-1 rounded-md bg-slate-400 overflow-x-auto py-2 p-4">
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

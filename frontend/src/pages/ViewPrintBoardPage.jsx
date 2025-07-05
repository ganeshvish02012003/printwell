import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";

// ✅ Map DOM board IDs to subStatus values
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
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  // ✅ Fetch Jobs and map to boards
  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      const jobs = dataResponse?.data || [];

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
                job.job?.status === "Printing" &&
                job.job?.subStatus === "Binding"
            )
            .map((job) => ({
              _id: job._id,
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        } else if (status === "print To Do") {
          const validSubStatuses = statuses.slice(1); // exclude 'print To Do'
          cards = jobs
            .filter(
              (job) =>
                job.job?.status === "Printing" &&
                (!job.job?.subStatus ||
                  !validSubStatuses.includes(job.job?.subStatus))
            )
            .map((job) => ({
              _id: job._id + "-copy", // mark as copy for frontend drag
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
      console.error("Failed to fetch jobs:", err);
    }
  };

  // ✅ Throttled fetch wrapper
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

  // ✅ Drag handlers
  const handleDragEnter = (cid, bid) => {
    setTargetCard({ cid, bid });
  };

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

    // ✅ Check if dropping on the same position (avoid duplicate)
    const isSameBoard = sourceBoard.id === targetBoard.id;
    const isSamePosition =
      (targetCardIndex === -1 && isSameBoard) ||
      sourceCardIndex === targetCardIndex;

    if (isSameBoard && isSamePosition) {
      setTargetCard({ bid: "", cid: "" });
      return;
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

    // ✅ Backend update
    try {
      let newSubStatus = boardIdToSubStatus[targetCard.bid] || "print To Do";

      // ✅ Clear subStatus if moved away from Binding
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
          _id: cid.replace("-copy", ""),
          job: {
            ...cardToMove.job,
            status: "Printing",
            subStatus: newSubStatus,
          },
        }),
      });

      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Failed to update job:", err);
    }
  };

  return (
    <div className="h-[calc(86vh)] mx-1 flex flex-col gap-1">
      <div className="flex-1 bg-slate-400 rounded-md p-2 overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200">
        <div className="flex gap-2 min-w-fit overflow-x-auto ">
          {boards
            .filter((board) => board.title !== "Binding")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                color="bg-gradient-to-r from-[#03A9F4] to-[#B3E5FC]"
              />
            ))}
        </div>
      </div>

      {/* Binding Board at Bottom */}
      <div className=" min-h-[100px] w-full bg-slate-400 rounded-md  overflow-y-auto overflow-x-hidden">
        <div className="flex flex-row ">
          {boards
            .filter((board) => board.title === "Binding")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                flex=" flex "
                hight=" h-[calc(100vh-540px)] w-screen "
                color="bg-gradient-to-r from-[#03A9F4] to-[#B3E5FC]"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPrintBoardPage;

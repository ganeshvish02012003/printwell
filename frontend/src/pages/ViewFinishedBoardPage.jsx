import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ✅ Define boardId ↔ subStatus mapping
const boardIdToSubStatus = {
  "finish-to-do-board": "Recant Recant Finished",
  "draw-bill-board": "Draw Bill",
  "Dispatch-board": "For Dispatch",
  "Store-board": "Store",
  "out-of-stock-board": "Out_of_Stock",
};

const ViewFinishedBoardPage = () => {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch All Jobs
  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      const jobs = dataResponse?.data || [];

      const statuses = [
        "Recant Recant Finished",
        "Draw Bill",
        "For Dispatch",
        "Store",
        "Out_of_Stock",
      ];

      const boardList = statuses.map((status) => {
        let cards = [];

        if (status === "finished") {
          cards = jobs
            .filter(
              (job) =>
                job.job?.status === "Finished" &&
                job.job?.subStatus === "finished"
            )
            .map((job) => ({
              _id: job._id,
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        } else if (status === "Recant Recant Finished") {
          const validSubStatuses = statuses.slice(1);
          cards = jobs
            .filter(
              (job) =>
                job.job?.status === "Finished" &&
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
                job.job?.status === "Finished" &&
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
      let newSubStatus = targetBoard.title; // <- use board title directly
      let newStatus = newSubStatus === "finished" ? "Finished" : "Finished";

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
    <div className="h-[calc(88vh)] mx-1 flex flex-col">
      <div className="flex-1 bg-slate-400 rounded-md p-2 overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200">
        <div className="flex gap-1 min-w-fit overflow-x-auto">
          {boards
            .filter((board) => board.title !== "Out_of_Stock")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                color="bg-gradient-to-r from-[#A5D6A7] to-[#E8F5E9]"
                text="text-green-900"
              />
            ))}
        </div>
      </div>

      {/* Out_of_Stock Board at Bottom */}
      <div className="w-full bg-slate-400 rounded-md overflow-y-auto overflow-x-hidden">
        <div className="flex flex-row">
          {boards
            .filter((board) => board.title === "Out_of_Stock")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                flex=" flex "
                hight="h-[calc(100vh-525px)] py-0 w-screen "
                color="bg-gradient-to-r from-[#A5D6A7] to-[#E8F5E9]"
                text="text-green-900"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewFinishedBoardPage;

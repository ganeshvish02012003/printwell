import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import DesginBoard from "../components/pageKanbanBoard/desginBoard";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// ✅ Define boardId ↔ subStatus mapping
const boardIdToSubStatus = {
  "bind-to-do-board": "Bind To Do",
  "binding-1-board": "Binding",
  "binding-2-board": "Cutting",
  "binding-3-board": "perfeting",
  "binding-4-board": "Lamination",
  finished: "finished",
};

const ViewBindBoardpage = () => {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    }
  }, [user, navigate]);

  // ✅ Fetch jobs and map them to Binding-related boards
  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      const jobs = dataResponse?.data || [];

      const statuses = [
        "Bind To Do",
        "Binding",
        "Cutting",
        "perfeting",
        "Lamination",
        "finished",
      ];

      const boardList = statuses.map((status) => {
        let cards = [];

        if (status === "Bind To Do") {
          const validSubStatuses = statuses.slice(1); // exclude "Bind To Do"
          cards = jobs
            .filter(
              (job) =>
                job.job?.status === "Binding" &&
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
                job.job?.status === "Binding" && job.job?.subStatus === status
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

  const handleDragEnter = (cid, bid) => {
    setTargetCard({ cid, bid });
  };

  const handleDragEnd = async (cid, bid) => {
    const sIndex = boards.findIndex((b) => b.id === bid);
    const tIndex = boards.findIndex((b) => b.id === targetCard.bid);
    if (sIndex < 0 || tIndex < 0) return;

    const sourceBoard = boards[sIndex];
    const targetBoard = boards[tIndex];

    const cIndex = sourceBoard.cards.findIndex((c) => c._id === cid);
    const targetCIndex = targetBoard.cards.findIndex(
      (c) => c._id === targetCard.cid
    );
    if (cIndex < 0) return;

    const cardToMove = sourceBoard.cards[cIndex];

    const isSameBoard = sourceBoard.id === targetBoard.id;
    const isSamePosition =
      (targetCIndex === -1 && isSameBoard) || cIndex === targetCIndex;

    if (isSameBoard && isSamePosition) {
      setTargetCard({ bid: "", cid: "" });
      return;
    }

    const updatedSourceCards = [...sourceBoard.cards];
    updatedSourceCards.splice(cIndex, 1);

    const updatedTargetCards = [...targetBoard.cards];
    if (targetCIndex === -1) {
      updatedTargetCards.push(cardToMove);
    } else {
      updatedTargetCards.splice(targetCIndex, 0, cardToMove);
    }

    const updatedBoards = [...boards];
    updatedBoards[sIndex] = { ...sourceBoard, cards: updatedSourceCards };
    updatedBoards[tIndex] = { ...targetBoard, cards: updatedTargetCards };
    setBoards(updatedBoards);
    setTargetCard({ bid: "", cid: "" });

    try {
      const realId = cid.replace("-copy", "");
      let newSubStatus = boardIdToSubStatus[targetCard.bid] || "Bind To Do";

      await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: realId,
          job: {
            ...cardToMove.job,
            status: "Binding",
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
    <div className="h-[calc(88vh)] mx-1 flex flex-col">
      <div className="flex-1 bg-slate-400 rounded-md p-2 overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200">
        <div className="flex gap-1 min-w-fit overflow-x-auto">
          {boards
            .filter((board) => board.title !== "finished")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                color="bg-gradient-to-r from-[#FFD54F] to-[#FFF7B2]"
                text="text-yellow-900"
              />
            ))}
        </div>
      </div>

      {/* Print Board at Bottom */}
      <div className="  w-full bg-slate-400 rounded-md  overflow-y-auto overflow-x-hidden">
        <div className="flex flex-row ">
          {boards
            .filter((board) => board.title === "finished")
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                flex=" flex "
                hight="h-[calc(100vh-525px)] py-0 w-screen "
                color="bg-gradient-to-r from-[#FFD54F] to-[#FFF7B2]"
                text="text-yellow-900"
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ViewBindBoardpage;

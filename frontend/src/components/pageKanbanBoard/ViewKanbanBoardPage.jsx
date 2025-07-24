import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../../common";
import DesginBoard from "./desginBoard";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ViewKanbanBoardPage = ({
  mainStatus,
  subStatuses = [],
  printSubStatus = null,
}) => {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();

  const boardIdToSubStatus = useMemo(() => {
    const mapping = {};
    subStatuses.forEach((status) => {
      mapping[`${status.toLowerCase().replace(/\s+/g, "-")}-board`] = status;
    });
    return mapping;
  }, [subStatuses]);

  useEffect(() => {
    if (!user?.role) {
      navigate("/login");
    }
  }, [user, navigate]);

  const isCardBelongsToBoard = (job, mainStatus, subStatus) => {
    const jobStatus = job?.job?.status;
    const jobSubStatus = job?.job?.subStatus;

    const normalize = (str) =>
      str?.toLowerCase().replace(/\s+/g, "_").replace(/-/g, "_");

    const nStatus = normalize(jobStatus);
    const nSubStatus = normalize(jobSubStatus);
    const nMain = normalize(mainStatus);
    const nSub = normalize(subStatus);

    // Binding shared between Printing and Other_work
    if (
      nSub === "binding" &&
      nSubStatus === "binding" &&
      (nStatus === "printing" || nStatus === "other_work")
    ) {
      return true;
    }

    // Finished shared between Other_work and Completed
    if (
      (nSub === "finished" || nSub === "recent_job_end") &&
      nSubStatus === "finished" &&
      (nStatus === "other_work" || nStatus === "completed")
    ) {
      return true;
    }

    // Print shared between Design and Printing
    if (
      nSub === "print" &&
      nSubStatus === "print" &&
      (nStatus === "desgin" || nStatus === "printing")
    ) {
      return true;
    }

    return nMain === nStatus && nSub === nSubStatus;
  };

  const fetchAllJob = async () => {
    try {
      const response = await fetch(SummaryApi.allJob.url);
      const dataResponse = await response.json();
      const jobs = dataResponse?.data || [];

      const boardList = subStatuses.map((subStatus) => {
        let cards = [];

        if (subStatus === printSubStatus) {
          cards = jobs
            .filter((job) => isCardBelongsToBoard(job, mainStatus, subStatus))
            .map((job) => ({
              _id: job._id,
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        } else if (subStatus === "To Do") {
          const validSubStatuses = subStatuses.filter((s) => s !== "To Do");
          cards = jobs
            .filter((job) => isCardBelongsToBoard(job, mainStatus, subStatus))
            .map((job) => ({
              _id: job._id,
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        } else {
          cards = jobs
            .filter((job) => isCardBelongsToBoard(job, mainStatus, subStatus))
            .map((job) => ({
              _id: job._id,
              title: job.job?.jobName || "Untitled",
              job: job.job,
              general: job.general,
              createdAt: job.createdAt,
            }));
        }

        return {
          id: `${subStatus.toLowerCase().replace(/\s+/g, "-")}-board`,
          title: subStatus,
          cards,
        };
      });

      setBoards(boardList);
    } catch (err) {
      console.error("Error fetching jobs:", err);
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

    try {
      let newSubStatus = boardIdToSubStatus[targetBoard.id];
      if (targetBoard.title.toLowerCase() === "finished") {
        newSubStatus = "finished";
      }

      const getNewStatusFromSubStatus = (subStatus) => {
        switch (subStatus?.toLowerCase()) {
          case "binding":
            return "Other_work";
          case "finished":
          case "recent_job_end":
            return "Completed";
          case "print":
            return "Printing"; // 🔁 Treat `Print` as Printing side when dropped
          case "printer 1":
          case "printer 2":
          case "printer 3":
          case "printer 4":
          case "printer 5":
            return "Printing";
          case "to binding":
          case "cutting":
          case "lamination":
          case "perfeting":
            return "Other_work";
          case "draw bill":
          case "for dispatch":
          case "store":
          case "out_of_stock":
            return "Completed";
          default:
            return mainStatus;
        }
      };

      let newStatus = getNewStatusFromSubStatus(newSubStatus);

      const cleanId = cid.replace("-copy", "");
      const payload = {
        _id: cleanId,
        job: {
          ...cardToMove.job,
          status: newStatus,
          subStatus: newSubStatus,
        },
      };

      console.log("Sending update-job request:", payload);

      const res = await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Update failed");
      }

      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Backend update failed", err);
    }
  };

  return (
    <div className="h-[calc(88vh)] mx-1 flex flex-col">
      <div className="flex-1 bg-slate-400 rounded-md p-2 overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200">
        <div className="flex gap-1 min-w-fit overflow-x-auto ">
          {boards
            .filter((board) => board.title !== printSubStatus)
            .map((board) => (
              <DesginBoard
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
                color="bg-gradient-to-r from-[#9C27B0] to-[#E1BEE7]"
              />
            ))}
        </div>
      </div>

      {/* Print Board */}
      {printSubStatus && (
        <div className="w-full bg-slate-400 rounded-md overflow-y-auto overflow-x-hidden">
          <div className="flex flex-row">
            {boards
              .filter((board) => board.title === printSubStatus)
              .map((board) => (
                <DesginBoard
                  key={board.id}
                  boards={board}
                  handleDragEnd={handleDragEnd}
                  handleDragEnter={handleDragEnter}
                  fetchAllJob={fetchAllJob}
                  flex="flex"
                  hight="h-[calc(100vh-525px)] py-0 w-screen"
                  color="bg-gradient-to-r from-[#9C27B0] to-[#E1BEE7]"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewKanbanBoardPage;

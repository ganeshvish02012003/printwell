import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../../common";
import DesginBoard from "./DesginBoard";
import { throttle } from "lodash";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_BACKEND_DOMAIN, {
  withCredentials: true,
});

const ViewKanbanBoardPage = ({
  mainStatus,
  subStatuses = [],
  printSubStatus = null,
  color = "bg-gradient-to-r from-[#9C27B0] to-[#E1BEE7]", // default fallback color
  text = "text-black",
  gradientColor = "#9C27B0",
}) => {
  const [boards, setBoards] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

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
    setLoading(true); // Start loading
    try {
      const response = await fetch(SummaryApi.allJob.url, {
        method: SummaryApi.allJob.method,
        credentials: "include",
      });
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
    } finally {
      setLoading(false); // Stop loading after response
    }
  };

  const throttledFetchJobs = useMemo(() => throttle(fetchAllJob, 1000), []);

  // useEffect(() => {
  //   fetchAllJob();

  //   const onStorage = (e) => {
  //     if (e.key === "kanban_sync") {
  //       throttledFetchJobs();
  //     }
  //   };

  //   window.addEventListener("storage", onStorage);
  //   return () => {
  //     window.removeEventListener("storage", onStorage);
  //     throttledFetchJobs.cancel();
  //   };
  // }, [throttledFetchJobs]);

  useEffect(() => {
    fetchAllJob();

    // 🔥 Listen for socket events from backend
    socket.on("jobUpdated", () => {
      // console.log("Received jobUpdated event -> refreshing jobs");
      throttledFetchJobs();
    });

    socket.on("jobCreated", () => {
      // console.log("Received jobCreated event -> refreshing jobs");
      throttledFetchJobs();
    });

    socket.on("jobDeleted", () => {
      // console.log("Received jobDeleted event -> refreshing jobs");
      throttledFetchJobs();
    });

    return () => {
      // 🔥 cleanup
      socket.off("jobUpdated");
      socket.off("jobCreated");
      socket.off("jobDeleted");
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
          case "SWIFT 1":
          case "SWIFT 2":
          case "SWIFT 3":
          case "SAHIL":
          case "RULLING":
          case "SCREEN":
          case "RISO":
          case "RISO COM COLOR":
          case "KONICA MINOLTA":
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

      // console.log("Sending update-job request:", payload);

      const res = await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      if (!res.ok) {
        throw new Error(resData.message || "Update failed");
      }

      // localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Backend update failed", err);
    }
  };

  const loaderStyle = {
    height: "4px",
    width: "calc(100vw - 18px)",
    background: `no-repeat linear-gradient(${gradientColor} 0 0), no-repeat linear-gradient(${gradientColor} 0 0), white`,
    backgroundSize: "60% 100%",
    animation: "l16 1s infinite",
    position: "fixed",
    top: 68,
    left: 9,
    zIndex: 9999,
  };

  return (
    <div className="h-[calc(100vh-75px)] mx-1   flex flex-col">
      {loading && (
        <div className="z-50 flex px-2 justify-center ">
          <style>
            {`
          @keyframes l16 {
            0%   {background-position: -150% 0, -150% 0}
            66%  {background-position: 250% 0, -150% 0}
            100% {background-position: 250% 0, 250% 0}
          }
        `}
          </style>
          <div style={loaderStyle}></div>
        </div>
      )}

      <div className="flex-1 bg-slate-400 rounded-md p-1 overflow-y-hidden scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-200">
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
                color={color}
                text={text}
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
                  hight="h-[calc(1vh+115px)] py-0 w-screen"
                  color={color}
                  text={text}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewKanbanBoardPage;

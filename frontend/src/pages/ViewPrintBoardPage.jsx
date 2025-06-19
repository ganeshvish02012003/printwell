import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import Board from "../components/KanbanBoard/Board";

const ViewPrintBoardPage = () => {
  const [allJob, setAllJob] = useState([]);
  const [targetCard, setTargetCard] = useState({ bid: "", cid: "" });

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();
    const jobs = dataResponse?.data || [];
    setAllJob(jobs);
    console.log("-------------->", jobs);
  };

  useEffect(() => {
    fetchAllJob();
  }, []);

  const handleDragEnter = (cardId, boardId) => {
    setTargetCard({ bid: boardId, cid: cardId });
  };

  const handleDragEnd = async (cardId, sourceBoardId) => {
    // Find the job being dragged
    const jobToUpdate = allJob.find((job) => job._id === cardId);
    if (!jobToUpdate || !targetCard.bid) return;

    // Convert boardId back to status
    const boardIdToStatusMap = {
      "to-do-print-board": "To Do",
      "Printer-1": "Printer-1",
      "Printer-2": "Printer-2",
      "Printer-3": "Printer-3",
      "Printer-4": "Printer-4",
      "Printer-5": "Printer-5",
      "Printer-6": "Printer-6",
    };

    // const boardIdToStatusMap = {
    //   "to-do-print-board": "To Do",
    //   "Printer-1": "Printer-1",
    //   "Printer-2": "Printer-2",
    //   "Printer-3": "Printer-3",
    //   "Printer-4": "Printer-4",
    //   "Printer-5": "Printer-5",
    //   "Printer-6": "Printer-6",
    // };

    const newStatus = boardIdToStatusMap[targetCard.bid];
    if (!newStatus) return;

    try {
      await fetch(SummaryApi.updateJob.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: cardId,
          job: {
            ...jobToUpdate.job,
            status: newStatus,
          },
        }),
      });
      fetchAllJob(); // Refresh board data after update
    } catch (error) {
      console.error("Failed to update job status:", error);
    }

    setTargetCard({ bid: "", cid: "" });
  };

  const getCardsByStatus = (status) =>
    allJob
      .filter((job) => job?.job?.status === status)
      .map((job) => ({
        id: job._id,
        title: job.job?.jobName || "Untitled",
        job,
      }));

  return (
    <div className="flex gap-4 overflow-x-auto p-4">
      <Board
        boards={{ id: "to-do-print-board", title: "To Do", cards: getCardsByStatus("To Do") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-1", title: "Printer-1", cards: getCardsByStatus("Printer-1") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-2", title: "Printer-2", cards: getCardsByStatus("Printer-2") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-3", title: "Printer-3", cards: getCardsByStatus("Printer-3") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-4", title: "Printer-4", cards: getCardsByStatus("Printer-4") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-5", title: "Printer-5", cards: getCardsByStatus("Printer-5") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
      <Board
        boards={{ id: "Printer-6", title: "Printer-6", cards: getCardsByStatus("Printer-6") }}
        handleDragEnd={handleDragEnd}
        handleDragEnter={handleDragEnter}
        fetchAllJob={fetchAllJob}
      />
    </div>
  );
};

export default ViewPrintBoardPage;
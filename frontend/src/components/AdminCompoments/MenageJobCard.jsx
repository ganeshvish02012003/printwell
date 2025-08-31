import React, { useEffect, useState, useCallback, useMemo } from "react";
import Board from "../KanbanBoard/Board";
import SummaryApi from "../../common";
import { useSelector } from "react-redux";
import Login from "../../pages/Login";
import throttle from "lodash/throttle";
import TabPanel from "../TabPanel";

const statusToBoardId = {
  Pending: "To_Do",
  Desgin: "Desgin",
  Printing: "Printing",
  Other_work: "Other_work",
  Completed: "Finished",
};

const boardIdToStatus = {
  To_Do: "Pending",
  Desgin: "Desgin",
  Printing: "Printing",
  Other_work: "Other_work",
  Finished: "Completed",
};

const initialBoards = [
  { id: "To_Do", title: "To Do", cards: [] },
  { id: "Desgin", title: "Design", cards: [] },
  { id: "Printing", title: "Printing", cards: [] },
  { id: "Other_work", title: "Other Work", cards: [] },
  { id: "Finished", title: "Finished", cards: [] },
];

const MenageJobCard = () => {
  const [boards, setBoards] = useState(initialBoards);
  const [target, setTarget] = useState({ cid: "", bid: "" });
  const user = useSelector((state) => state?.user?.user);
  const [openAddJob, setOpenAddJob] = useState(false);

  /* ------------------------------------------------------------------ */
  /* 1️⃣  FETCH ALL JOBS (memoised so reference stays stable)            */
  /* ------------------------------------------------------------------ */
  const fetchAllJob = useCallback(async () => {
    try {
      const res = await fetch(SummaryApi.allJob.url, {
        method: SummaryApi.allJob.method,
        credentials: "include",
      });
      const { data: allJobs = [] } = await res.json();

      // allJobs.forEach((job) => {
      //   console.log("Job ID:", job?._id);
      //   console.log("Status:", job?.job?.status);
      //   console.log("SubStatus:", job?.job?.subStatus);
      // });

      const cards = allJobs.map((job) => {
        // ✅ Auto-update status to Completed if subStatus is Finished
        if (job?.job?.subStatus?.toLowerCase() === "finished") {
          job.job.status = "Completed";
        }

        if (job?.job?.subStatus?.toLowerCase() === "print") {
          job.job.status = "Printing";
        }

        if (job?.job?.subStatus?.toLowerCase() === "binding") {
          job.job.status = "Other_work"; // prefer `Other_work` for UI consistency
        }

        let boardId = statusToBoardId[job?.job?.status] || "To_Do";

        // ✅ Special case for Binding jobs under Printing
        if (
          job.job?.status === "Printing" &&
          job.job?.subStatus === "Binding"
        ) {
          boardId = "Other_work";
        }

        return {
          _id: job._id,
          boardId,
          createdAt: job.createdAt,
          general: job.general,
          job: job.job,
          composing: job.composing,
          paper: job.paper,
          printing: job.printing,
          binding: job.binding,
          finished: job.finished,
        };
      });

      const temp = initialBoards.map((b) => ({ ...b, cards: [] }));
      cards.forEach((c) => {
        const board = temp.find((b) => b.id === c.boardId);
        board && board.cards.push(c);
      });

      setBoards(temp);
    } catch (err) {
      console.error("Failed to fetch jobs:", err);
    }
  }, []);

  /* ------------------------------------------------------------------ */
  /* 2️⃣  THROTTLED WRAPPER                                             */
  /* ------------------------------------------------------------------ */
  const throttledFetchJobs = useMemo(
    () => throttle(fetchAllJob, 1000), // once per second max
    [fetchAllJob]
  );

  /* ------------------------------------------------------------------ */
  /* 3️⃣  INITIAL LOAD + STORAGE-EVENT LISTENER                         */
  /* ------------------------------------------------------------------ */
  useEffect(() => {
    fetchAllJob();

    const onStorage = (e) => {
      if (e.key === "kanban_sync") throttledFetchJobs();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
      throttledFetchJobs.cancel();
    };
  }, [fetchAllJob, throttledFetchJobs]);

  /* ------------------------------------------------------------------ */
  /* 4️⃣  HELPER CALLBACKS                                              */
  /* ------------------------------------------------------------------ */

  const handleDragEnter = (cid, bid) => {
    setTarget({ cid: cid || null, bid });
  };

  /* ------------------------------------------------------------------ */
  /* 5️⃣  DRAG-END (update UI + backend + broadcast)                    */
  /* ------------------------------------------------------------------ */
  const handleDragEnd = async (cid, bid) => {
    const s_bIndex = boards.findIndex((b) => b.id === bid);
    const t_bIndex = boards.findIndex((b) => b.id === target.bid);
    if (s_bIndex < 0 || t_bIndex < 0) return;

    const s_cIndex = boards[s_bIndex].cards.findIndex((c) => c._id === cid);
    if (s_cIndex < 0) return;

    const tempBoards = [...boards];
    const movedCard = tempBoards[s_bIndex].cards.splice(s_cIndex, 1)[0];

    const t_cIndex = tempBoards[t_bIndex].cards.findIndex(
      (c) => c._id === target.cid
    );
    if (t_cIndex < 0 || target.cid == null)
      tempBoards[t_bIndex].cards.push(movedCard);
    else tempBoards[t_bIndex].cards.splice(t_cIndex, 0, movedCard);

    setBoards(tempBoards);
    setTarget({ cid: null, bid: null });

    /* ---- backend sync ---- */
    try {
      try {
        let newStatus = boardIdToStatus[target.bid] || "Pending";
        let newSubStatus = movedCard.job?.subStatus;

        // Set subStatus based on new status
        switch (newStatus) {
          case "Desgin":
            newSubStatus = "To Do";
            break;
          case "Printing":
            newSubStatus = "print To Do";
            break;
          case "Other_work":
            newSubStatus = "Binding";
            break;
          case "Completed":
            newSubStatus = "finished";
            break;
          default:
            newSubStatus = movedCard.job?.subStatus || "";
            break;
        }

        // console.log("🟡 Sending update:", {
        //   _id: movedCard._id,
        //   status: newStatus,
        //   subStatus: newSubStatus,
        // });

        await fetch(SummaryApi.upDateJob.url, {
          method: SummaryApi.upDateJob.method,
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
          body: JSON.stringify({
            _id: movedCard._id,
            job: {
              ...movedCard.job,
              status: newStatus,
              subStatus: newSubStatus,
            },
          }),
        });

        localStorage.setItem("kanban_sync", Date.now().toString());
      } catch (err) {
        console.error("Backend update failed", err);
      }

      // broadcast change so other tabs refresh
      localStorage.setItem("kanban_sync", Date.now().toString());
    } catch (err) {
      console.error("Backend update failed", err);
    }
  };

  /* ------------------------------------------------------------------ */
  /* 6️⃣  RENDER                                                       */
  /* ------------------------------------------------------------------ */
  if (!user?.role) return <Login />;

  return (
    <div className="h-[calc(88vh)] w-[84vw]   rounded-md p-2 pb-0 flex flex-col gap-1">
      <div className="w-full px-4 h-10 bg-slate-500 rounded-md flex justify-between items-center ">
        <h2 className="font-bold text-white text-lg">Menage Jobs</h2>
        <button
          className="  border-2 px-2  border-green-400 text-green-400 hover:bg-green-400 hover:text-white transition-all rounded-full"
          onClick={() => setOpenAddJob(true)}
        >
          Add Job
        </button>
      </div>
      <div className="flex-1  overflow-x-scroll scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-slate-400 ">
        <div className=" flex gap-1">
          {boards
            ?.filter((job) => job?.job?.subStatus !== "Out_of_Stock")
            .map((board) => (
              <Board
                key={board.id}
                boards={board}
                handleDragEnd={handleDragEnd}
                handleDragEnter={handleDragEnter}
                fetchAllJob={fetchAllJob}
              />
            ))}
        </div>
      </div>

      {openAddJob && (
        <TabPanel
          onClose={() => setOpenAddJob(false)}
          fetchAllJob={fetchAllJob}
        />
      )}
    </div>
  );
};

export default MenageJobCard;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Board from "../components/KanbanBoard/Board";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import Login from "./Login";
import throttle from "lodash/throttle";

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

const Home = () => {
  const [boards, setBoards] = useState(initialBoards);
  const [target, setTarget] = useState({ cid: "", bid: "" });
  const [cardCounter, setCardCounter] = useState(1);
  const user = useSelector((state) => state?.user?.user);

  /* ------------------------------------------------------------------ */
  /* 1️⃣  FETCH ALL JOBS (memoised so reference stays stable)            */
  /* ------------------------------------------------------------------ */
  const fetchAllJob = useCallback(async () => {
    try {
      const res = await fetch(SummaryApi.allJob.url);
      const { data: allJobs = [] } = await res.json();

      const cards = allJobs.map((job) => {
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

  const handleDragEnter = (cid, bid) => setTarget({ cid: cid || null, bid });

  /* ------------------------------------------------------------------ */
  /* 5️⃣  DRAG-END (update UI + backend + broadcast)                    */
  /* ------------------------------------------------------------------ */
  const handleDragEnd = async (cid, bid) => {
    const s_bIndex = boards.findIndex((b) => b.id === bid);
    const t_bIndex = boards.findIndex((b) => b.id === target.bid);
    if (s_bIndex < 0 || t_bIndex < 0) return;

    const s_cIndex = boards[s_bIndex].cards.findIndex((c) => c.id === cid);
    if (s_cIndex < 0) return;

    const tempBoards = [...boards];
    const movedCard = tempBoards[s_bIndex].cards.splice(s_cIndex, 1)[0];

    const t_cIndex = tempBoards[t_bIndex].cards.findIndex(
      (c) => c.id === target.cid
    );
    if (t_cIndex < 0 || target.cid == null)
      tempBoards[t_bIndex].cards.push(movedCard);
    else tempBoards[t_bIndex].cards.splice(t_cIndex, 0, movedCard);

    setBoards(tempBoards);
    setTarget({ cid: null, bid: null });

    /* ---- backend sync ---- */
    try {
      const newStatus = boardIdToStatus[target.bid] || "Pending";
      await fetch(SummaryApi.upDateJob.url, {
        method: SummaryApi.upDateJob.method,
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          _id: movedCard._id,
          job: { ...movedCard.job, status: newStatus },
        }),
      });
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
    <div className="h-[calc(100vh-164px)] bg-slate-400 mx-1 rounded-md p-4 pb-2 flex flex-col gap-5">
      <div className="flex-1 w-full overflow-x-scroll">
        <div className="min-w-fit flex gap-1">
          {boards.map((board) => (
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
    </div>
  );
};

export default Home;

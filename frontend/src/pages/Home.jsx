import React, { useEffect, useState } from "react";
import Board from "../components/KanbanBoard/Board";
import SummaryApi from "../common";
import ROLE from "../common/role";
import { useSelector } from "react-redux";
import Login from "./Login";

const Home = () => {
  const [boards, setBoards] = useState([
    {
      id: "To_Do",
      title: "To Do",
      cards: [],
    },
    {
      id: "Desgin",
      title: "Design",
      cards: [],
    },
    {
      id: "Printing",
      title: "Printing",
      cards: [],
    },
    {
      id: "Other_work",
      title: "Other Work",
      cards: [],
    },
    {
      id: "Finished",
      title: "Finished",
      cards: [],
    },
  ]);

  const [target, setTarget] = useState({ cid: "", bid: "" });
  const [cardCounter, setCardCounter] = useState(1);
  const user = useSelector((state) => state?.user?.user);

  const fetchAllJob = async () => {
    const response = await fetch(SummaryApi.allJob.url);
    const dataResponse = await response.json();
    const allJobs = dataResponse?.data || [];

    // Get current stored data
    const savedJobs = JSON.parse(localStorage.getItem("kanban_jobs")) || [];
    const savedPositions =
      JSON.parse(localStorage.getItem("kanban_card_positions")) || {};

    const isSameData =
      savedJobs.length === allJobs.length &&
      savedJobs.every((job, idx) => {
        const newJob = allJobs[idx];
        return (
          job?.job?.jobName === newJob?.job?.jobName &&
          job?.date === newJob?.date &&
          job?.desc === newJob?.desc
        );
      });

    if (!isSameData) {
      // Only update localStorage if data has changed
      localStorage.setItem("kanban_jobs", JSON.stringify(allJobs));
    }

    const tempBoards = [...boards];
    const cards = allJobs.map((job, index) => {
      const id = String(cardCounter + index).padStart(4, "0");
      const boardId = savedPositions[id] || "To_Do"; // Restore saved board or default to "To_Do"
      return {
        id,
        title: job?.job?.jobName,
        labels: [],
        tasks: [],
        date: job.date || "",
        desc: job.desc || "",
        boardId,
      };
    });

    // Clear all cards first
    tempBoards.forEach((board) => (board.cards = []));

    // Assign cards to boards based on saved boardId
    cards.forEach((card) => {
      const board = tempBoards.find((b) => b.id === card.boardId);
      if (board) board.cards.push(card);
    });

    setBoards(tempBoards);
    setCardCounter((prev) => prev + allJobs.length);
  };

  // const fetchAllJob = async () => {
  //   try {
  //     // 1. Fetch all job data
  //     const response = await fetch(SummaryApi.allJob.url);
  //     const dataResponse = await response.json();
  //     const allJobs = dataResponse?.data || [];
  
  //     // 2. Fetch card positions from backend
  //     const positionResponse = await fetch(SummaryApi.getCardPositions.url); // Add this API endpoint
  //     const positionData = await positionResponse.json();
  //     const savedPositions = positionData?.positions || {}; 
  //     // Example format: { "0001": "To_Do", "0002": "Finished" }
  
  //     // 3. Prepare a copy of boards
  //     const tempBoards = [...boards];
  
  //     // 4. Map jobs into cards
  //     const cards = allJobs.map((job, index) => {
  //       const id = String(cardCounter + index).padStart(4, "0");
  //       const boardId = savedPositions[id] || "To_Do"; // Use saved boardId or default to "To_Do"
  //       return {
  //         id,
  //         title: job?.job?.jobName,
  //         labels: [],
  //         tasks: [],
  //         date: job.date || "",
  //         desc: job.desc || "",
  //         boardId,
  //       };
  //     });
  
  //     // 5. Clear existing cards on all boards
  //     tempBoards.forEach((board) => {
  //       board.cards = [];
  //     });
  
  //     // 6. Assign each card to its corresponding board
  //     cards.forEach((card) => {
  //       const board = tempBoards.find((b) => b.id === card.boardId);
  //       if (board) {
  //         board.cards.push(card);
  //       }
  //     });
  
  //     // 7. Update state
  //     setBoards(tempBoards);
  //     setCardCounter((prev) => prev + allJobs.length);
  
  //   } catch (error) {
  //     console.error("Error fetching jobs or positions:", error);
  //   }
  // };
  

  useEffect(() => {
    fetchAllJob();
  }, []);

  // --------------------------------------------
  const addCard = (title, bid) => {
    const newId = String(cardCounter).padStart(4, "0");

    const card = {
      id: newId,
      title,
      labels: [],
      tasks: [],
      date: "",
      desc: "",
    };

    const index = boards.findIndex((item) => item.id === bid);
    if (index < 0) return;

    const tempBoards = [...boards];
    tempBoards[index].cards.push(card);
    setBoards(tempBoards);
    setCardCounter((prev) => prev + 1);
  };

  const removeCard = (cid, bid) => {
    const bIndex = boards.findIndex((item) => item.id === bid);
    if (bIndex < 0) return;

    const cIndex = boards[bIndex].cards.findIndex((item) => item.id === cid);
    if (cIndex < 0) return;

    const tempBoards = [...boards];
    tempBoards[bIndex].cards.splice(cIndex, 1);
    setBoards(tempBoards);
  };

  const handleDragEnter = (cid, bid) => {
    setTarget({ cid: cid || null, bid });
  };

  // const handleDragEnd = async (cid, bid) => {
  //   let s_bIndex = boards.findIndex((item) => item.id === bid);
  //   if (s_bIndex < 0) return;

  //   let s_cIndex = boards[s_bIndex].cards.findIndex((item) => item.id === cid);
  //   if (s_cIndex < 0) return;

  //   let t_bIndex = boards.findIndex((item) => item.id === target.bid);
  //   if (t_bIndex < 0) return;

  //   const tempBoards = [...boards];
  //   const tempCard = tempBoards[s_bIndex].cards[s_cIndex];
  //   tempBoards[s_bIndex].cards.splice(s_cIndex, 1);

  //   let t_cIndex = tempBoards[t_bIndex].cards.findIndex(
  //     (item) => item.id === target.cid
  //   );
  //   if (t_cIndex < 0 || target.cid === null) {
  //     tempBoards[t_bIndex].cards.push(tempCard);
  //   } else {
  //     tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
  //   }

  //   setBoards(tempBoards);
  //   setTarget({ cid: null, bid: null });

  //   // Save updated "kanban_jobs" (job data in To_Do board)
  //   const toDoBoard = tempBoards.find((b) => b.id === "To_Do");
  //   if (toDoBoard) {
  //     const jobsToSave = toDoBoard.cards.map((card) => ({
  //       job: { jobName: card.title },
  //       date: card.date,
  //       desc: card.desc,
  //     }));
  //     localStorage.setItem("kanban_jobs", JSON.stringify(jobsToSave));
  //   }

  //   // ✅ Save updated card positions
  //   const positions = {};
  //   tempBoards.forEach((board) => {
  //     board.cards.forEach((card) => {
  //       positions[card.id] = board.id;
  //     });
  //   });
   

  //   // Save updated positions to backend
  //   const fetchPositionData = await fetch(SummaryApi.cardPosition.url, {
  //     method: SummaryApi.cardPosition.method,
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ positions }),
  //   });
  //   const PositionData = await fetchPositionData.json();

  //   PositionData()
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log("Positions saved:", data);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving positions:", error);
  //     });
  // };

  const handleDragEnd = async (cid, bid) => {
    // Find source board
    let s_bIndex = boards.findIndex((item) => item.id === bid);
    if (s_bIndex < 0) return;
  
    // Find source card
    let s_cIndex = boards[s_bIndex].cards.findIndex((item) => item.id === cid);
    if (s_cIndex < 0) return;
  
    // Find target board
    let t_bIndex = boards.findIndex((item) => item.id === target.bid);
    if (t_bIndex < 0) return;
  
    const tempBoards = [...boards];
    const tempCard = tempBoards[s_bIndex].cards[s_cIndex];
  
    // Remove card from source board
    tempBoards[s_bIndex].cards.splice(s_cIndex, 1);
  
    // Find target card index
    let t_cIndex = tempBoards[t_bIndex].cards.findIndex(
      (item) => item.id === target.cid
    );
  
    // Add card to target board
    if (t_cIndex < 0 || target.cid === null) {
      tempBoards[t_bIndex].cards.push(tempCard);
    } else {
      tempBoards[t_bIndex].cards.splice(t_cIndex, 0, tempCard);
    }
  
    // Update UI state
    setBoards(tempBoards);
    setTarget({ cid: null, bid: null });
  
    // Save updated jobs in "To_Do" to localStorage
    const toDoBoard = tempBoards.find((b) => b.id === "To_Do");
    if (toDoBoard) {
      const jobsToSave = toDoBoard.cards.map((card) => ({
        job: { jobName: card.title },
        date: card.date,
        desc: card.desc,
      }));
      localStorage.setItem("kanban_jobs", JSON.stringify(jobsToSave));
    }
  
    // Save updated positions
    const positions = {};
    tempBoards.forEach((board) => {
      board.cards.forEach((card) => {
        positions[card.id] = board.id;
      });
    });
  
    try {
      const response = await fetch(SummaryApi.cardPosition.url, {
        method: SummaryApi.cardPosition.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ positions }),
      });
  
      const data = await response.json();
      console.log("Positions saved:", data);
    } catch (error) {
      console.error("Error saving positions:", error);
    }
  };
  

  

  if (!user?.role) {
    return <Login />;
  }

  return (
    <div className="h-[calc(100vh-164px)] bg-slate-400 mx-1 rounded-md px-4 flex flex-col gap-5">
      <div className="w-full border-b border-gray-300">
        {/* <h2>Kanban</h2> */}
      </div>

      <div className="flex-1 w-full overflow-x-scroll">
        <div className="min-w-fit flex gap-1">
          {boards.map((board) => (
            <Board
              key={board.id}
              boards={board}
              addCard={addCard}
              removeCard={removeCard}
              handleDragEnd={handleDragEnd}
              handleDragEnter={handleDragEnter}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;

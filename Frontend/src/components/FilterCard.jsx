// import React from "react";
import { useState } from "react";


const FilterCard = () => {
  const [filter, setFilter] = useState("all");

  
    
  
  
  return (
    <div>
      <button onClick={() => setFilter("today")}>Today</button>
      <button onClick={() => setFilter("week")}>This Week</button>
      <button onClick={() => setFilter("month")}>This Month</button>
      <button onClick={() => setFilter("year")}>This Year</button>
      <button onClick={() => setFilter("all")}>All</button>
    </div>
  );
};

export default FilterCard;

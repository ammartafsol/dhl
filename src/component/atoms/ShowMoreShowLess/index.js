"use client";
import { useState } from "react";

const ShowMoreShowLessText = ({ text, visibility = 30 }) => {
  const [isShowingMore, setIsShowingMore] = useState(false);

  return (
    <>
      {text?.substring(0, isShowingMore ? text.length : visibility)}
      {text?.length > visibility && !isShowingMore && "..."}{" "}
      {text?.length > visibility && (
        <span
          onClick={() => setIsShowingMore((p) => !p)}
          style={{
            fontWeight: "700",
            cursor: "pointer",
          }}
        >
          {" "}
          {isShowingMore ? "Show Less" : "Show More"}
        </span>
      )}
    </>
  );
};

export default ShowMoreShowLessText;

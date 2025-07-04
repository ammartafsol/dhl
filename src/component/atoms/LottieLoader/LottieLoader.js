// "use client"
// import { Player } from "@lottiefiles/react-lottie-player";

// import classes from "./lottieLoader.module.css";

// const LottieLoader = ({ className }) => {
//   return (
//     <div className={`${classes?.container} ${className && className}`}>
//       <Player
//         autoplay
//         loop
//         src={"public\lottie\loadingSecondary.json"}
//         style={{ height: "300px", width: "300px" }}
//       ></Player>
//     </div>
//   );
// };

// export default LottieLoader;

import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import classes from "./lottieLoader.module.css";

const LottieLoader = ({ className, label }) => {
  return (
    <div className={`${classes?.container} ${className && className}`}>
      <Player
        autoplay
        loop
        src="/lottie/loadingSecondary.json"
        style={{ height: "300px", width: "300px" }}
      ></Player>
      {label && <p className={classes.label}>{label}</p>}
    </div>
  );
};

export default LottieLoader;

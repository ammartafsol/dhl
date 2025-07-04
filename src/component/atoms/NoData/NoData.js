import { ImSearch } from "react-icons/im";
import classes from "./noData.module.css";

function NoData({ text = "No Data Found", className }) {
  return (
    <div
      className={[classes.noDataContainer, className && className].join(" ")}
    >
      <ImSearch size={60} color={"var(--secondary-color)"} />
      <p>{text}</p>
    </div>
  );
}

export default NoData;

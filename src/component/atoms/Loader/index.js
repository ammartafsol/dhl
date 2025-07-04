import classes from "./Loader.module.css";

import Spinner from "react-bootstrap/Spinner";

export const Loader = ({ className, type }) => { // full
  return (
    <>
      <div
        className={`${classes.loaderContainer} ${className && className} ${
          type === "full" && classes.full
        }`}
      >
        <div className={classes.loaderBox}>
          <Spinner animation="grow" className={classes.loader} />
          <Spinner animation="grow" className={classes.loader} />
          <Spinner animation="grow" className={classes.loader} />
        </div>
      </div>
    </>
  );
};

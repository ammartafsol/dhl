import React from "react";
import classes from "./ShowDocuments.module.css";
import { FaFileContract } from "react-icons/fa";
import { MediaUrl } from "../../../resources/utils/helper";
import { MdFileDownload } from "react-icons/md";
import { LuLoaderCircle } from "react-icons/lu";

const ShowDocuments = ({ downloadDocumens, loading, item, selectedKey }) => {
  return (
    <div className={classes.filePreview}>
      {
        <span className={classes.previewIcon}>
          <FaFileContract
            title="View File"
            size={35}
            color="var(--royal-navy-blue)"
          />
        </span>
      }
      <div
        onClick={() => downloadDocumens(item?.key)}
        className={classes?.download}
      >
        {selectedKey === item?.key ? (
          <LuLoaderCircle
            cursor={"pointer"}
            fontSize={25}
            color="var(--royal-navy-blue)"
          />
        ) : (
          <MdFileDownload
            cursor={"pointer"}
            fontSize={25}
            color="var(--royal-navy-blue)"
          />
        )}
      </div>
    </div>
  );
};

export default ShowDocuments;

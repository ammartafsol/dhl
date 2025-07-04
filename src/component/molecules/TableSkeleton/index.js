import { Skeleton } from "@mui/material";
import React from "react";
import classes from "./TableSkeleton.module.css";

function TableSkeleton({ rowsCount = 10, colsCount = 5, height }) {
  const rows = Array(rowsCount).fill(0);
  const cols = Array(colsCount).fill(0);

  return (
    <>
      <style>{`
            table{
            width:100%;
            }
           
           .tr{
                all:unset;
                display:flex;
                gap:15px;
            }
            .table100{
               margin:10px;
            }
            `}</style>
      <div className={`table100 ver1 m-b-110 ${classes.tableSkeleton}`}>
        <div className=" js-pscroll ps ps--active-y">
          <table>
            <tbody>
              {rows.map((item, index) => (
                <tr className="row100 body tr" key={`row-${index}`}>
                  {cols?.map((item) => (
                    <td
                      style={{
                        width: `${100 / colsCount}%`,
                        paddingBlock: "5px",
                      }}
                      key={`col-${item}`}
                    >
                      <Skeleton height={height ?? 50} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default TableSkeleton;

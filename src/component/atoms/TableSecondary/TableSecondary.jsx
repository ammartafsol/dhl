import React from 'react';
import classes from './TableSecondary.module.css';

export default function TableSecondary({ headData, bodyData }) {
  return (
    <div className={classes.tableContainer}>
      <table className={classes.table}>
        <thead>
          <tr>
            {headData.map((head, index) => (
              <th key={index}>{head}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

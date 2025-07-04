"use client";

import { ClickAwayListener } from "@mui/material";
import { useState } from "react";
import { OverlayTrigger, Popover } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Style from "./PopOver.module.css";
import { mergeClass } from "@/resources/utils/helper";

export default function PopOver({
  popover = [],
  onClick = () => {},
  children = null,
}) {
  const [show, setShow] = useState(false);

  const overlayPopover = (
    <Popover id="popover-basic" className={Style?.overlayPopover}>
      <ClickAwayListener onClickAway={() => setShow(false)}>
        <Popover.Body className="p-0 m-0">
          <ul className={mergeClass(Style.overlay, "m-0 p-0")}>
            {Array.isArray(popover) && popover.length > 0 ? (
              popover.map((item, index) => (
                <li
                  key={index}
                  className={mergeClass(Style.overlayLink, "")}
                  onClick={() => {
                    onClick(item?.label);
                    setShow(false);
                  }}
                >
                  <span
                    className={mergeClass("text-black body05", Style.label)}
                  >
                    {item.label}
                  </span>
                </li>
              ))
            ) : (
              <li>No options available</li>
            )}
          </ul>
        </Popover.Body>
      </ClickAwayListener>
    </Popover>
  );

  return (
    <>
      <div>
        <OverlayTrigger
          trigger="click"
          placement="bottom-start"
          overlay={overlayPopover}
          show={show}
          onToggle={() => setShow(!show)}
        >
          <div onClick={() => setShow(true)}>
            {children ? (
              children
            ) : (
              <BsThreeDots
                fontSize={24}
                className="cursor-pointer"
                color="#777"
              />
            )}
          </div>
        </OverlayTrigger>
      </div>
    </>
  );
}

import * as React from "react";
import "./ScrollBar.css";

type Props = {
  onUpClick: () => void;
  onDownClick: () => void;
  barParams:
    | false
    | {
        min: number;
        max: number;
        cur: number;
      };
};

const ScrollBar: React.FC<Props> = ({ onUpClick, onDownClick, barParams }) => (
  <div className="scroll-container">
    <div
      className="scroll-button icon-button mdi md-48 mdi-chevron-up"
      onClick={onUpClick}
    />
    <div className="scroll-indicator" />
    <div
      className="scroll-button icon-button mdi md-48 mdi-chevron-down"
      onClick={onDownClick}
    />
  </div>
);

export default ScrollBar;

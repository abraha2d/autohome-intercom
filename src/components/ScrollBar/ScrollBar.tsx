import * as React from "react";
import "./ScrollBar.css";
import { MouseEventHandler } from "react";

type Props = {
  onUpClick: () => void;
  onDownClick: () => void;
  barParams:
    | false
    | {
        min: number;
        max: number;
        size: number;
        start: number;
      };
};

type State = {
  mouseDown: boolean;
  mouseStart: number;
};

class ScrollBar extends React.Component<Props, State> {
  readonly state: State = {
    mouseDown: false,
    mouseStart: 0
  };

  scrollHandleContainer = React.createRef<HTMLDivElement>();

  handleMouseMove: MouseEventHandler = evt => {
    const { onUpClick, onDownClick, barParams: bp } = this.props;
    const { mouseDown, mouseStart } = this.state;
    const { scrollHandleContainer } = this;
    if (!bp || !mouseDown) {
      return;
    }
    const {
      top,
      bottom
    } = scrollHandleContainer.current!.getBoundingClientRect();
    const stepSize = (bottom - top) / (bp.max + bp.size - bp.min);
    if (mouseStart - evt.pageY > stepSize) {
      onUpClick();
      this.setState({ mouseStart: evt.pageY });
    } else if (evt.pageY - mouseStart > stepSize) {
      onDownClick();
      this.setState({ mouseStart: evt.pageY });
    }
  };

  render() {
    const { onUpClick, onDownClick, barParams: bp } = this.props;
    const { handleMouseMove } = this;
    return (
      <div className="scroll-container">
        <div
          className="scroll-button icon-button mdi md-48 mdi-chevron-up"
          onClick={onUpClick}
        />
        <div className="scroll-indicator">
          <div
            ref={this.scrollHandleContainer}
            className="scroll-handle-container"
            onMouseMove={handleMouseMove}
          >
            <div
              className="scroll-handle"
              style={
                (bp && {
                  top: `${(100 * (bp.start - bp.min)) /
                    (bp.max + bp.size - bp.min)}%`,
                  bottom: `${100 -
                    (100 * (bp.start + bp.size - bp.min)) /
                      (bp.max + bp.size - bp.min)}%`
                }) ||
                {}
              }
              onMouseDown={evt =>
                this.setState({ mouseDown: true, mouseStart: evt.pageY })
              }
              onMouseUp={() => this.setState({ mouseDown: false })}
            />
          </div>
        </div>
        <div
          className="scroll-button icon-button mdi md-48 mdi-chevron-down"
          onClick={onDownClick}
        />
      </div>
    );
  }
}

export default ScrollBar;

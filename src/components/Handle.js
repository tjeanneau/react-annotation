import React from "react"
import { DraggableCore } from "react-draggable"
import PropTypes from "prop-types"

export default class Handle extends React.Component {
  render() {
    const {
      x = 0,
      y = 0,
      r = 10,
      handleStart,
      handleDrag,
      handleStop,
      offsetParent
    } = this.props

    return (
      <DraggableCore
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        position={null}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
        offsetParent={offsetParent}
        defaultClassNameDragging="dragging"
      >
        <circle
          className="handle"
          cx={x}
          cy={y}
          r={r}
          strokeDasharray="5"
          stroke="grey"
          fill="white"
          fillOpacity={0}
        />
      </DraggableCore>
    )
  }
}

Handle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  handleStart: PropTypes.func,
  handleStop: PropTypes.func,
  handleDrag: PropTypes.func
}

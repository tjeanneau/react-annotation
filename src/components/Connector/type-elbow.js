import { lineBuilder } from "../Builder"

// export default ({ type, subjectType }) => {
//TODO allow custom x1, y1
export default ({
  x,
  y,
  dx,
  dy,
  radius,
  outerRadius,
  innerRadius,
  width,
  height
}) => {
  // const annotation = type.annotation
  // const offset = annotation.position

  let x1 = 0, //annotation.x - offset.x,
    x2 = dx, //x1 + annotation.dx,
    y1 = 0, //annotation.y - offset.y,
    y2 = dy //y1 + annotation.dy

  // const subjectData = annotation.subject

  // if (subjectType === "rect") {
  if (width && height) {
    if ((width > 0 && dx > 0) || (width < 0 && dx < 0)) {
      if (Math.abs(width) > Math.abs(dx)) x1 = width / 2
      else x1 = width
    }
    if ((height > 0 && dy > 0) || (height < 0 && dy < 0)) {
      if (Math.abs(height) > Math.abs(dy)) y1 = height / 2
      else y1 = height
    }
    if (x1 === width / 2 && y1 === height / 2) {
      x1 = x2
      y1 = y2
    }
  }

  let data = [[x1, y1], [x2, y2]]

  let diffY = y2 - y1
  let diffX = x2 - x1
  let xe = x2
  let ye = y2
  let opposite = (y2 < y1 && x2 > x1) || (x2 < x1 && y2 > y1) ? -1 : 1

  if (Math.abs(diffX) < Math.abs(diffY)) {
    xe = x2
    ye = y1 + diffX * opposite
  } else {
    ye = y2
    xe = x1 + diffY * opposite
  }

  // if (
  //   subjectType === "circle" &&
  //   (subjectData.outerRadius || subjectData.radius)
  // ) {
  //   const r =
  //     (subjectData.outerRadius || subjectData.radius) +
  //     (subjectData.radiusPadding || 0)

  if (outerRadius || radius) {
    const r = outerRadius || radius
    const length = r / Math.sqrt(2)

    if (Math.abs(diffX) > length && Math.abs(diffY) > length) {
      x1 = length * (x2 < 0 ? -1 : 1)
      y1 = length * (y2 < 0 ? -1 : 1)
      data = [[x1, y1], [xe, ye], [x2, y2]]
    } else if (Math.abs(diffX) > Math.abs(diffY)) {
      const angle = Math.asin(-y2 / r)
      x1 = Math.abs(Math.cos(angle) * r) * (x2 < 0 ? -1 : 1)
      data = [[x1, y2], [x2, y2]]
    } else {
      const angle = Math.acos(x2 / r)
      y1 = Math.abs(Math.sin(angle) * r) * (y2 < 0 ? -1 : 1)
      data = [[x2, y1], [x2, y2]]
    }
  } else {
    data = [[x1, y1], [xe, ye], [x2, y2]]
  }

  return { components: [lineBuilder({ data, className: "connector" })] }
}

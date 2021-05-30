const eventProps = {
  onCopy: true,
  onCut: true,
  onPaste: true,
  onLoad: true,
  onError: true,
  onWheel: true,
  onScroll: true,
  onCompositionEnd: true,
  onCompositionStart: true,
  onCompositionUpdate: true,
  onKeyDown: true,
  onKeyPress: true,
  onKeyUp: true,
  onFocus: true,
  onBlur: true,
  onChange: true,
  onInput: true,
  onSubmit: true,
  onClick: true,
  onContextMenu: true,
  onDoubleClick: true,
  onDrag: true,
  onDragEnd: true,
  onDragEnter: true,
  onDragExit: true,
  onDragLeave: true,
  onDragOver: true,
  onDragStart: true,
  onDrop: true,
  onMouseDown: true,
  onMouseEnter: true,
  onMouseLeave: true,
  onMouseMove: true,
  onMouseOut: true,
  onMouseOver: true,
  onMouseUp: true,
  onSelect: true,
  onTouchCancel: true,
  onTouchEnd: true,
  onTouchMove: true,
  onTouchStart: true,
  onAnimationStart: true,
  onAnimationEnd: true,
  onAnimationIteration: true,
  onTransitionEnd: true
}

function isValidDOMProp(prop: string) {
  return eventProps[prop] || /^(data|aria)-/.test(prop)
}

export default function filterInvalidDOMProps(props: string[]) {
  const domProps = {}
  for (const prop in props) {
    if (props.hasOwnProperty(prop) && isValidDOMProp(prop)) {
      domProps[prop] = props[prop]
    }
  }
  return domProps
}

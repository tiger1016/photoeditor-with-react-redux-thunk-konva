import React, { useRef, } from 'react'
import { Text } from 'react-konva'

const UserText = ({text, fontSize, x, y, width, height, align, wrap, stage, layer}) => {
  const textRef = useRef();

  const dblClick = () => {
    var textPosition = textRef.current.getAbsolutePosition();

    // then lets find position of stage container on the page:
    var stageBox = stage.current.container().getBoundingClientRect();

    // so position of textarea will be the sum of positions above:
    var areaPosition = {
      x: stageBox.left + textPosition.x,
      y: stageBox.top + textPosition.y,
    };

    // create textarea and style it
    var textarea = document.createElement('textarea');
    document.body.appendChild(textarea);

    textarea.value = textRef.current.text();
    textarea.style.position = 'absolute';
    textarea.style.top = areaPosition.y + 'px';
    textarea.style.left = areaPosition.x + 'px';
    textarea.style.width = textRef.current.width();

    textarea.focus();

    textarea.addEventListener('keydown', function (e) {
      // hide on enter
      if (e.keyCode === 13) {
        textRef.current.text(textarea.value);
        layer.current.draw();
        document.body.removeChild(textarea);
      }
    });
  }

  return (
    <Text 
      text={text}
      fontSize={fontSize}
      x={x}
      y={y}
      width={width}
      height={height}
      align={align}
      wrap={wrap}
      ref={textRef}
      onDblClick={dblClick}
    />
  )
}


export default UserText
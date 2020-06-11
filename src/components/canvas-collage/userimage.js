import React, { useEffect, useState, useRef } from 'react'
import useImage from 'use-image'
import { Rect } from 'react-konva'


export const UserImageX = ({url, x, y, width, height}) => {
  const [image, status] = useImage(url);
  const imageRef = useRef();

  useEffect(() => {
    if (image) {
      const ratio = width / image.width;
      image.setAttribute('width', width);
      image.setAttribute('height', width / ratio);
      imageRef.current.fillPatternImage(image);
      imageRef.current.fillPatternRepeat('no-repeat');
      imageRef.current.fillPatternScale({x: ratio, y: ratio})
    }
  }, [image])

  return (
    <>
    {
      status === 'loaded'
      &&
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        draggable
        ref={imageRef}
      />
    }
    </>
  );
};



export const UserImageY = ({url, x, y, width, height}) => {
  const [image, status] = useImage(url);
  const imageRef = useRef();

  useEffect(() => {
    if (image) {
      const ratio = height / image.height;
      image.setAttribute('width', width);
      image.setAttribute('height', width / ratio);
      imageRef.current.fillPatternImage(image);
      imageRef.current.fillPatternRepeat('no-repeat');
      imageRef.current.fillPatternScale({x: ratio, y: ratio})
    }
  }, [image])

  return (
    <>
    {
      status === 'loaded'
      &&
      <Rect
        x={x}
        y={y}
        width={width}
        height={height}
        draggable
        ref={imageRef}
      />
    }
    </>
  );
};

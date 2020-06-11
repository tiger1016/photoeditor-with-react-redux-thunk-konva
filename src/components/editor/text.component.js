import React from "react";
import {Text, Transformer} from "react-konva";

const TextComponent = ({shapeProps, isSelected, onSelect, onChange}) => {

    const shapeRef = React.useRef();
    const trRef = React.useRef();

    React.useEffect(() => {
        if (isSelected) {
            trRef.current.setNode(shapeRef.current);
            trRef.current.getLayer().batchDraw();
        }
    }, [isSelected]);

    return (
        <React.Fragment>
            <Text
                onClick={onSelect}
                onTap={onSelect}
                ref={shapeRef}
                key={1}
                text="My fashion look"
                x={100}
                y={500}
                fontSize={60}
                shadowColor="#000"
                shadowBlur={8}
                fill="#fff"
                draggable={true}
                onDragEnd={e => {
                    // onChange({
                    //     ...shapeProps,
                    //     x: e.target.x(),
                    //     y: e.target.y()
                    // });
                }}
                onTransformEnd={e => {
                    const node = 1;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    node.scaleX(1);
                    node.scaleY(1);
                    onChange({
                        ...shapeProps,
                        x: node.x(),
                        y: node.y(),
                        width: Math.max(5, node.width() * scaleX),
                        height: Math.max(node.height() * scaleY)
                    });
                }}
            />
                <Transformer
                    ref={trRef}
                    boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                            return oldBox;
                        }
                        return newBox;
                    }}
                />
        </React.Fragment>
    );
}

export default TextComponent;

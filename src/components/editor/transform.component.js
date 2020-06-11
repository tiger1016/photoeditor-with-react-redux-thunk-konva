import React from "react";
import {Transformer} from "react-konva";

class TransformerComponent extends React.Component {
    componentDidMount() {
        this.checkNode();
    }

    componentDidUpdate() {
        this.checkNode();
    }

    onTransformStart() {
        console.log('onTransformStart');
    }

    onTransform() {
        console.log('onTransform');
    }

    onTransformEnd() {
        console.log('end transform');

    }

    checkNode() {
        const stage = this.transformer.getStage();
        const {selectedShapeName} = this.props;
        var selectedNode = stage.findOne("." + selectedShapeName);
        if (selectedNode === this.transformer.node()) {
            return;
        }
        if (selectedNode) {
            const type = selectedNode.getType();
            if (type !== "Group") {
                selectedNode = selectedNode.findAncestor("Group");
            }
            this.transformer.attachTo(selectedNode);
        } else {
            this.transformer.detach();
        }
        this.transformer.getLayer().batchDraw();
    }

    render() {
        return (
            <Transformer
                ref={node => {
                    this.transformer = node;
                }}
                enabledAnchors={[
                    'top-left',
                    'top-right',
                    'bottom-left',
                    'bottom-right',
                ]}
                centeredScaling={true}
                clearBeforeDraw={true}
                transformstart={this.onTransformStart}
                transform={this.onTransform}
                transformend={this.onTransformEnd}
            />
        );
    }
}

export default TransformerComponent;

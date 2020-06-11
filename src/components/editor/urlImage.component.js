import React from "react";
import {Image} from "react-konva";

class UrlImage extends React.Component {
    state = {
        image: null
    };

    componentDidMount() {
        this.loadImage();
    }

    componentDidUpdate(oldProps) {
        if (oldProps.src !== this.props.src) {
            this.loadImage();
        }
    }

    componentWillUnmount() {
        this.image.removeEventListener('load', this.handleLoad);
    }

    loadImage() {
        this.image = new window.Image();
        this.image.crossOrigin = 'Anonymous';
        this.image.src = this.props.src;
        this.image.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setState({
            image: this.image
        });
    };

    render() {
        return (
            <Image
                name="image"
                x={this.props.x}
                y={this.props.y}
                width={700}
                height={600}
                image={this.state.image}
                ref={node => {
                    console.log('ref image',node);
                    this.imageNode = node;
                }}
            />
        );
    }
}

export default UrlImage;

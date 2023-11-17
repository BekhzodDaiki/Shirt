import React, { Component, useEffect, useState } from "react";
import { render } from "react-dom";
import {
  Image,
  Stage,
  Layer,
  Group,
  Text,
  Rect,
  Transformer,
} from "react-konva";
import img from "./assets/blue.png";

class TransformerComponent extends React.Component {
  componentDidMount() {
    this.checkNode();
  }
  componentDidUpdate() {
    this.checkNode();
  }

  onTransformStart() {
    console.log("onTransformStart");
  }

  onTransform() {
    console.log("onTransform");
  }

  onTransformEnd() {
    console.log("end transform");
  }
  checkNode() {
    // here we need to manually attach or detach Transformer node
    // @ts-ignore
    const stage = this.transformer.getStage();
    // @ts-ignore
    const { selectedShapeName } = this.props;

    var selectedNode = stage.findOne("." + selectedShapeName);
    // do nothing if selected node is already attached
    // @ts-ignore
    if (selectedNode === this.transformer.node()) {
      return;
    }
    if (selectedNode) {
      const type = selectedNode.getType();
      if (type != "Group") {
        selectedNode = selectedNode.findAncestor("Group");
      }
      // attach to another node
      // @ts-ignore
      this.transformer.attachTo(selectedNode);
    } else {
      // remove transformer
      // @ts-ignore
      this.transformer.detach();
    }
    // @ts-ignore
    this.transformer.getLayer().batchDraw();
  }
  render() {
    return (
      <Transformer
        ref={(node) => {
          // @ts-ignore
          this.transformer = node;
        }}
        transformstart={this.onTransformStart}
        transform={this.onTransform}
        transformend={this.onTransformEnd}
      />
    );
  }
}

class URLImage extends React.Component {
  state = {
    image: null,
  };
  componentDidMount() {
    this.loadImage();
  }
  // @ts-ignore
  componentDidUpdate(oldProps) {
    // @ts-ignore
    if (oldProps.src !== this.props.src) {
      this.loadImage();
    }
  }
  componentWillUnmount() {
    // @ts-ignore
    this.image.removeEventListener("load", this.handleLoad);
  }
  loadImage() {
    // save to "this" to remove "load" handler on unmount
    // @ts-ignore
    this.image = new window.Image();
    // @ts-ignore
    this.image.src = this.props.src;
    // @ts-ignore
    this.image.addEventListener("load", this.handleLoad);
  }
  handleLoad = () => {
    // after setState react-konva will update canvas and redraw the layer
    // because "image" property is changed
    this.setState({
      // @ts-ignore
      image: this.image,
    });
    // if you keep same image object during source updates
    // you will have to update layer manually:
    // this.imageNode.getLayer().batchDraw();
  };
  render() {
    return (
      <Image
        x={this.props.x}
        y={this.props.y}
        // @ts-ignore
        image={this.state.image}
        ref={(node) => {
          // @ts-ignore
          this.imageNode = node;
        }}
        draggable
        
      />
    );
  }
}

class App extends Component {
  state = {
    selectedShapeName: "",
  };
  handleStageMouseDown = (e: any) => {
    // clicked on stage - cler selection
    if (e.target === e.target.getStage()) {
      this.setState({
        selectedShapeName: "",
      });
      return;
    }
    // clicked on transformer - do nothing
    const clickedOnTransformer =
      e.target.getParent().className === "Transformer";
    if (clickedOnTransformer) {
      return;
    }

    // find clicked rect by its name
    const name = e.target.name();
    // const rect = this.state.rectangles.find(r => r.name === name);
    if (name) {
      this.setState({
        selectedShapeName: name,
      });
    } else {
      this.setState({
        selectedShapeName: "",
      });
    }
  };
  render() {
    return (
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onMouseDown={this.handleStageMouseDown}
      >
        <Layer>
          <Group
            name="group"
            x={225}
            y={295}
            width={120}
            height={60}
            fill="red"
            draggable
          >
            {/* <Rect
              name="rect"
              fill="red"
              width={100}
              height={50}
              shadowColor="black"
              shadowBlur={5}
              shadowOpacity={0.3}
            /> */}
            {/* @ts-ignore */}
            {/* <URLImage src="https://konvajs.org/assets/yoda.jpg" x={150} /> */}
            <Text
              name="text"
              fontSize={16}
              fontFamily="Calibri"
              fill="#555"
              width={100}
              padding={2}
              align="center"
              text="some text sadsadsads"
            />
          </Group>
          <Group
            name="group"
            x={225}
            y={295}
            width={120}
            height={60}
            fill="red"
            draggable
          >
            <URLImage name="test" src="https://konvajs.org/assets/yoda.jpg" x={150} />
          </Group>
          <TransformerComponent
            // @ts-ignore
            selectedShapeName={this.state.selectedShapeName}
          />
        </Layer>
      </Stage>
    );
  }
}

export default App;

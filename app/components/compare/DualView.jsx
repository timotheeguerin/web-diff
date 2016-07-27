import React, {Component, PropTypes} from 'react';
import ReactDOM from "react-dom";
import PreviewBox from "./PreviewBox";

// Native
function getOffset(el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  };
}

export default class DualView extends Component {
  static defaultProps = {
    type: 'slide'
  };

  constructor(props) {
    super(props);
    this.state = {
      slider_position: '50%',
      scrollTop: 0
    };

    this.updateLeftIframeSize = this.updateLeftIframeSize.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseMoveInIframe = this.onMouseMoveInIframe.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.sliderStartDragging = this.sliderStartDragging.bind(this);
    this.sliderStopDragging = this.sliderStopDragging.bind(this);
    this.iframeScrolling = this.iframeScrolling.bind(this);
  }

  componentDidMount() {
    setTimeout(this.updateLeftIframeSize.bind(this), 1000);
  }

  componentDidUpdate() {
    // this.updateLeftIframeSize();
  }

  updateLeftIframeSize() {
    const container = ReactDOM.findDOMNode(this.refs.container);
    console.log("Container is ", container, container.offsetWidth);
    this.setState({containerWidth: `${container.offsetWidth}px`});
    // if (this.props.type === 'slide') {
    //   left_iframe.css({width: container.width()});
    //   right_iframe.css({width: container.width()});
    // } else {
    //   left_iframe.css({width: '100%'});
    //   right_iframe.css({width: '100%'});
    // }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.type !== 'slide') {
      this.setState({slider_position: '50%'});
    }
  }

  onMouseMove(e) {
    this.handleMouseMove(e.pageX);
  }

  onMouseMoveInIframe(positionX) {
    this.handleMouseMove(positionX);
  }

  handleMouseMove(positionX) {
    if (this.props.type == 'slide') {
      if (this.dragging_slider) {
        const container = ReactDOM.findDOMNode(this.refs.container);
        const left_offset = getOffset(container).left;
        console.log("Update or not?", positionX, left_offset);
        if (positionX >= left_offset && positionX <= left_offset + container.offsetWidth) {
          console.log("Update slider ", positionX - left_offset);
          this.setState({slider_position: positionX - left_offset})
        }
      }
    }
  }

  sliderStartDragging() {
    this.dragging_slider = true;
  }

  sliderStopDragging() {
    this.dragging_slider = false;
  }

  iframeScrolling(scrollTop) {
    this.setState({scrollTop: scrollTop})
  }

  render() {
    let slider;
    if (this.props.type == 'slide') {
      slider = (
        <div className='slider' ref='slider' style={{left: this.state.slider_position}}
             onMouseDown={this.sliderStartDragging}>
        </div>
      )
    }

    return (
      <div className={this.props.type + " dual-view"} onMouseMove={this.onMouseMove} onMouseUp={this.sliderStopDragging}
           onMouseLeave={this.sliderStopDragging} ref='container'>
        <div className='left-iframe revision-box' ref='left_iframe'
             style={{ 'width': this.state.slider_position}}>
          <PreviewBox repository={this.props.repository} page={this.props.page} url="http://localhost:3000/"
                      revision={this.props.left_revision} onMouseMove={this.onMouseMoveInIframe}
                      onScroll={this.iframeScrolling} scrollTop={this.state.scrollTop}
                      width={this.state.containerWidth}/>
        </div>
        {slider}
        <div className='right-iframe revision-box' ref='right_iframe'>
          <PreviewBox repository={this.props.repository} page={this.props.page} url="http://localhost:3000/about"
                      revision={this.props.right_revision} onMouseMove={this.onMouseMoveInIframe}
                      onScroll={this.iframeScrolling} scrollTop={this.state.scrollTop}
                      width={this.state.containerWidth}/>
        </div>
      </div>
    );
  }
}
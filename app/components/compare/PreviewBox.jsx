import React, {Component, PropTypes} from 'react';
import ReactDOM from "react-dom";

// Native
function getOffset(el) {
  const box = el.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset - document.documentElement.clientTop,
    left: box.left + window.pageXOffset - document.documentElement.clientLeft
  };
}

export default class PreviewBox extends Component {

  static defaultProps = {
    scrollTop: 0,
    width: '0px',
    onLoad: () => {
    },
    onMouseMove: () => {
    },
    onScroll: () => {
    },
    onRevisionSelected: () => {
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      dragover: false,
      dragging_revision: false
    };
  }

  iframeLoaded(iframe) {
    const {onMouseMove} = this.props;
    iframe.contentDocument.onmousemove = (e) => {
      const mousePosition = e.pageX + getOffset(iframe).left;
      console.log('Moving in iframe position is ', mousePosition, getOffset(iframe).left);
      onMouseMove(mousePosition)
    };
    const props = this.props;
    // $(iframe.contents()).scroll(function () {
    //   props.onScroll($(this).scrollTop())
    // });
  }

  componentWillReceiveProps(newProps) {
    this.updateIframeScroll(newProps.scrollTop)
  }

  componentWillUnmount() {
  }

  updateIframeScroll(scrollTop) {
    // if (!isNull(this.refs.iframe)) {
    // var iframe = $(this.refs.iframe.getDOMNode());
    // $(iframe.contents()).scrollTop(scrollTop);
    // }
  }

  onDragOver(e) {
    e.preventDefault();
  }

  onDragEnter() {
    this.setState({dragover: true});
  }

  onDragLeave() {
    this.setState({dragover: false});
  }

  onIframeLoad() {
    const iframe = ReactDOM.findDOMNode(this.refs.iframe);

    console.log("Iframe is loaded");
    this.iframeLoaded(iframe);
    this.props.onLoad(iframe);
  }

  onRevisionDrop(e) {
    e.preventDefault();
    var revision = JSON.parse(e.dataTransfer.getData("revision"));
    this.props.onRevisionSelected(revision);
    this.setState({dragover: false});
  }

  render() {
    console.log("Widht is ", this.props.width);
    const hide_iframe = !!this.props.revision || this.state.dragging_revision;
    return (
      <div className='iframe-container'>
        <iframe src={this.props.url} ref='iframe' className={hide_iframe ? 'hidden' : ''}
                style={{width: this.props.width}} onLoad={this.onIframeLoad.bind(this)}>
        </iframe>
      </div>
    );
  }
}
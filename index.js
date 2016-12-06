import React, {Component} from 'react';
import ReactDOM from 'react-dom';
function getElementViewTop(element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    let elementScrollTop
    while (current !== null) {
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    if (document.compatMode == "BackCompat") {
        elementScrollTop = document.body.scrollTop;
    } else {
        elementScrollTop = document.documentElement.scrollTop == 0
            ? document.body.scrollTop
            : document.documentElement.scrollTop;
    }
    return actualTop - elementScrollTop;
}
function getElementViewBottom(element) {
    const top = getElementViewTop(element);
    let height;
    if (document.compatMode == "BackCompat") {
        height = document.body.clientHeight;
    } else {
        height = document.documentElement.clientHeight == 0
            ? document.body.clientHeight
            : document.documentElement.clientHeight;
    }
    return height - top - element.offsetHeight;
}

class Affix extends Component {
    constructor(props) {
        super(props);
        this.state = {
            affix: false,
            affixStyle: null,
            placeHoldStyle: null
        };
    }
    handleScroll() {
        const affix = this.state.affix;
        const props = this.props;
        const element = ReactDOM.findDOMNode(this);

        if ((props.offsetTop === undefined) && (props.offsetBottom !== undefined)) {
            const elementViewBottom = getElementViewBottom(element);
            if (!affix && (elementViewBottom < props.offsetBottom)) {
                props.onFixed && props.onFixed();
                this.setState({
                    affix: true,
                    affixStyle: {
                        bottom: props.offsetBottom,
                        width: element.offsetWidth,
                        position: 'fixed'
                    },
                    placeHoldStyle: {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    }
                });
            }
            if (affix && (elementViewBottom > props.offsetBottom)) {
                props.outFixed && props.outFixed();
                this.setState({affix: false, affixStyle: null, placeHoldStyle: null});
            }
        } else {
            const elementViewTop = getElementViewTop(element);
            const offsetTop = props.offsetTop
                ? props.offsetTop
                : 0;
            if (!affix && (elementViewTop < offsetTop)) {
                props.onFixed && props.onFixed();
                this.setState({
                    affix: true,
                    affixStyle: {
                        top: offsetTop,
                        width: element.offsetWidth,
                        position: 'fixed'
                    },
                    placeHoldStyle: {
                        width: element.offsetWidth,
                        height: element.offsetHeight
                    }
                });
            }
            if (affix && (elementViewTop > offsetTop)) {
                props.outFixed && props.outFixed();
                this.setState({affix: false, affixStyle: null, placeHoldStyle: null});
            }
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }

    render() {
        return (
            <div style={this.state.placeHoldStyle}>
                <div className='zent-affix' style={this.state.affixStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }

};

module.exports = Affix;

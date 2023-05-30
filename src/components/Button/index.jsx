import { Component } from "react";
import './styles.css';

export class Button extends Component {
    // constructor(props) {
    //     super(props)
    //     this.props = 'alguma coisa'
    // }
    render() {
        const { text, onClick, disabled } = this.props;
        return (
            <button 
            disabled={disabled}
            className="button"
            onClick={onClick}>{text}
            </button>
        )
    }
}
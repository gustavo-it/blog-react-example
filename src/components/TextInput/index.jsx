import { Component } from "react";
import './styles.css';

export class TextInput extends Component {
    render() {
        const { searchValue, handleChange } = this.props;
        return (
            <div>
                <input onChange={handleChange}
                className="test-input"
                type="search" 
                name=""
                value={searchValue}
                />
                <br />
            </div>   
        )
    }
}
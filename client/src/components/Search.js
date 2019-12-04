import React from 'react';
import { connect } from 'react-redux';
import { performSearch } from '../actions';
class Search extends React.Component {
    constructor(props) {
        super(props);
        this.input = React.createRef();
    }
    onSubmit = (e) => {
        e.preventDefault();
        const term = this.input.current.value;
        this.props.performSearch(term);
    }
    render() {
        return (
            <div className="search">
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <label className="col-md-1 col-form-label">Search: </label>
                        <div className="col-md-2">
                            <input type="text" className="form-control" ref={this.input}/>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return state;
}
const mapDispatchToProps = (dispatch) => {
    return {
        performSearch: (term) => dispatch(performSearch(term))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Search);
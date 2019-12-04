import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { getPrevPageData, getNextPageData } from '../actions';
class Pagination extends React.Component {
    onClick = (move) => {
        if(move === 'prevPage') {
            this.props.prevPage(this.props.page);
        } else if(move === 'nextPage') {
            this.props.nextPage(this.props.page);
        }
    }
    render() {
        const prevPageClass = classNames('page-item', 
            { 'disabled': this.props.page === 1 }
        );
        const nextPageClass = classNames('page-item', 
            { 'disabled': this.props.data.length < 7}
        );
        return (
            <div>
                <nav aria-label="Page navigation">
                    <ul className="pagination">
                        <li className={prevPageClass} onClick={()=>this.onClick("prevPage")}><a className="page-link" role="button" tabIndex="0"><span aria-hidden="true">&larr;</span> Prev Page</a></li>
                        <li className={nextPageClass} onClick={()=>this.onClick("nextPage")}><a className="page-link" role="button" tabIndex="1">Next Page <span aria-hidden="true">&rarr;</span></a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { 
        data: state.data,
        page: state.display.page
     };
}
const mapDispatchToProps = (dispatch) => {
    return {
        prevPage: (page) => dispatch(getPrevPageData(page)),
        nextPage: (page) => dispatch(getNextPageData(page))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
import React from 'react';
import { connect } from 'react-redux';
import { getData, deleteUser, sortByField } from '../actions';
class Users extends React.Component {
    componentDidMount() {
        this.props.getData();
    }
    handleDelete = (id) => {
        this.props.deleteUser(id);
    }
    handleSortByOrder = (sortBy) => {
        //sort order
        let order = this.props.display.order;
        order = order === 1? -1: 1;
        this.props.sortByField(sortBy, order);
    }
    render() {
        const { history } = this.props;
        if(this.props.error) {
            return <div className="alert alert-secondary" role="alert">{this.props.error}</div>;
        } else if(!this.props.error && this.props.isFetching) {
            return (
                <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            );
        } else if(!this.props.error && this.props.data){
            const userList = () => {
                return this.props.data.map((item, index)=>{
                    return (
                        <tr key={index}>
                            <td>
                                <button type="button" className="btn btn-default" onClick={()=>{ history.push(`/edit/${item._id}`)} }>
                                    <span className="glyphicon glyphicon-pencil"></span> Edit 
                                </button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-default" onClick={()=>this.handleDelete(item._id)}>
                                    <span className="glyphicon glyphicon-remove"></span> Delete
                                </button>
                            </td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.sex}</td>
                            <td>{item.age}</td>
                        </tr>
                    );
                }); 
            };
            return (
                <div>
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Edit</th>
                                <th scope="col">Delete</th>
                                <th scope="col" className="header_firstname" onClick={()=>this.handleSortByOrder("firstName")}>FirstName</th>
                                <th scope="col" className="header_lastname" onClick={()=>this.handleSortByOrder("lastName")}>LastName</th>
                                <th scope="col" className="header_sex" onClick={()=>this.handleSortByOrder("sex")}>Sex</th>
                                <th scope="col" className="header_age" onClick={()=>this.handleSortByOrder("age")}>Age</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList()}
                        </tbody>
                    </table>
                </div>
            );
        }
    }
}
const mapStateToProps = (state) => {
    return state;
};
const mapDispatchToProps = (dispatch) => {
    return {
        getData: () => dispatch(getData()),
        deleteUser: (id) => dispatch(deleteUser(id)),
        sortByField : (sortBy, order) => dispatch(sortByField(sortBy, order))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Users);
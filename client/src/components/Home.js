import React from 'react';
import { withRouter } from 'react-router-dom';
import Users from './Users';
import Search from './Search';
import Pagination from './Pagination';
const UsersWithRouter = withRouter(Users);
class Home extends React.Component {
    render() {
        const { history } = this.props;
        return (
            <div className="home">
                <h2>Users</h2>
                <Search/>
                <UsersWithRouter/>
                <Pagination/>
                <button type="button" className="btn btn-outline-secondary btn-lg" onClick={()=>{ history.push("/create") }}>
                    <span className="glyphicon glyphicon-user"></span> Add User
                </button>
            </div>
        );
    }
}
export default Home;
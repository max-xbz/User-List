import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { updateUser } from '../actions';

class EditUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: { value: '', isValid: true, message: ''}, 
            lastName: { value: '', isValid: true, message: ''}, 
            sex: { value: '', isValid: true, message: ''}, 
            age: { value: 0, isValid: true, message: ''}, 
            password: { value: '', isValid: true, message: ''}, 
            confirmPassword: { value: '', isValid: true, message: ''}
        };
    }
    componentDidMount() {
        const user = this.props.data.filter((item)=>item._id === this.props.match.params.id);
        //set the previous value to the state elements
        this.setState({
            ...this.state, 
            firstName: {...this.state.firstName, value: user[0].firstName},
            lastName: {...this.state.lastName, value: user[0].lastName},
            sex: {...this.state.sex, value: user[0].sex},
            age: {...this.state.age, value: user[0].age}
        });
    }
    onSubmit = (e) => {
        e.preventDefault();
        if(this.formIsValid()) {
            console.log("valid update");
            const { firstName, lastName, sex, age, password } = this.state;
            const user = {
                _id: this.props.match.params.id, 
                firstName: firstName.value, 
                lastName: lastName.value, 
                sex: sex.value, 
                age: age.value, 
                password: password.value
            };
            // console.log(this.props.history);
            this.props.updateUser(user, this.props.history);
        }
    }
    onChange = (e) => {
        this.setState({
            ...this.state, 
            [e.target.name]: {
                ...this.state[e.target.name], 
                value: e.target.value
            }
        });
    }
    formIsValid = () => {
        const { firstName, lastName, sex, age, password, confirmPassword } = this.state;
        let isGood = true;
        if(firstName.value === '') {
            firstName.isValid = false;
            firstName.message = 'Require first name';
            isGood = false;
        } else {
            firstName.isValid = true;
            firstName.message = '';
        }
        if(lastName.value === '') {
            lastName.isValid = false;
            lastName.message = 'Require last name';
            isGood = false;
        } else {
            lastName.isValid = true;
            lastName.message = '';
        }
        if(sex.value !== '' && sex.value !== 'M' && sex.value !== 'F') {
            sex.isValid = false;
            sex.message = 'Sex has to be M(male) or F(female)';
            isGood = false;
        } else {
            sex.isValid = true;
            sex.message = '';
        }
        if(age.value !== 0 && isNaN(parseInt(age.value))) {
            age.isValid = false;
            age.message = 'Age has to be a number';
            isGood = false;
        } else {
            age.isValid = true;
            age.message = '';
        }
        if(password.value.length === 0) {
            password.isValid = false;
            password.message = 'Require a password';
            isGood = false;
        } else {
            password.isValid = true;
            password.message = '';
        }
        if(confirmPassword.value !== password.value) {
            confirmPassword.isValid = false;
            confirmPassword.message = 'Has to be as same as password';
            isGood = false;
        } else {
            confirmPassword.isValid = true;
            confirmPassword.message = '';
        }
        if(!isGood) {
            this.setState({
                ...this.state,
                firstName,
                lastName,
                sex,
                age,
                password,
                confirmPassword,
            });
        }
        return isGood;
    }
    render() {
        const { history } = this.props;
        const { firstName, lastName, sex, age, password, confirmPassword } = this.state;
        const firstNameGroupClass = classNames('form-control', 
            { 'is-invalid': !firstName.isValid }
        );
        const lastNameGroupClass = classNames('form-control', 
            { 'is-invalid': !lastName.isValid }
        );
        const sexGroupClass = classNames('form-control', 
            { 'is-invalid': !sex.isValid }
        );
        const ageGroupClass = classNames('form-control', 
            { 'is-invalid': !age.isValid }
        );
        const passwordGroupClass = classNames('form-control', 
            { 'is-invalid': !password.isValid }
        );
        const confirmPasswordGroupClass = classNames('form-control', 
            { 'is-invalid': !confirmPassword.isValid }
        );
        return (
            <div className="container">
                <form className="needs-validation" noValidate onSubmit={this.onSubmit}>
                    <div className="form-group col-md-6">
                        <label className="control-label">First Name</label>
                        <input type="text" className={firstNameGroupClass} placeholder="First Name" name="firstName" value={firstName.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {firstName.message}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Last Name</label>
                        <input type="text" className={lastNameGroupClass} placeholder="Last Name" name="lastName" value={lastName.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {lastName.message}
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Sex</label>
                        <input type="text" className={sexGroupClass} name="sex" value={sex.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {sex.message}
                        </div>
                    </div>
                    <div className="form-group col-md-2">
                        <label>Age</label>
                        <input type="text" className={ageGroupClass} name="age" value={age.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {age.message}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Password</label>
                        <input type="password" className={passwordGroupClass} name="password" value={password.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {password.message}
                        </div>
                    </div>
                    <div className="form-group col-md-6">
                        <label>Confirm Password</label>
                        <input type="password" className={confirmPasswordGroupClass} name="confirmPassword" value={confirmPassword.value} onChange={this.onChange}/>
                        <div className="invalid-feedback">
                            {confirmPassword.message}
                        </div>
                    </div>
                    <div className="form-row col-md-6">
                        <div className="col">
                            <button type="submit" className="btn btn-primary">Save</button>
                        </div>
                        <div className="col">
                        <button type="button" className="btn btn-primary" onClick={() => { history.push("/")}}>Cancel</button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return { data: state.data};
}
const mapDispatchToProps = (dispatch) => {
    return { updateUser: (user, history) => dispatch(updateUser(user, history))};
}
export default connect(mapStateToProps, mapDispatchToProps)(EditUser);
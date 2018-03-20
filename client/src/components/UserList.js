import React, { Component } from 'react';

export default class UserList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
    }

    render() {
        const { users } = this.props;
        return (
            <table class="table">
                <thead>
                    <tr>
                        <th>이름</th>
                        <th>성별</th>
                        <th>나이</th>
                        <th>연령대</th>
                        <th>휴대전화번호</th>
                        <th>생년월일</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user =>
                        <tr>
                            <td>{user.name}</td>
                            <td>{user.gender}</td>
                            <td>{user.age}</td>
                            <td>{user.ages}</td>
                            <td>{user.phone}</td>
                            <td>{user.birthdate}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }
}

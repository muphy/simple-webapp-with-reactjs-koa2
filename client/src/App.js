import React, { Component } from 'react';
import Pagination from 'react-js-pagination';
import UserList from './components/UserList';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      itemsCountPerPage: 10,
      totalItemsCount: 100,
      limit: 10,
      users: []
    };
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.callApi(1,10)
      .then(res => this.setState({ totalItemsCount: res.total, users: res.data }))
      .catch(err => console.log(err));
  }

  callApi = async (currentPage,limit) => {
    const response = await fetch(`/api/public/users?current_page=${currentPage}&limit=${limit}`);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
    this.callApi(pageNumber,this.state.limit)
      .then(res => this.setState({ totalItemsCount: res.total, users: res.data }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div class="container">
        <h2>사용자 정보</h2>
        <p>성별 정보가 없는 경우는 표시되지 않는다.</p>
        <UserList users={this.state.users} />
        <div class="text-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={this.state.itemsCountPerPage}
            totalItemsCount={this.state.totalItemsCount}
            pageRangeDisplayed={10}
            onChange={this.handlePageChange}
          />
        </div>
      </div>

    );
  }
}

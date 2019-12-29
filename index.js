import React, { Component } from "react";
import { render } from "react-dom";
import "./style.css";
import moment from "moment";
import RepoFetch from "./RepoFetch";

class App extends Component {
  render() {
    const user = "ZPanic0";
    const token = "ed1ca9031b9853615d862b70d650c8a09ed3b561";
    return (
      <div>
        <UserRepos userName={user} token={token} />
      </div>
    );
  }
}

class UserRepos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      repos: []
    };
  }

  async componentDidMount() {
    this.setState({ isLoading: true });

    const repoFetch = new RepoFetch(
      this.props.userName,
      this.props.token,
      "zpanic0.github.io"
    );

    this.setState({
      isLoading: false,
      repos: await repoFetch.getRepoData()
    });
  }

  render() {
    return (
      <div>
        {!this.state.repos.length && "Loading..."}
        {!this.state.repos.length ||
          this.state.repos.map(repo => (
            <Repo
              key={repo.name}
              name={repo.name}
              language={repo.language}
              lastUpdated={repo.updated_at}
              description={repo.description}
            />
          ))}
      </div>
    );
  }
}

class Repo extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        {this.props.language && <p>Language: {this.props.language}</p>}
        <p>
          Last Updated:{" "}
          {moment(this.props.lastUpdated).format("MMM Do YYYY h:mm A")}
        </p>
        <p>{this.props.description}</p>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));

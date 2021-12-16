import React from 'react';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {

  componentDidMount() {
    this.props.fetchUser(this.props.currentUser.id);
  }

  render() {
    if (!this.props.currentUser) return null;
    return (
      <div id="navbar-container">
        <div className="navbar-content">

        <div className="navbar-logo-box"> 
          <Link to="/">
            <img src={window.logoURL} className="navbar-logo" alt="login logo" />
          </Link>
        </div>

        <div className="navbar-search-box">
          <p></p>
        </div>

        <div className="navbar-list">
          <div className="navbar-item">
            <Link className="navbar-link transparent active" to="/feed">
              <img className="navbar-icon transparent active" src={window.feedURL} alt="feed url" />
              <h5>Home</h5>
            </Link>
          </div>

          <div className="navbar-item">
            <Link className="navbar-link transparent" to="/network">
              <img className="navbar-icon" src={window.networkURL} alt="feed url" />
              <h5>Network</h5>
            </Link>
          </div>

          <div className="navbar-item">
            <a className="navbar-link transparent" href="https://github.com/imvincenth">
              <img className="navbar-icon" src={window.githubURL} alt="feed url" />
              <h5>GitHub</h5>
            </a>
          </div>

          <div className="navbar-item">
            <a className="navbar-link transparent" href="https://www.linkedin.com/in/vincent-hsu-45a6a1220/">
              <img className="navbar-icon" src={window.linkedinURL} alt="feed url" />
              <h5>LinkedIn</h5>
            </a>
          </div>

          <div className="navbar-item">
            <Link className="navbar-link" to={`/users/${this.props.currentUser.id}`}>
              {this.props.currentUser.profilePhotoUrl ? <img className="navbar-icon-profile" src={this.props.currentUser.profilePhotoUrl} alt="feed url" /> : <img className="navbar-icon-profile" src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="default profile picture" />}
              <h5 className="navbar-me">Me<img className="navbar-arrow" src={window.downarrowURL} alt="down arrow" /></h5>
            </Link>
          </div>
        </div>

        </div>
      </div>
    )
  };
};

export default Navbar;
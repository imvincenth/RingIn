import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      connections: this.props.connections
    }

  }

  componentDidMount() {
    this.props.fetchConnections(this.props.currentUser.id);
  }

  render() {
    if (!this.props.currentUser) return null;

    return (
      <div className='sidebar'>
        <div className='sidebar-container'> 
          <div className='sidebar-header'>
            {/* Banner */}
            <div className='sidebar-banner'>
              {this.props.currentUser.bannerUrl ? 
              <img className='sidebar-banner-img' src={this.props.currentUser.bannerUrl} alt='sidebar banner' /> : 
              <img className='sidebar-banner-img' src='https://static-exp1.licdn.com/sc/h/55k1z8997gh8dwtihm11aajyq' alt='sidebar banner' />
              }
            </div>

            {/* Avatar */}
            <div className='sidebar-avatar'>
              {this.props.currentUser.profilePictureUrl ? <img src={this.props.currentUser.profilePictureUrl} alt='user profile picture' /> : <img src='https://static-exp1.licdn.com/sc/h/3h0vrtch1zepjr4p54aja8i9x' alt='default profile picture' />}
            </div>


            <h2 className='sidebar-name'><Link className='sidebar-name-link' to={`/users/${this.props.currentUser.id}`}>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</Link></h2>
            <h4 className='sidebar-email'>{this.props.currentUser.headline}</h4>
          </div>

          <div className='sidebar-info-wrap'>
            <div className='sidebar-info-item'>
              <p className='sidebar-connection'>Connections</p>
              <p className='sidebar-number'>{this.state.connections.length}</p>
            </div>
            <div className='sidebar-info-item'>
              <p className='sidebar-growyournetwork'>Grow your network</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Sidebar;
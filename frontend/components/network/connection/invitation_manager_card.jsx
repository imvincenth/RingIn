import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class InvitationManagerCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.type === "received" ? this.props.users[this.props.connection.connector_id] : this.props.users[this.props.connection.connectee_id],

      invitorConnections: [],
      mutuals: [],
      firstMutual: null
    }

    this.handleAccept = this.handleAccept.bind(this);
  }

  componentDidMount() {
    this.props.fetchConnections(this.state.user.id)
      .then(() => this.findMutuals());
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
  }

  handleAccept() {
    this.props.updateConnection({ ...this.props.connection, pending: false });
  }

  findMutuals() {
    let tempInvitorConnections = [];
    let tempMutualIDs = [];

    this.props.connections.forEach(connection => (connection.connector_id === this.state.user.id || connection.connectee_id === this.state.user.id) && !connection.pending ? tempInvitorConnections.push(connection) : null);
    // IDs of all of the invitor's accepted connections
    let tempInvitorConnectionIDs = tempInvitorConnections.map(connection => connection.connector_id === this.state.user.id ? connection.connectee_id : connection.connector_id);
    // IDs of all of the current user's accepted connections
    let tempCurrentUserConnectionIDs = this.props.currentUserConnections.map(connection => connection.connector_id === this.props.currentUser.id ? connection.connectee_id : connection.connector_id);
    // Filtering user IDs of the mutal connections
    tempCurrentUserConnectionIDs.forEach(id => tempInvitorConnectionIDs.includes(id) && !tempMutualIDs.includes(id) ? tempMutualIDs.push(id) : null);
    // Getting the user objects from the mutuals IDs
    let tempMutuals = tempMutualIDs.map(id => this.props.users[id]);
    // Getting name of the first mutual connection
    let tempFirstMutual;
    if (tempMutuals[0]) tempFirstMutual = `${tempMutuals[0].first_name} ${tempMutuals[0].last_name}`;
    if (!tempMutuals[0]) tempFirstMutual = null;

    this.setState({ invitorConnections: tempInvitorConnections, mutuals: tempMutuals, firstMutual: tempFirstMutual });
  }

  convertDate(connection) {
    let rawDate;
    if (connection) rawDate = Date.now() - new Date(connection.created_at);

    switch(true) {
      case (rawDate < 3600000): // less than an hour
        if (`${Math.round((rawDate/(1000 * 60)))} minutes ago` === "0 minutes ago") return "just now";
        return `${Math.round((rawDate/(1000 * 60)))} minutes ago`;
      case (rawDate >= 3600000 && rawDate < 86400000): // less than a day
        if (`${Math.floor(rawDate / (1000 * 60 * 60))} hours ago` === "1 hours ago") return "1 hour ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60))} hours ago`; 
      case (rawDate >= 86400000 && rawDate < 604800000): // less than a week
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24))} days ago` === "1 days ago") return "1 day ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24))} days ago`;
      case (rawDate >= 604800000 && rawDate < 2419200000): // less than a month
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7))} weeks ago` === "1 weeks ago") return "1 week ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7))} weeks ago`;
      case (rawDate >= 2419200000): // months
        if (`${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7 * 4))} months ago` === "1 months ago") return "1 month ago";
        return `${Math.floor(rawDate / (1000 * 60 * 60 * 24 * 7 * 4))} months ago`;
    }
  }

  render() {
    return (
      <li className='network-invitation-card' style={this.props.place === 1 ? {"borderTop": "1px solid rgba(0, 0, 0, 0.08)"} : null}>
        <div className='network-invitation-card-left'>
          <Link to={`/users/${this.state.user.id}`}>
            {this.state.user.profilePictureUrl ? <img className='network-invitation-card-propic' src={this.state.user.profilePictureUrl} /> : <img className='network-invitation-card-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
          </Link>

          <div className='network-invitation-card-social-wrap'>
            <Link className='network-invitation-card-social' to={`/users/${this.state.user.id}`}>
              <span className='network-invitation-card-name'>{this.state.user.first_name} {this.state.user.last_name}</span>
              <span className='network-invitation-card-headline'>{this.state.user.headline}</span>
            </Link>
            {this.state.mutuals.length === 0 ? <span className='network-invitation-card-no-mutual' style={this.props.type === "sent" ? {"display": "none"} : null}><img src={window.invitePlaceURL} />{this.state.user.city_district}, {this.state.user.country_region}</span> : <span className='network-invitation-card-mutual'><img src={window.inviteMutualURL} />{this.state.firstMutual} {this.state.mutuals.length > 1 ? `and ${this.state.mutuals.length - 1} other${this.state.mutuals.length > 2 ? "s" : ""}` : null}</span>}
            <span className='network-invitation-card-no-mutual'  style={this.props.type === "received" ? {"display": "none"} : null}>{this.convertDate(this.props.connection)}</span>

          </div>
        </div>

        <div className='network-invitation-card-right'>
          <button className='network-invitation-card-ignore' onClick={() => this.props.deleteConnection(this.props.connection.id)} style={this.props.type === "sent" ? {"display": "none"} : null}>Ignore</button>
          <button className='network-invitation-card-accept' onClick={this.handleAccept} style={this.props.type === "sent" ? {"display": "none"} : null}>Accept</button>
          <button className='network-invitation-card-ignore' onClick={() => this.props.deleteConnection(this.props.connection.id)} style={this.props.type === "received" ? {"display": "none"} : null}>Withdraw</button>
        </div>
      </li>
    )
  }
}

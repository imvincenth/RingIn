import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import SearchResultCardContainer from './search_result_card_container';

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      matches: [],

      searchInput: "",
      searchActive: false, 
      results: {},

      profileActive: false,

      currentUserConnections: []
    }

    this.toggleSearchOn = this.toggleSearchOn.bind(this);
    this.toggleModalOff = this.toggleModalOff.bind(this);
    this.toggleProfileMenu = this.toggleProfileMenu.bind(this);
  }

  update(field) {
    // Search result filtering
    let clone = Object.assign({}, this.props.users);
    for (const userId in clone) {
      // Removing the current user from results
      if (Number(userId) === this.props.currentUser.id) delete clone[userId];
    }
    for (const userId in clone) {
      // Removing users whose name does not include the search input
      let usersName = `${clone[userId].first_name} ${clone[userId].last_name}`.toLowerCase();
      if (!usersName.toLowerCase().includes(this.state.searchInput)) delete clone[userId];
    }

    return e => this.setState({ [field]: e.currentTarget.value, searchActive: true, results: clone });
  }

  handleSearchEdit() {
    this.setState({ action: true });
  }

  componentDidMount() {
    this.props.fetchUsers()
      .then(() => this.props.fetchConnections(this.props.currentUser.id))
      .then(() => this.findMatches());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.location.search !== prevProps.location.search || JSON.stringify(prevProps.connections) !== JSON.stringify(this.props.connections)) {
      this.findMatches();
    }
  }

  componentWillUnmount() {
    this.setState = (state,callback)=>{
        return;
    };
  }

  toggleSearchOn() {
    this.setState({ searchActive: true, profileActive: false });
  }

  toggleModalOff() {
    this.setState({ searchActive: false, profileActive: false });
  }

  toggleProfileMenu() {
    this.setState({ searchActive: false, profileActive: !this.state.profileActive });
  }

  noInput() {
    return (
      <div className='noinput-search-suggestion-box'>

        <div className='noinput-search-head'>
          Try searching for
        </div>

        <ul className='noinput-search-list'>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.replace("/search/results/?keywords=frodo baggins")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>frodo baggins</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.replace("/search/results/?keywords=samwise gamgee")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>samwise gamgee</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.replace("/search/results/?keywords=aragorn ii elessar")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>aragorn ii elessar</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.replace("/search/results/?keywords=legolas greenleaf")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>legolas greenleaf</p>
          </li>
          <li className='noinput-search-suggestion' onClick={() => this.props.history.replace("/search/results/?keywords=gimli son of gloin")}>
            <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            <p className='noinput-list-text'>gimli son of gloin</p>
          </li>
        </ul>

      </div>
    )
  }

  yesInput() {
    if (Object.values(this.state.results).length === 0) {
      return (
        <div className='no-results-box' onClick={() => this.props.history.replace(`/search/results/?keyword=${this.state.searchInput}`)}>
          <div className='no-results-content'>
            <span className='no-results-text'>See all results</span>
          </div>
        </div>
      )
    }

    return (
      <div className='search-suggestion-box'>
        {Object.values(this.state.results).map((user, i) => 
          <div key={`${i}` + user.first_name} className='search-suggestion' onClick={() => this.props.history.replace(`/users/${user.id}`)}>
            <div className={i === 0 ? 'search-suggestion-content-one' : 'search-suggestion-content'}>
              {user.profilePictureUrl ? <img className='suggestion-propic' src={user.profilePictureUrl} /> : <img className='suggestion-propic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" />}
              <span className='suggestion-text-box'>
                {this.matchUsername(`${user.first_name} ${user.last_name}`)}
                <span className='suggestion-headline'> • {user.headline}</span>
              </span>
              <img className='input-icon' src={window.searchIconURL} alt="magnifying glass" />
            </div>
          </div>
        )}
        <div className='all-results-box' onClick={() => this.props.history.replace(`/search/results/?keywords=${this.state.searchInput}`)}>
          <div className='all-results-content'>
            <span className='all-results-text'>See all results</span>
          </div>
        </div>
      </div>
    )
  }

  matchUsername(name) {
    let firstHalf = "";
    let secondHalf = "";

    for (let i = 0; i < name.length; i++) {
      if (this.state.searchInput[i] && name[i].toLowerCase() === this.state.searchInput[i].toLowerCase()) {
        firstHalf += name[i].toLowerCase();
      } else {
        secondHalf += name[i].toLowerCase();
      }
    }

    return (
      <span className='suggestion-name'>
        {firstHalf}<strong>{secondHalf}</strong>
      </span>
    )
  }

  searchResults() {
    return (
      <div className='search-modal-child' onClick={e => e.stopPropagation()}>
        {this.state.searchInput.length === 0 ? this.noInput() : this.yesInput()}
      </div>
    )
  }

  profileMenu() {
    return (
      <div className='profile-menu' onClick={e => e.stopPropagation()}>
        <header className='profile-menu-header'>
          <Link to={`/users/${this.props.currentUser.id}`}>
            <div className='profile-namecard'>
              <div className='profile-menu-pic-box'>
                {this.props.currentUser.profilePictureUrl ? 
                <img className='profile-menu-pic' src={this.props.currentUser.profilePictureUrl} /> : 
                <img className='profile-menu-pic' src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="profile picture" />
                }
              </div>
              <div className='profile-menu-info'>
                <div className='profile-menu-name'>{this.props.currentUser.first_name} {this.props.currentUser.last_name}</div>
                <div className='profile-menu-headline'>{this.props.currentUser.headline}</div>
              </div>
            </div>
          </Link>
          <Link className='profile-view-profile' to={`/users/${this.props.currentUser.id}`}>View Profile</Link>
        </header>
        <h3 className='profile-menu-signout-header'>Leaving RingIn?</h3>
        <div className='profile-menu-signout' onClick={this.props.logout}>
          Sign Out
        </div>
      </div>
    )
  }

  findMatches() {
    let searchTerm = window.location.href.slice(window.location.href.indexOf("=") + 1).split("%20").join(" ").trim();

    let tempMatches = [];
    let tempCurrentUserConnections = [];

    this.props.connections.forEach(connection => this.props.currentUser.id === connection.connector_id || this.props.currentUser.id === connection.connectee_id ? tempCurrentUserConnections.push(connection) : null);
    this.props.users.forEach(user => `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(searchTerm) ? tempMatches.push(user) : null);
    this.setState({ matches: searchTerm === "" ? [] : [...tempMatches], searchInput: searchTerm, searchActive: false, currentUserConnections: [...tempCurrentUserConnections] });
  }

  renderNoSearchResults() {
    return (
      <div className='no-search-results'>
        <img src={window.noresultsURL} />
        <h2>No results found here</h2>
        <span>Try shortening or rephrasing your search.</span>
        <button onClick={() => this.setState({ searchActive: true })}>Edit search</button>
      </div>
    )
  }

  render() {
    if (!this.props.users) return null;

    return (
      <div className='result-page'>

        {/* Navbar */}
        <div id="navbar-container" onClick={this.state.searchActive || this.state.profileActive ? this.toggleModalOff : null}>
          {this.state.searchActive ? <div className='search-modal-background' onClick={this.toggleModalOff}></div> : null}
          {this.state.profileActive ? <div className='profile-menu-navbar-background' onClick={this.toggleModalOff}></div> : null}
          <div className="navbar-content">

            <div className="navbar-left">
              <div className="navbar-logo-box"> 
                <Link to="/">
                  <img src={window.logoURL} className="navbar-logo" alt="login logo" />
                </Link>
              </div>

              <div className="navbar-search-box">
                <div className={this.state.searchActive ? "search-icon-box search-active" : "search-icon-box"}>
                  <img className="search-icon" src={window.searchIconURL} alt="search icon" />
                </div>
                <form onSubmit={() => this.props.history.replace(`/search/results/?keyword=${this.state.searchInput}`)}>
                  <input 
                    className={this.state.searchActive ? "search-bar search-active" : "search-bar"} 
                    type="text" 
                    value={this.state.searchInput} 
                    onChange={this.update("searchInput")} 
                    onClick={this.state.searchActive ? e => e.stopPropagation() : this.toggleSearchOn} 
                    placeholder="Search" 
                  />
                {this.state.searchActive ? this.searchResults() : null}
                </form>
              </div>
            </div>


            <div className="navbar-list">
              <div className="navbar-item">
                <Link className={this.props.page === "feed" ? "navbar-link active" : "navbar-link transparent"} to="/feed">
                  <img className={this.props.page === "feed" ? "navbar-icon active" : "navbar-icon"} src={window.feedURL} alt="feed url" />
                  <h5>Home</h5>
                  <div className={this.props.page === "feed" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
                </Link>
              </div>

              <div className="navbar-item">
                <Link className={this.props.page === "network" ? "navbar-link active" : "navbar-link transparent"} to="/network">
                  <img className={this.props.page === "network" ? "navbar-icon active" : "navbar-icon"} src={window.networkURL} alt="feed url" />
                  <h5>Network</h5>
                  <div className={this.props.page === "network" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
                </Link>
              </div>

              <div className="navbar-item">
                <a className="navbar-link transparent" href="https://github.com/imvincenth" target="_blank" rel="noopener noreferrer">
                  <img className="navbar-icon" src={window.githubURL} alt="feed url" />
                  <h5>GitHub</h5>
                  <div className="navbar-item-bar"></div>
                </a>
              </div>

              <div className="navbar-item">
                <a className="navbar-link transparent" href="https://www.linkedin.com/in/vincent-hsu-1025a9a3/" target="_blank" rel="noopener noreferrer">
                  <img className="navbar-icon" src={window.linkedinURL} alt="feed url" />
                  <h5>LinkedIn</h5>
                  <div className="navbar-item-bar"></div>
                </a>
              </div>

              <div className="navbar-item">
                <a className="navbar-link transparent" href="https://angel.co/u/vincent-hsu-7" target="_blank" rel="noopener noreferrer">
                  <img className="navbar-icon" src={window.angellistURL} alt="feed url" />
                  <h5>AngelList</h5>
                  <div className="navbar-item-bar"></div>
                </a>
              </div>

              <div className="navbar-item">
                <div className='navbar-profile-item'>
                  <div className={this.props.page === "profile" ? "navbar-link active" : "navbar-link"} onClick={this.toggleProfileMenu}>
                    {this.props.currentUser.profilePictureUrl ? <img className="navbar-icon-profile" src={this.props.currentUser.profilePictureUrl} alt="feed url" /> : <img className="navbar-icon-profile" src="https://static-exp1.licdn.com/sc/h/1c5u578iilxfi4m4dvc4q810q" alt="default profile picture" />}
                    <h5 className={this.props.page === "profile" ? "navbar-me active" : "navbar-link transparent"}>Me<img className="navbar-arrow" src={window.downarrowURL} alt="down arrow" /></h5>
                    <div className={this.props.page === "profile" ? "navbar-item-bar active" : "navbar-item-bar"}></div>
                  </div>
                </div>
                {this.state.profileActive ? this.profileMenu() : null}
              </div>
            </div>

          </div>
        </div>

        <div className='search-results-wrap'>
          <div className='search-results-container'>
            <div className='search-results-header' style={this.state.matches.length === 0 ? {"display": "none"} : null}>
              People
            </div>

            {/* No Matches Logic */}
            {this.state.matches.length === 0 ? this.renderNoSearchResults() : null}

            <ul>
              {this.state.matches.map((match, i) => <SearchResultCardContainer key={`${match.id}${match.first_name}${match.last_name}`} user={match} currentUserConnections={this.state.currentUserConnections} count={this.state.matches.length} place={i+1} />)}
            </ul>
          </div>

          <section className='project-info-bar'>
            <div className='project-info-text'>
              <h3>Project Description</h3>
              <p>RingIn is a clone of LinkedIn themed around J. R. R. Tolkien's The Lord of the Rings.</p>
              <p>This full stack project is built with...</p>
            </div>

            <ul>
              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>React</span>
                </div>
                <span className='post-info-item-desc'>Frontend structure</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Redux</span>
                </div>
                <span className='post-info-item-desc'>Frontend store</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>Ruby on Rails</span>
                </div>
                <span className='post-info-item-desc'>Backend</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>PostgreSQL</span>
                </div>
                <span className='post-info-item-desc'>Database</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>AWS</span>
                </div>
                <span className='post-info-item-desc'>Media uploading and storage</span>
              </li>

              <li className='post-info-item-wrap'>
                <div className='post-info-item-header'>
                  <span className='post-info-bullet'></span>
                  <span className='post-info-item'>HTML, CSS</span>
                </div>
                <span className='post-info-item-desc'></span>
              </li>
            </ul>

          </section>

        </div>
      </div>
    )
  }
}

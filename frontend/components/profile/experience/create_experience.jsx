import React from 'react';

const positions = "Full-time,Part-time,Self-employed,Freelance,Contract,Internship,Apprenticeship,Seasonal";
const months = "January,February,March,April,May,June,July,August,September,October,November,December";
const years = "2012,2011,2010,2009,2008,2007,2006,2005,2004,2003,2002,2001,2000,1999,1998,1997,1996,1995,1994,1993,1992,1991,1990,1989,1988,1987,1986,1985,1984,1983,1982,1981,1980,1979,1978,1977,1976,1975,1974,1973,1972,1971,1970,1969,1968,1967,1966,1965,1964,1963,1962,1961,1960,1959,1958,1957,1956,1955,1954,1953,1952,1951,1950,1949,1948,1947,1946,1945,1944,1943,1942,1941,1940,1939,1938,1937,1936,1935,1934,1933,1932,1931,1930,1929,1928,1927,1926,1925,1924,1923,1922,1921,1920,1919,1918,1917,1916,1915,1914,1913,1912,1911,1910,1909,1908,1907,1906,1905,1904,1903,1902,1901,1900";

class CreateExperienceForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user_id: this.props.currentUser.id,
      title: "",
      employment_type: "",
      company: "",
      location: "",
      start_date: "",
      current_role: true,
      end_date: "Present",
      industry: "none",
      headline: "",
      description: ""
    };

    this.createOptions = this.createOptions.bind(this);
    this.flipRole = this.flipRole.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createOptions(str) {
    let options = str.split(",");
    return options.map(option => <select key={option.id} value={option}>{option}</select>);
  }

  flipRole(e) {
    e.preventDefault();
    this.setState({ current_role: !this.state.current_role });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.action(...this.state);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>

          <div>
            <label>Title*</label>
            <input type="text" value={this.state.title} onChange={this.forceUpdate("title")} />
          </div>

          <div>
            <label>Employment</label>
            <select onChange={this.forceUpdate("employment_type")}></select>
          </div>

          <div>
            <label>Company name*</label>
          </div>

          <div>
            <label>Location</label>
          </div>

          <div>
            <label>Start date*</label>
          </div>

          <div>
            <label>End date*</label>
          </div>

          <div>
            <label>Headline</label>
          </div>

          <div>
            <label>Industry</label>
          </div>

          <div>
            <label>Description</label>
          </div>

        </form>
      </div>
    )
  }
}

export default CreateExperienceForm;
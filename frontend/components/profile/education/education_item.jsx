import React from 'react';

class Education extends React.Component {
  render() {
    const { education, key } = this.props;
    return (
      <div>
        <div className="education-item-wrap">
          <div className="education-item-head">
            <h1>{education.school}</h1>
            <button className="open-modal" onClick={() => this.props.openEditEducationModal(education)}>
              <img src={window.vectorURL} alt="pen" />
            </button>
            <button onClick={() => this.props.deleteEducation(education.id)}>
              Delete
            </button>
          </div>
          <h2>{education.degree} {education.subject}</h2>
          <h2>{education.start_date} - {education.end_date}</h2>
        </div>
      </div>
    )
  }
}

export default Education;
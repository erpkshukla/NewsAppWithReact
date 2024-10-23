import React, { Component } from 'react'

export class NewItem extends Component {
  render() {
    let { title, description, ImageUrl, newsUrl, date, author, source } = this.props;
    return (
      <div className="my-3">
        <div className="card">
          <div style={{
            display:'flex',
            justifyContent:'flex-end',
            position:'absolute',
            right:0


          }}>

            <span class="badge rounded-pill bg-danger">
              {source}<span className="visually-hidden">unread messages</span>
            </span>
          </div>

          <img src={!ImageUrl ? "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg" : ImageUrl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title}
            </h5>
            <p className="card-text">{description}...</p>
            <p classNames="card-text"><small className="text-danger"> By {!author ? "Unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )
  }
}

export default NewItem

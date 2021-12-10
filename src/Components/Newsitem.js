import React, { Component } from "react";

export default class Newsitem extends Component {
  render() {
    let { title, desc, imageurl, newsurl, author, time, source } = this.props;
    return (
      <div className="mx-3 my-5">
        <div className="card">
        <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>
                {source}
                <span className="visually-hidden">unread messages</span>
              </span>
          <img
            src={
              imageurl
                ? imageurl
                : "https://www.reuters.com/resizer/D80h-FtmPhBj9h7R37456Qrwq30=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/JCTH2FPY5ZKN3NITDSMZCH6XBA.jpg"
            }
            className="card-img-top"
            alt="..."
          />
          <div className="card-body">
            <h5 className="card-title">
              {title}
              
            </h5>
            <p className="card-text">{desc}...</p>
            <p className="card-text">
              <small className="text-muted">
                By {author} on {new Date(time).toGMTString()}
              </small>
            </p>
            <a
              rel="noreferrer"
              href={newsurl}
              target="_blank"
              className="btn btn-primary"
            >
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

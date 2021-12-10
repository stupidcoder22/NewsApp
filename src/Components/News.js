import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";

export class News extends Component {
  static defaultProps = {
    country: "in",
    page: "5",
    category: "general",
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      totalResults: 1,
    };
  }

  async update(){
    let urldata = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=fe8066c4f9ba4297b65f3c0985840924&page=${this.state.page}&pagesize=${this.props.page}`;
    this.setState({ loading: true });
    let data = await fetch(urldata);
    let parsedata = await data.json();
    this.setState({
      articles: parsedata.articles,
      totalResults: parsedata.totalResults,
      loading: false,
    });
  }

  async componentDidMount() {
    this.update();
  }

  handlenext = async () => {
    this.setState({
      page: this.state.page + 1,
    });
    this.update();
  };

  handleprev = async () => {
    this.setState({
      page: this.state.page - 1,
    });
    this.update();
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-2">NewsAddict- Top Headlines</h1>
        {this.state.loading && <Spinner />}
        <div className="row">
          {!this.state.loading &&
            this.state.articles.map((index) => {
              return (
                <div className="col-md-4" key={index.url}>
                  <Newsitem
                    title={index.title ? index.title.slice(0, 45) : ""}
                    desc={
                      index.description ? index.description.slice(0, 88) : ""
                    }
                    imageurl={index.urlToImage}
                    newsurl={index.url}
                    author={index.author==null?'Unknown':index.author}
                    time={index.publishedAt}
                    source={index.source.name}
                  ></Newsitem>
                </div>
              );
            })}
        </div>
        <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handleprev}
          >
            &laquo; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlenext}
          >
            Next &raquo;
          </button>
        </div>
      </div>
    );
  }
}

export default News;

import React, { Component } from 'react'
import NewItem from './NewItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 6,
        //category:'general'
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        };

        document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsWithPraveen`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}
       &page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        this.props.setProgress(30);
        //console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false, 
        })
        this.props.setProgress(100);
    }
    async componentDidMount() {
        //console.log("cdn");
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645e862a61204e4eb283f34c255f01bb&page=1&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults
        })

    }

    // handlePreClick = async () => {
    //     // console.log("handlePreClick")
    //     // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645e862a61204e4eb283f34c255f01bb&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    //     // this.setState({ loading: true });
    //     // let data = await fetch(url);
    //     // let parseData = await data.json()
    //     // console.log(parseData);
    //     // this.setState({
    //     //     page: this.state.page - 1,
    //     //     articles: parseData.articles,
    //     //     loading: false
    //     // })
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();

    // }

    // handleNextClick = async () => {
    //     //console.log("handleNextClick")
    //     // if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
    //     //     this.setState({ loading: true });
    //     //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645e862a61204e4eb283f34c255f01bb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //     //     let data = await fetch(url);
    //     //     let parseData = await data.json()
    //     //     console.log(parseData);
    //     //     this.setState({ loading: false });
    //     //     this.setState({
    //     //         page: this.state.page + 1,
    //     //         articles: parseData.articles,
    //     //         loading: false
    //     //     })

    //     // }
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();

    // }

    // method for scrolling and auto loading in place of next and previous buttons
    // fetchMoreData = async () => {
    //     this.setState({ page: this.state.page + 1 })

    //     const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645e862a61204e4eb283f34c255f01bb
    //  &page=${this.state.page}&pageSize=${this.props.pageSize}`;
    //     this.state({ loading: true });
    //     let data = await fetch(url);
    //     let parseData = await data.json()
    //     this.setState({
    //         articles: this.state.articles.concat(parseData.articles),
    //         totalResults: parseData.totalResults,
    //         loading: false,
    //     })

    // };

    fetchMoreData = async () => {
        // Incrementing page safely by accessing the previous state
        //this.setState((prevState) => ({ page: prevState.page + 1}));
        this.setState({ page: this.state.page + 1 })

        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=645e862a61204e4eb283f34c255f01bb&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;

        try {
            let data = await fetch(url);  // Fetching the data from the API
            let parseData = await data.json();  // Parsing the JSON response

            this.setState({
                articles: this.state.articles.concat(parseData.articles),
                totalResults: parseData.totalResults

            })
        } catch (error) {
            console.error("Error fetching data: ", error);
            this.setState({ loading: false });  // Ensure loading stops on error
        }
    };














    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center" style={{ margin: '40px 0px' }}>Today's - Top  {this.capitalizeFirstLetter(this.props.category)} Headlines </h1>
                {this.state.loading && <Spinner />}

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row">
                            {/* {this.state.articles && this.state.articles.length > 0 && this.state.articles.map((element) => { */}
                            {this.state.articles.map((element) => {

                                return <div className="col-md-4" key={element.url}>
                                    <NewItem title={element.title.slice(0, 30)}
                                        description={element.description ? element.description.slice(0, 50) : ""}
                                        ImageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>

                            })}
                        </div>
                    </div>

                </InfiniteScroll>


                {/* code for previous and Next buttons */}
                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePreClick}>&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}

            </div>

        )
    }
}

export default News

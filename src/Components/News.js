import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';

export class News extends Component {

  constructor(){
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
  }

  async componentDidMount (){
      let url = "https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=522a4573a30c492d9084de583e9cf0a8&page=1&pagesize=20";
      this.setState({loading:true});
      let data = await fetch(url);
      let pdata = await data.json();
      this.setState({articles:pdata.articles, 
        totalResults: pdata.totalResults,
        loading:false});
      

  }

  handleprev = async()=>{
    let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=522a4573a30c492d9084de583e9cf0a8&page=${this.state.page -1}&pagesize=20`;
    this.setState({loading:true});
    let data = await fetch(url);
    let pdata = await data.json();
    this.setState({
        page: this.state.page -1,
        articles:pdata.articles,
        loading:false
    })
    window.scrollTo(0, 0);
  }
  handlenext = async()=>{
      if(!(this.state.page+1> Math.ceil(this.state.totalResults/20))){

        let url = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=522a4573a30c492d9084de583e9cf0a8&page=${this.state.page +1}&pagesize=20`;
        this.setState({loading:true});
        let data = await fetch(url);
        let pdata = await data.json();
        this.setState({
            page: this.state.page +1,
            articles:pdata.articles,
            loading:false
        })
        window.scrollTo(0, 0);
  }
}

  render() {
    return (
      <div className="container my-3">
          <h1 id="heading">Business Headlines Today</h1>
          {this.state.loading && <Spinner/>}
          <div className="row">
          {this.state.articles.map((ele)=>{
           return <div className="col-md-3" key={ele.url}>
            <NewsItem  title={ele.title} description={ele.description} imgurl={!ele.urlToImage?'https://newsinterpretation.com/wp-content/uploads/2020/03/news33.jpg':ele.urlToImage} newsurl={ele.url}/>
            </div>
          })}        
          
          </div>
          <div className="container d-flex justify-content-between">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handleprev}>&larr; Previous</button>
            <button disabled={this.state.page+1> Math.ceil(this.state.totalResults/20)} type="button" className="btn btn-dark" onClick={this.handlenext}>Next &rarr;</button>
          </div>
          
      </div>
    )
  }
}

export default News
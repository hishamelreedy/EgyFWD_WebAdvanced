import React from 'react'
import Categories from "./comps/Categories";
import * as BooksAPI from './BooksAPI'
import './App.css'
import {Route} from 'react-router-dom';
import Search from "./Search";
import {Link} from 'react-router-dom';

class BooksApp extends React.Component {
        constructor(args) {
          super(args);
          this.state = {
              books: []
                }
        }

      componentDidMount() {
                BooksAPI.getAll().then(books => {
                  this.setState({books: books})
            })

      }


      onCategoryChange = (book, shelf) => {
                    if (book.shelf !== shelf) {
                  BooksAPI.update(book, shelf).then(() => {
                book.shelf = shelf
                this.setState(state => ({
                  books: state.books.filter(b => b.id !== book.id).concat([ book ])
                }))
            })
        }
      };
  render() {
    return (
      <div className="app">
      <Route path="/search" exact render={({history}) => (
	                           <Search
	                               history={history}
				       books={this.state.books}
	                               onCategoryChange={this.onCategoryChange}
	                           />
	          )}/>

 <Route path="/" exact render={() => (
    <div>
          <div className="list-books-title">
                <h1>MyReads</h1>
          </div>
    {
           <Categories
        onCategoryChange={this.onCategoryChange}
         books={this.state.books}
           />
                      }
    <div className="open-search">
      <Link to="/search"><button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button></Link>
  </div>
    </div>
      )}/>


</div>
)
  }
}

export default BooksApp

import React, { Component } from 'react';
import Booklist from './Booklist.js';
import {Link} from 'react-router-dom';

class Categories extends Component {
 	render() {
                   return <div className="list-books">
			     <div className="list-books-content">
				<div>
				   <Booklist shelfTitle='Currently Reading' bookArray={this.props.books.filter(book => book.shelf === 'currentlyReading')}
			                            onCategoryChange={this.props.onCategoryChange}/>,
				   <Booklist shelfTitle='Want to Read' bookArray={this.props.books.filter(book => book.shelf === 'wantToRead')}
			      			    onCategoryChange={this.props.onCategoryChange}/>,
				   <Booklist shelfTitle='Read' bookArray={this.props.books.filter(book => book.shelf === 'read')}
			                            onCategoryChange={this.props.onCategoryChange}/>
			         </div>
			     </div>  
                	     <div className="open-search">
                                 <Link to="/search">Add a book</Link>
                             </div>
		    </div>
    } 
}

export default Categories
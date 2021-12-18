import React from 'react';
import { Link } from 'react-router-dom';

function Products(props) {
    return (
        <div>
            <h1>The Product Page</h1>
            <ul>
                {<li>
                   <Link to='/products/p1'>A Book</Link> 
                </li>}
                {<li>
                   <Link to='/products/p2'>A Carpet</Link> 
                </li>}
                {<li>
                   <Link to='/products/p3'>A Book</Link> 
                </li>}
           
            </ul>
        </div>
    );
}

export default Products;
/**
 * Created by Лев on 05.10.2018.
 */
import * as React from 'react'
import './ProductListCss.css'


export class ProductList extends React.Component{
  render(){
    const mass = this.props.products;
    const categoryMass = this.props.categories;
    return(
      <div className="productList">
        <div className="productConsole">
          Select category
          <br/>
          <select name="categories" className="category_select">
            <option value={"-"} onClick={()=>this.props.selectProductsCategory("-")}>{"-"}</option>
            {categoryMass.map((name,idx)=>(
              <option value={name} onClick={()=>this.props.selectProductsCategory(name)}>{name}</option>
            ))}

          </select>
        </div>
        {mass.map((product, idx)=>(
          <React.Fragment>
          <div className="productSelectElement" key={product.product+product.date} onClick={()=>this.props.selectProduct(product.product)}>
            {product.product}
          </div>
            <br/>
          </React.Fragment>
        ))}
      </div>
    )
  }
}

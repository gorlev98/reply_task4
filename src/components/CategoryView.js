/**
 * Created by Лев on 06.10.2018.
 */
import * as React from 'react'
import './ProductViewCss.css'

export class CategoryView extends React.Component{

  render(){
    function getSelectedPropertyNumber(categories, categoryNumber){
      for(let i=0; i<categories.length;i++){
        if(categories[i]===categoryNumber ){
          return i;
        }
      }
      return -1;
    }
    let propertyMass = this.props.category.properties;
    let propertyNumber = getSelectedPropertyNumber(this.props.product.categories, this.props.categoryNumber)
    return(
      <div>
        {propertyMass.map((property, prop_idx)=>(
          <div className="categoryView" key={property.property_name}>
            {property.property_name + "="}
            <select name={property.property_name + " "+propertyNumber +" "+this.props.categoryNumber + " "+ prop_idx}
            value={property.values[this.props.product.properties[propertyNumber].values[prop_idx]]}
            onChange={this.props.changePropertyFunc}
            >
              {property.values.map((value, idx)=>(
                <option value={value}>{value}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    )
  }
}

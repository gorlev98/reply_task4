/**
 * Created by Лев on 05.10.2018.
 */
import * as React from 'react'
import './ProductViewCss.css'
import {CategoryView} from './CategoryView'

export class ProductView extends React.Component{
  render() {
    function getUnusedCategories(){
      var mass=[];mass[0]={name:"-", number:-1}
      var j=1;
      for(var i=0; i<categories.length;i++){
        if(productCategories.indexOf(i)==-1){
          mass[j]={name:categories[i].name, number:i};
          j++;
        }
      }
      return mass;
    }

    const categories = this.props.categories;

    if((this.props.selectedProduct!=-1 || this.props.addNew)&&!this.props.addNewCategory) {//если продукт существует и имеет номер (начиная с 0)
      var productCategories=[];
      var productCategories = this.props.product.categories;
      var unusedCategories=getUnusedCategories();

      return (
        <div className="productView">
          <input className="product" value={this.props.product.product} onChange={this.props.changeProductInfo}>
          </input> <input className="date" value={this.props.product.date} onChange={this.props.changeProductInfo}
          placeholder="ex: 01.01.2001"></input>
          <br/>
          <select name="unused_categories" className="unused_category_select">
          {unusedCategories.map((category, idx)=>(
            <option value={category.name} onClick={()=>this.props.selectUnusedCategory(category.number)}>{category.name}</option>
          ))}
          </select> <button onClick={()=>this.props.addProductCategory()}>Add category</button>
          {productCategories.map((category, idx)=>(
            <div className="categoryBlock" key={categories[category].name}>
              {categories[category].name}
              <button onClick={()=>this.props.removeProductCategory(category)}>X</button>
              <CategoryView
                category={categories[category]}
                product={this.props.product}
                categoryNumber={category}
                changePropertyFunc={this.props.changePropertyFunc}
              />
              <br/>
            </div>
          ))}
          <br/>
          <button onClick={()=>this.props.add_resaveProductFunc()}>Add/ReSave Product</button> <button>Cancel</button>
        </div>
      )
    }
    else{
      if(this.props.addNewCategory) {
        function createClassNameMass(properties){
          var mass=[];
          for(var i=0; i<properties.length; i++){
            mass[i]="propertyName/"+i;
          }
          return mass;
        }
        var categoryProperties = this.props.category.properties;
        var classNameMass = createClassNameMass(categoryProperties);
        return (
          <div className="productView">
            <input value={this.props.category.name} onChange={this.props.changeCategoryName} placeholder="Category Name"></input>
            <br/>
            <button onClick={this.props.addProperty}>Add property</button>
            {categoryProperties.map((property, idx)=>(
              <div key={property.property_name+"/"}>
                <input id={"input/"+idx} defaultValue={property.property_name} placeholder="propName. SAVE IT!"></input>
                <button onClick={()=>this.props.changeTempProperty(idx)}>Set property name</button>
                <button onClick={()=>this.props.addValue(property.property_name)}>Add value</button>
                <button onClick={()=>this.props.removeProperty(property.property_name)}>X</button>
                {property.values.map((value, idx)=>(
                  <div>
                  <input className={"value/"+property.property_name+"/index/"+idx} value={value} onChange={this.props.changeTempValue} placeholder="propValue"></input>
                  <button onClick={()=>this.props.removeValue(property.property_name, idx)}>Remove value</button>
                  </div>
                ))}
                <br/>

              </div>
            ))}
            <button onClick={this.props.saveCategory}>Save category</button>
          </div>
        )
      }
      else{
        return (
          <div>

          </div>
        )
      }
    }
  }
}

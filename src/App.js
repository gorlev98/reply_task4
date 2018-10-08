import * as React from 'react'
import './App.css';
import {ProductList} from './components/ProductList'
import {ProductView} from './components/ProductView'

class App extends React.Component {
  constructor(props){
    super(props);
    this.state= {
      categories:[
        {
          name:"category_0",
          properties:[
            {
              property_name:"property_0_0",
              values:["value0_0_0", "value0_0_1", "value0_0_2"]
            }
          ]
        },
        {
          name:"category_1",
          properties:[
            {
              property_name:"property_1_0",
              values:["value1_0_0", "value1_0_1", "value1_0_2"]
            },
            {
              property_name:"property_1_1",
              values:["value1_1_0", "value1_1_1"]
            }
          ]
        }
      ],
      products:[
        {
          product: "product0",
          date: "06.08.2018",
          categories:[1],
          properties:[
            {
              values:[0,1]
            }
          ]
        },
        {
          product: "product1",
          date: "05.08.2018",
          categories:[0],
          properties:[
            {
              values:[2]
            }
          ]
        },
        {
          product:"product2",
          date:"04.08.2018",
          categories:[0,1],
          properties:[
            {
              values:[0]
            },
            {
              values:[1,1]
            }
          ]
        }
      ],
      tempProduct:{
        product: "",
        date: "",
        categories:[],
        properties:[]
      },
      tempCategory:{
          name:"",
          properties:[],

      },
      selectedCategory: -1,// -1 если нет выбранной категории
      selectedProduct:-1,// -1 - no selected product
      addNew:false,
      addNewCategory:false,
      selectedUnusedCategory:-1,
    };
    this.selectProduct=this.selectProduct.bind(this);
    this.selectProductsCategory=this.selectProductsCategory.bind(this);
    this.addNewProductButtonFunction=this.addNewProductButtonFunction.bind(this);
    this.addProductCategory=this.addProductCategory.bind(this);
    this.selectUnusedCategory=this.selectUnusedCategory.bind(this);
    this.add_resaveProductFunc=this.add_resaveProductFunc.bind(this);
    this.changePropertyFunc=this.changePropertyFunc.bind(this);
    this.changeProductInfo=this.changeProductInfo.bind(this);
    this.removeProductCategory=this.removeProductCategory.bind(this);
    this.addProperty=this.addProperty.bind(this);
    this.addValue=this.addValue.bind(this);
    this.changeTempProperty=this.changeTempProperty.bind(this);
    this.removeProperty=this.removeProperty.bind(this);
    this.removeValue=this.removeValue.bind(this);
    this.saveCategory=this.saveCategory.bind(this);
    this.changeCategoryName=this.changeCategoryName.bind(this);
    this.changeTempValue = this.changeTempValue.bind(this);
  }
  selectProduct(name){
    function findNumber(obj,name){
      var products = obj.state.products;
      for(var i=0; i<products.length; i++){
        if(products[i].product === name){
          return i;
        }
      }
      return -1;
    }
    var number = findNumber(this,name);
    if(number !=-1) {
      this.setState({
        selectedProduct: number,
        tempProduct:JSON.parse(JSON.stringify(this.state.products[number])),
        addNew:false,
        selectedUnusedCategory:-1,
        addNewCategory:false,
      })
    }
  }
  selectProductsCategory(name){
    function findNumber(obj,name){
      var categories = obj.state.categories;
      for(var i=0; i<categories.length; i++){
        if(categories[i].name==name){
          return i;
        }
      }
      return -1;//если выбрана чёрточка также тут будет обрабатываться
    }
    var number = findNumber(this,name);
    this.setState({
      selectedCategory: number
    })
  }
  addNewProductButtonFunction(){
    var emptyProduct = {
      product: "",
      date: "",
      categories: [],
      properties: []
    };
    this.setState({
      addNew:true,
      tempProduct:JSON.parse(JSON.stringify(emptyProduct)),
      selectedProduct:-1,
      addNewCategory:false,
    })
  }
  selectUnusedCategory(id){
    this.setState({
      selectedUnusedCategory:id
    })
  }
  removeProductCategory(categoryNumber){
    function fingPropertyPosition(categoryNumber, tempCategories){
      for(var i=0; i<tempCategories.length;i++){
        if(tempCategories[i]==categoryNumber){
          return i;
        }
      }
    }
    function removeChosedElem(categories,properties, index){
      categories.splice(index,1);
      properties.splice(index,1);
    }
    var tempCategories = this.state.tempProduct.categories
    var tempProperties = this.state.tempProduct.properties;
    var index = fingPropertyPosition(categoryNumber,tempCategories);
    removeChosedElem(tempCategories,tempProperties,index);
    var viewProduct = this.state.tempProduct;
    viewProduct.categories=tempCategories;
    viewProduct.properties=tempProperties;
    this.setState({
      tempProduct:viewProduct
    })
  }
  addProductCategory(){
    function createPropertyesMass(length){
      var mass=[];
      for(var i=0; i<length; i++){
        mass[i]=0;
      }
      return mass;
    }
    var newCategory = this.state.selectedUnusedCategory;
    if(newCategory!=-1){
      var categories = this.state.tempProduct.categories;
      categories[categories.length]=newCategory;
      var propertyNumber = this.state.categories[newCategory].properties.length;
      var properties = this.state.tempProduct.properties;
      properties[properties.length]=createPropertyesMass(propertyNumber);
      this.setState({
        tempProduct:{
          product:this.state.tempProduct.product,
          date: this.state.tempProduct.date,
          categories:categories,
          properties:properties
        }
      })
    }

  }
  add_resaveProductFunc(){
    function findProduct(obj){
      for(var i=0; i<obj.products.length; i++){
        if(obj.products[i].product===obj.tempProduct.product){
          console.log("correct find:");
          console.log(obj.products[i].product+" "+obj.tempProduct.product)
          return i;
        }
      }
      return -1;
    }
    function isCorrectProduct(obj){
      function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
      function isCorrectDate(obj){
        var dateElem = obj.date.split('.');
        var date = Number.parseInt(dateElem[0]);
        var month=Number.parseInt(dateElem[1]);
        var year = Number.parseInt(dateElem[2]);
        if(isNumeric(date)&&isNumeric(month)&&isNumeric(year)){
          console.log("split correct");
          if(date[0]<0 || date[0]>31){
            console.log("uncorrect date");
            return false;
          }
          if(month[1]<0 || month[1]>12){
            console.log("uncorrect month");
            return false;
          }
          if(year[2]<0){
            console.log("uncorrect year");
            return false;
          }
          return true;
        }
        else{
          return false;
        }
      }
      if(obj.product === ""){
        console.log("uncorrect product");
        return false;
      }
      if(!isCorrectDate(obj)){
        console.log("uncorrect date");
        return false;
      }
      console.log("obj.categories");
      console.log(obj.categories);
      if(obj.categories.length===0){
        console.log("uncorrect categories")
        return false;
      }
      return true;
      //
      // if(obj.date)


    }
    if(isCorrectProduct(this.state.tempProduct)) {
      var number = findProduct(this.state);
      var emptyProduct = {
        product: "",
        date: "",
        categories: [],
        properties: []
      };
      if (number >= 0) {//переделка старого
        var productMass = this.state.products;
        productMass[number] = JSON.parse(JSON.stringify(this.state.tempProduct));
        this.setState({
          products: productMass,
          tempProduct: JSON.parse(JSON.stringify(emptyProduct)),
          selectedProduct:-1,// -1 - no selected product
          addNew:false,
          selectedUnusedCategory:-1,

        })
      }
      else {//новый
        var productMass = this.state.products;
        productMass[productMass.length] = JSON.parse(JSON.stringify(this.state.tempProduct));
        this.setState({
          products: productMass,
          tempProduct: emptyProduct,
          selectedProduct:-1,// -1 - no selected product
          addNew:false,
          selectedUnusedCategory:-1,
        })
      }
    }
    else{
      alert("uncorrect product");
      return false;
    }
  }
  changeProductInfo(e){
    //если изменяется название , то товар новый
    //если дата, то старый
    const value = e.target.value;
    const target=e.target;
    const name  = target.className;
    var viewProduct = JSON.parse(JSON.stringify(this.state.tempProduct));
    console.log(viewProduct);
    viewProduct[name]=value;
    console.log("viewProduct2");
    console.log(viewProduct);
    //console.log(viewProduct);
    this.setState({
      tempProduct:JSON.parse(JSON.stringify(viewProduct))
    })
  }
  changePropertyFunc(e){
    function getNewAnswerNumber(answer, properties){
      console.log(answer);
      console.log(properties.values);
      return properties.values.indexOf(answer);
    }
    const value = e.target.value;
    const target=e.target;
    const name  = e.target.name;
    var viewProduct = this.state.tempProduct;
    var nameParts = name.split(' ');
    //0 - наш ответ буквами, 1 - номер property у нашего товара, 2 - номер категории для нахождения номера нового ответа
    //2 - номер свойства у категории
    var newAnswerNumber = getNewAnswerNumber(value, this.state.categories[Number.parseInt(nameParts[2])].properties[Number.parseInt(nameParts[3])]);
    viewProduct.properties[Number.parseInt(nameParts[1])].values[Number.parseInt(nameParts[3])]=newAnswerNumber;
    this.setState({
      tempProduct:viewProduct
    })
  }
  changeCategoryName(e){
    const value = e.target.value;
    var tempCategory = this.state.tempCategory;
    tempCategory.name=value;
    this.setState({
      tempCategory:tempCategory
    })
  }
  addProperty(){
    var tempCategory = this.state.tempCategory;
    tempCategory.properties[tempCategory.properties.length]={
      property_name:"",
      values:[]
    };
    this.setState({
      tempCategory: tempCategory
    })
  }
  addValue(property_name){
    function findPropertyNumber(properties, property_name){
      for(var i=0; i<properties.length; i++){
        if(properties[i].property_name===property_name){
          return i;
        }
      }
    }
    var tempCategory= this.state.tempCategory;
    var number = findPropertyNumber(tempCategory.properties, property_name);
    var values = tempCategory.properties[number].values;
    values[values.length]="";
    this.setState({
      tempCategory:tempCategory
    })
  }
  removeProperty(property_name){
    function findPropertyNumber(properties, property_name){
      for(var i=0; i<properties.length; i++){
        if(properties[i].property_name===property_name){
          return i;
        }
      }
    }
    var tempCategory= this.state.tempCategory;
    var number = findPropertyNumber(tempCategory.properties, property_name);
    tempCategory.properties.splice(number,1);
    this.setState({
      tempCategory:tempCategory
    })
  }
  removeValue(property_name, id){
    function findPropertyNumber(properties, property_name){
      for(var i=0; i<properties.length; i++){
        if(properties[i].property_name===property_name){
          return i;
        }
      }
    }
    var tempCategory= this.state.tempCategory;
    var number = findPropertyNumber(tempCategory.properties, property_name);
    tempCategory.properties[number].values.splice(id,1);

    this.setState({
      tempCategory:tempCategory
    })
  }
  changeTempProperty(index){
    var value = document.getElementById("input/"+index).value;
    var tempCategory = this.state.tempCategory;
    tempCategory.properties[index].property_name=value;
    this.setState({
      tempCategory:tempCategory
    })
  }
  changeTempValue(e){
    function findPropertyNumber(properties, property_name){
      for(var i=0; i<properties.length; i++){
        if(properties[i].property_name===property_name){
          return i;
        }
      }
    }
    const value = e.target.value;
    const target=e.target;
    const name  = target.className.split('/');
    var number = findPropertyNumber(this.state.tempCategory.properties, name[1]);
    var property_number = name[3];
    var tempCategory = this.state.tempCategory;
    tempCategory.properties[number].values[property_number] = value;
    this.setState({
      tempCategory:tempCategory
    })
  }
  saveCategory(){
    function isCorrectCategory(tempCategory){
      console.log("isCorrectCategory call");
      if(tempCategory.name===""){
        alert("uncorrect name");
        return false;
      }
      console.log(tempCategory.properties);
      if(tempCategory.properties.length===0){
        alert("no properties");
        return false;
      }
      for(var i=0; i<tempCategory.properties.length; i++){
        console.log(tempCategory.properties[i].values);
        if(tempCategory.properties[i].values.length===0 || tempCategory.properties[i].property_name===""){
          alert("Uncorrect property (maybe you don't save property name or there no any values)");
          return false;
        }
        for(var j=0; j<tempCategory.properties[i].values.length;j++){
          if(tempCategory.properties[i].values[j]===""){
            alert("Uncorrect property value");
            return false;
          }
        }
      }
      return true;
    }
    console.log("saveCategory called");
    if(isCorrectCategory(this.state.tempCategory)){
      var categories = this.state.categories;
      categories[categories.length]=JSON.parse(JSON.stringify(this.state.tempCategory));
      var emptyCategory = {
        name:"",
        properties:[]
      }
      this.setState({
        categories:categories,
        tempCategory:emptyCategory,
        //убрал всё с экрана
        selectedCategory: -1,// -1 если нет выбранной категории
        selectedProduct:-1,// -1 - no selected product
        addNew:false,
        addNewCategory:false,
        selectedUnusedCategory:-1,
      })
    }
  }
  render() {
    function createCategoryMass(obj){
      var mass=[];
      for(var i=0; i<obj.categories.length;i++){
        mass[i]=obj.categories[i].name;
      }
      //mass[obj.categories.length]="-";
      return mass;
    }
    function createSelectedProductsMass(obj){
      var mass=[];var j=0;
      for(var i=0;i<obj.products.length;i++){
        if(obj.products[i].categories.indexOf(obj.selectedCategory)!=-1 || obj.selectedCategory==-1){
          mass[j]=obj.products[i];
          j++;
        }
      }
      return mass;
    }
    var categoryMass=createCategoryMass(this.state);
    var productMass=createSelectedProductsMass(this.state);
    var selectedProduct = this.state.tempProduct;
    return (
      <div>
        <ProductList
          products={productMass}
          categories={categoryMass}
          selectedCategory={this.state.selectedCategory}
          selectProduct={this.selectProduct}
          selectProductsCategory={this.selectProductsCategory}
        />
        <ProductView
         product={selectedProduct}
         category={this.state.tempCategory}
         categories={this.state.categories}
         addNew={this.state.addNew}
         addNewCategory={this.state.addNewCategory}
         selectedProduct={this.state.selectedProduct}
         selectUnusedCategory={this.selectUnusedCategory}
         addProductCategory={this.addProductCategory}
         removeProductCategory={this.removeProductCategory}
         add_resaveProductFunc={this.add_resaveProductFunc}
         changePropertyFunc={this.changePropertyFunc}
         changeProductInfo={this.changeProductInfo}
         addProperty={this.addProperty}
         removeProperty={this.removeProperty}
         addValue={this.addValue}
         removeValue={this.removeValue}
         saveCategory={this.saveCategory}
         changeCategoryName={this.changeCategoryName}
         changeTempProperty={this.changeTempProperty}
         changeTempValue={this.changeTempValue}
        />
        <div className="addButtons">
          <button className="addProductButton" onClick={() => this.addNewProductButtonFunction()}>Add new Product</button>
          <button className="addCategoryButton" onClick={()=>this.setState({addNewCategory:true})}>Add new Category</button>

        </div>
      </div>
    );
  }
}

export default App;

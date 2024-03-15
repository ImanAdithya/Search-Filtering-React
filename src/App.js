import logo from './logo.svg';
import './App.css';

import Products from "./products/Products";
import Navigation from "./Navigation/Nav";
import Recommended from "./Recommended/Recommended";
import SideBar from "./SideBar/SideBar";
import {useState} from "react";

import products from "./db/db";
import Card from "./component/Card";
function App() {

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [query, setQuery] = useState("");

    //Input Filter
    const handleInput=event=>{
        setQuery(event.target.value);
    }
    const filteredItems=products.filter(product=>
        product.title.toLocaleLowerCase().indexOf(query.toLocaleLowerCase()!==-1)
    );

    //Radio Filter
    const handleChange=event=>{
        setSelectedCategory(event.target.value);
    }

    //Button Filter
    const handleClick=event=>{
        setSelectedCategory(event.target.value);
    }

    function filteredData(products,selected,query) {
        let filteredProducts=products;

        //Filtering Input Items
        if (query){
            filteredProducts=filteredItems;
        }

        //Selected Filter
        if (selected){
            filteredProducts=filteredProducts.filter(
                (product)=>
                    product.category === selected ||
                    product.color === selected ||
                    product.newPrice === selected ||
                    product.company === selected ||
                    product.title === selected
            );
        }

        return filteredProducts.map(({img,title,star,reviews,newPrice,prevPrice})=>(
            <Card key={Math.random()}
            img={img} title={title} star={star} reviews={reviews} newPrice={newPrice} prevPrice={prevPrice}
            />
        ));
    }

    const result=filteredData(products,selectedCategory,query);

  return (
   <>
       <SideBar handleChange={handleChange}/>
       <Navigation query={query} handleInputChange={handleInput}/>
       <Recommended handleClick={handleClick}/>
       <Products result={result}/>

   </>
  );
}

export default App;

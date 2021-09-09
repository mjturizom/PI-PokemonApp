import React from "react";

export default function Card({name, image , types}){
return(
    <div>
        <h3>{name}</h3>
        <h5>{image}</h5>
        <img src={image} alt='Without img'/>
    </div>
)
}
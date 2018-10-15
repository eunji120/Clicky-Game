import React from "react";
import "./Mastercard.css";

const Mastercard = props => (

    <div onClick = {() => props.setClicked(props.id)} className="card">
        <div className="img-container">
            <img alt={props.name} src={props.image} />
        </div>
    </div>
);

export default Mastercard;
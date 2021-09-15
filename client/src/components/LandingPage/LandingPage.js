import React from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div className='landing'>
      <h1>Welcome To PokeApp</h1>
      <Link className='btnlanding' to="/home">
        <button className='btnToHome'>Let's go!</button>
      </Link>
    </div>
  );
}

import React from 'react'
import { Figure } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css";

function Avator( ) {
    return (
        <>
        <Figure.Image
            width={171}
            height={180}
            alt="171x180"
            src="./images/twitter-icon.png"
        />
        <Figure.Caption>
            Nulla vitae elit libero, a pharetra augue mollis interdum.
        </Figure.Caption>    
        </>
    )
}

export default Avator
/* The code is defining a React functional component called `Partern`. This component returns JSX code
that represents a section of partner logos. The logos are displayed in a row with 4 columns, each
containing an image wrapped in a link. The images are sourced from different files and have alt text
and aria-label attributes for accessibility. The component is exported as the default export, which
means it can be imported and used in other parts of the application. */
import React from 'react'

const Partern = () => {
    return (
        <div className="py-5" >
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/microsoft.svg" alt="..." aria-label="Microsoft Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/google.svg" alt="..." aria-label="Google Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/facebook.svg" alt="..." aria-label="Facebook Logo" /></a>
                    </div>
                    <div className="col-md-3 col-sm-6 my-3">
                        <a href="#!"><img className="img-fluid img-brand d-block mx-auto" src="assets/img/logos/ibm.svg" alt="..." aria-label="IBM Logo" /></a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Partern

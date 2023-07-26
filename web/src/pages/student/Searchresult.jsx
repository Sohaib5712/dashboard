import React, { useRef } from 'react';
import { useLocation,Link } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import logo from '../../img/instLogo.png';
import top from '../../img/imPrint.png'
import bottom from '../../img/print.png'
import './Search.css';

const SearchResult = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults || [];
  const printRef = useRef(null);

  const generatePDF = () => {
    const printContent = printRef.current;

    if (printContent) {
      html2canvas(printContent).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('diploma_certificate.pdf');
      });
    }
  };

  return (
   <>
   <div id="top">
      {searchResults.map((v) => (
        <div key={v.roll_no} className="container" ref={printRef}>
          <div id="diploma-certificate">
            <div className="" id="main">
             <div className='row' >
              <div className="topImag">
                <img src={top} id='topImage' alt="" />
              </div>
              <div style={{marginTop:"5rem",display:"flex",justifyContent:"center"}} className='data'>
              <div className="right">
                <div className="Bitter">CERTIFICATE</div>
                <div className="certificate-text">
                  <div className="achieve">of complition</div>
                </div>
              </div>
              <div className="bord"></div>
              <div className="">
                <div className="proud">
                  This is to Proudly Certify That:
                </div>
              <div className="name">{v.name}</div>
                </div>
                </div>
              </div>
              <div  style={{display:"flex",justifyContent:"center"}}>
              <div id='boy'></div>
              </div>
                
                <div className="word">
                <div className="ele">
     It is to certify that Mr. <span style={{textTransform:'capitalize'}}>{v.name}</span> S/O <span style={{textTransform:'capitalize'}}>Mr. {v.fatherName}</span> has completed his 
     course of <span style={{textTransform:'capitalize',fontWeight:800}}>({v.courseAppliedFor})</span>
     <br/>
     in <span style={{textTransform:'capitalize',fontWeight:900}}>({v.batchName} Batch)</span> and has achieved marks in his final Examination.
  </div>  
                </div>
<div className="twe">
   <div className="thirt">
     Asad Ur Rehman
   </div> 
   <div className="fourte">
     CEO (The Sills Institute of IT Training & Development)
   </div>
   <p className="fiveteen">
     For Verification www.theskillsleader.com 
     <br/>
        Call us: at +92-41-2413334 
   </p>
</div>
<img src={bottom} alt="" className='bot'/>
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="flxbtn">
    <button id='btn' onClick={generatePDF}>Print</button>
<Link id='bkbtn' to="/reg-student">Go Back</Link>
    </div>
</>
  );
};

export default SearchResult;

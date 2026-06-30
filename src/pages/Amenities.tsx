const Amenities = () => {
  return (
    <>


  <div className="page-heading header-text">
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <span className="breadcrumb"><a href="#">Home</a>  / booking</span>
          <h3>Single booking</h3>
        </div>
      </div>
    </div>
  </div>

  <div className="single-property section">
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
          <div className="main-image">
            <img src="assets/images/single-property.jpg" alt="" />
          </div>
          <div className="main-content">
            <span className="category">Apparment</span>
            <h4>24 New Street, Miami, FL 33132</h4>
            <p>We <strong>Peakhaven</strong> <br /> best travel booking agency</p></div> 
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                  Best for you ?
                </button>
              </h2>
              <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                  How does this work ?
                </button>
              </h2>
              <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                  Why is Villa the best ?
                </button>
              </h2>
              <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                  Simply <strong>select your destination</strong>, choose your preferred property type, and easily book your stay. We handle the rest, ensuring a seamless and unforgettable experience.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-4">
          <div className="info-table">
            <ul>
              <li>
                <img src="assets/images/info-icon-01.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>450 m2<br /><span>Total Flat Space</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-02.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Contract<br /><span>Contract Ready</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-03.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Payment<br /><span>Payment Process</span></h4>
              </li>
              <li>
                <img src="assets/images/info-icon-04.png" alt="" style={{ maxWidth: '52px' }} />
                <h4>Safety<br /><span>24/7 Under Control</span></h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div className="section best-deal">
    <div className="container">
      <div className="row">
        <div className="col-lg-4">
          <div className="section-heading">
            <h6>| Best Deal</h6>
            <h2>Find Your Best Deal Right Now!</h2>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="tabs-content">
            <div className="row">
              <div className="nav-wrapper ">
                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="appartment-tab" data-bs-toggle="tab" data-bs-target="#appartment" type="button" role="tab" aria-controls="appartment" aria-selected="true">Appartment</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="villa-tab" data-bs-toggle="tab" data-bs-target="#villa" type="button" role="tab" aria-controls="villa" aria-selected="false">Villa House</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="penthouse-tab" data-bs-toggle="tab" data-bs-target="#penthouse" type="button" role="tab" aria-controls="penthouse" aria-selected="false">Penthouse</button>
                  </li>
                </ul>
              </div>              
              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="appartment" role="tabpanel" aria-labelledby="appartment-tab">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="info-table">
                        <ul>
                          <li>Total Flat Space <span>540 m2</span></li>
                          <li>Floor number <span>3</span></li>
                          <li>Number of rooms <span>8</span></li>
                          <li>Parking Available <span>Yes</span></li>
                          <li>Payment Process <span>Bank</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <img src="assets/images/deal-01.jpg" alt="" />
                    </div>
                    <div className="col-lg-3">
                      <h4>All Info About Apartment</h4>
                      <p>Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation and adventure alike. <br /><br />Nestled in a prime location, you'll have easy access to breathtaking landscapes and vibrant local culture. A truly exceptional stay awaits you.</p>
                      <div className="icon-button">
                        <a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="villa" role="tabpanel" aria-labelledby="villa-tab">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="info-table">
                        <ul>
                          <li>Total Flat Space <span>250 m2</span></li>
                          <li>Floor number <span>26th</span></li>
                          <li>Number of rooms <span>5</span></li>
                          <li>Parking Available <span>Yes</span></li>
                          <li>Payment Process <span>Bank</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <img src="assets/images/deal-02.jpg" alt="" />
                    </div>
                    <div className="col-lg-3">
                      <h4>Detail Info About New Villa</h4>
                      <p>Experience unparalleled comfort and luxury in this exclusive property. Thoughtfully designed with modern aesthetics and top-tier amenities, it offers the perfect setting for relaxation and adventure alike. <br /><br />Nestled in a prime location, you'll have easy access to breathtaking landscapes and vibrant local culture. A truly exceptional stay awaits you.</p>
                      <div className="icon-button">
                        <a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tab-pane fade" id="penthouse" role="tabpanel" aria-labelledby="penthouse-tab">
                  <div className="row">
                    <div className="col-lg-3">
                      <div className="info-table">
                        <ul>
                          <li>Total Flat Space <span>320 m2</span></li>
                          <li>Floor number <span>34th</span></li>
                          <li>Number of rooms <span>6</span></li>
                          <li>Parking Available <span>Yes</span></li>
                          <li>Payment Process <span>Bank</span></li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <img src="assets/images/deal-03.jpg" alt="" />
                    </div>
                    <div className="col-lg-3">
                      <h4>Extra Info About Penthouse</h4>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, do eiusmod tempor pack incididunt ut Kinfolk tonx seitan crucifix 3 wolf moon bicycle rights keffiyeh snackwave wolf same vice, chillwave vexillologistlabore et dolore magna aliqua quised ipsum suspendisse. <br /><br />Nestled in a prime location, you'll have easy access to breathtaking landscapes and vibrant local culture. A truly exceptional stay awaits you.</p>
                      <div className="icon-button">
                        <a href="#"><i className="fa fa-calendar"></i> Schedule a visit</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  
  
    </>
  );
};

export default Amenities;

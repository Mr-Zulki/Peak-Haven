const NearbyAttractions = () => {
  const attractions = [
    {
      id: 1,
      title: "Alpine Trail",
      description: "A scenic hiking trail that takes you through lush forests and opens up to a stunning view of the surrounding peaks.",
      distance: "2.5 miles away",
      image: "assets/images/property-01.jpg" // Reusing property image as placeholder
    },
    {
      id: 2,
      title: "Crystal Lake",
      description: "A crystal-clear alpine lake perfect for kayaking, fishing, or a peaceful afternoon picnic.",
      distance: "4.0 miles away",
      image: "assets/images/property-02.jpg"
    },
    {
      id: 3,
      title: "Mountain Hot Springs",
      description: "Natural geothermal springs where you can relax and soak in the mineral-rich waters.",
      distance: "12 miles away",
      image: "assets/images/property-03.jpg"
    }
  ];

  return (
    <>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <span className="breadcrumb"><a href="/">Home</a> / Attractions</span>
              <h3>Nearby Attractions</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="section properties">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center mb-5">
              <h2>Explore The Area</h2>
              <p>Discover the natural wonders and outdoor activities located just a short distance from our properties.</p>
            </div>
          </div>
          <div className="row">
            {attractions.map(attr => (
              <div className="col-lg-4 col-md-6 mb-4" key={attr.id}>
                <div className="item" style={{ backgroundColor: '#fff', borderRadius: '10px', padding: '30px', boxShadow: '0px 0px 15px rgba(0,0,0,0.05)', height: '100%' }}>
                  <img src={attr.image} alt={attr.title} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />
                  <h4>{attr.title}</h4>
                  <span style={{ color: '#f35525', fontWeight: 'bold', display: 'block', marginBottom: '15px' }}>{attr.distance}</span>
                  <p>{attr.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default NearbyAttractions;

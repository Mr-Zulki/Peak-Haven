import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSearch = () => {
  return (
    <>
      <div className="main-banner">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          slidesPerView={1}
          loop={true}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          className="owl-banner"
          style={{ height: '100vh', display: 'flex' }}
        >
          <SwiperSlide>
            <div className="item item-1">
              <div className="header-text">
                <span className="category">Toronto, <em>Canada</em></span>
                <h2>✈<br />Where are you going?</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item item-2">
              <div className="header-text">
                <span className="category">Melbourne, <em>Australia</em></span>
                <h2>Be Quick!<br />Discover Stays Near Epic Experiences</h2>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="item item-3">
              <div className="header-text">
                <span className="category">Namib Desert,<em>Namibia</em></span>
                <h2>Stay Wild!<br />Book Accommodations for Your Next Great Escape</h2>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </>
  );
};

export default HeroSearch;

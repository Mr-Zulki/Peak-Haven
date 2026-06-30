import { useEffect, useState, useRef } from 'react';

const AnimatedCounter = ({ target, duration = 1000 }: { target: number, duration?: number }) => {
  const [count, setCount] = useState(0);
  const startTimestamp = useRef<number | null>(null);

  useEffect(() => {
    let animationFrameId: number;
    const step = (timestamp: number) => {
      if (!startTimestamp.current) startTimestamp.current = timestamp;
      const progress = Math.min((timestamp - startTimestamp.current) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };
    animationFrameId = window.requestAnimationFrame(step);
    return () => window.cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <>{count}</>;
};

const InfoStats = () => {
  return (
    <>
      <div className="fun-facts">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="wrapper">
                <div className="row">
                  <div className="col-lg-4">
                    <div className="counter">
                      <h2 className="timer count-title count-number"><AnimatedCounter target={34} /></h2>
                       <p className="count-text ">Buildings<br />Finished Now</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="counter">
                      <h2 className="timer count-title count-number"><AnimatedCounter target={12} /></h2>
                      <p className="count-text ">Years<br />Experience</p>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="counter">
                      <h2 className="timer count-title count-number"><AnimatedCounter target={24} /></h2>
                      <p className="count-text ">Awwards<br />Won 2023</p>
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

export default InfoStats;

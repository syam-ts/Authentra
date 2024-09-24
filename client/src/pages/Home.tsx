import React from "react";

interface CardHomeProps {
  imgSrc: string;
  title: string;
  text: string;
}

const CardHome: React.FC<CardHomeProps> = ({ imgSrc, title, text }) => {
  return (
    <div className="card-home text-center m-5" style={{ width: "300px" }}>
      <img src={imgSrc} className="card-home-img-top" alt="..." />
      <div className="card-home-body">
        <p style={{ fontSize: "23px" }}>{title}</p>
        <p className="card-home-text">{text}</p>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <div className="px-4 py-12 max-w-full mx-auto ">


      <div className="body">
        <p
          className="text-center pt-2 didact-gothic-regular"
          style={{ fontSize: "34px" }}
        >
          Authentra Inc. is the hub for world's top architects and inventors, ready
          to turn your imagination into reality
          <br />
          All photographs provided for demo purposes only.
        </p>

        <div
          className="gap-12 flex ms-5 p-20"
        >
          <div >
            <img src="./public/images/img_1.jpg" alt='img' className="w-[400px] " />
            <h3>Residencial</h3>
            <span>
              From Manitoba to Brooklyn, affordable, comfortable and
              livable houses for families of all shapes and sizes are covered by
              us. Cras justo odio, dapibus, egestas eget quam lorem ipsum.
            </span>
          </div>
          <div>
            <img src="./public/images/img_2.jpg" alt='img' />
            <h3>Residencial</h3>
            <span>
              From Manitoba to Brooklyn, affordable, comfortable and
              livable houses for families of all shapes and sizes are covered by
              us. Cras justo odio, dapibus, egestas eget quam lorem ipsum.
            </span>
          </div>
          <div>
            <img src="./public/images/img_3.jpg" alt='img' />
            <h3>Residencial</h3>
            <span>
              From Manitoba to Brooklyn, affordable, comfortable and
              livable houses for families of all shapes and sizes are covered by
              us. Cras justo odio, dapibus, egestas eget quam lorem ipsum.
            </span>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default Home;

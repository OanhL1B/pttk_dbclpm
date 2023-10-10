import React from "react";
import { Link } from "react-router-dom";

const Title = () => {
  return (
    <div className="relative w-full h-full bg-white rounded-lg mt-[46px]">
      <div className="w-full bg-[#FFFFFF] text-[#000000] font-normal text-base p-2">
        <div className="w-full h-full pt-3 bg-white">
          <div className="flex flex-col items-center">
            <div className="flex items-center text-center">
              <div className="ml-24 ">ABOUT US</div>
              <div className="ml-24 ">ADDRESS</div>
              <div className="mx-24 ">
                <div>
                  <Link to="/">
                    <img
                      src="https://theme.hstatic.net/1000365849/1000614631/14/logo.png?v=144"
                      alt=""
                      width={150}
                    />
                  </Link>
                </div>
              </div>
              <div className="mr-24">BLOG</div>
              <div className="mr-24">MEMBERSHIP</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;

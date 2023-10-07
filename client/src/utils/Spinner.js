import React from "react";
import { Circles } from "react-loader-spinner";
const Spinner = ({ message, height, width, color, messageColor }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <Circles color={color} height={height} width={width} className="m-5" />
      <p style={{ color: messageColor }} className="px-2 text-lg text-center">
        {message}
      </p>
    </div>
  );
};

export default Spinner;

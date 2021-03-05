import React from "react";

const Currency = (props) => {
  const { value, name, click } = props;
  return (
    <div>
      <p>
        <img
          className="Cross"
          src="../img/cross.png"
          alt="cross"
          onClick={click}
          title="remove"
        />{" "}
        {value} {name}
      </p>
    </div>
  );
};

export default Currency;

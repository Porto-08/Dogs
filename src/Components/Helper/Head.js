import React from "react";

const Head = (props) => {
  React.useEffect(() => {
    document.title = `Dogs | ${props.title}`;
  }, [props]);

  return <></>;
};

export default Head;

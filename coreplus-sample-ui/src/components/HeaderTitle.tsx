import React from "react";

interface Props {
  title: string;
}
const HeaderTitle = ({ title }: Props) => {
  return (
    <h3 className="text-xl font-bold text-blue-600 text-center">{title}</h3>
  );
};

export default HeaderTitle;

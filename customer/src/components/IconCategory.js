import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions";

const IconCategory = ({ onCategoryFilter }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.customer.allCategory);

  const handleCategoryClick = (event) => {
    const categoryId = event.target.getAttribute("data-categoryid");
    onCategoryFilter(categoryId);
  };
  return (
    <div className="flex items-center justify-center w-full h-full mt-2 mb-3 border-t-2 border-b-2">
      <div className="flex px-10 border-l-[1px] border-r-[1px] ">
        <img
          src="https://theme.hstatic.net/1000365849/1000614631/14/viden.svg?v=144"
          alt=""
          width={86}
          height={60}
          data-categoryid={categories[0]?.id}
          onClick={(e) => handleCategoryClick(e)}
        />
      </div>

      <div className="flex px-10 border-r-[1px]">
        <img
          src="https://theme.hstatic.net/1000365849/1000614631/14/tuicheoden.svg?v=144"
          alt=""
          width={120}
          height={60}
          data-categoryid={categories[1]?.id}
          onClick={(e) => handleCategoryClick(e)}
        />
      </div>
    </div>
  );
};

export default IconCategory;

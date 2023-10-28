import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../redux/actions";
import { useNavigate } from "react-router";

const IconCategory = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.customer.allCategory);

  const handleCategoryClick = (event) => {
    const categoryId = event.target.getAttribute("data-categoryid");
    setSelectedCategory(categoryId);
    navigate(`/collections/${categoryId}`);
  };

  return (
    <div className="flex items-center justify-center w-full h-full mt-4 mb-1 border-t-2 border-b-2">
      <div className="flex px-10 border-l-2">
        <img
          alt=""
          width={86}
          height={60}
          data-categoryid={categories[0]?.id}
          onClick={(e) => handleCategoryClick(e)}
          src={
            selectedCategory === categories[0]?.id
              ? "https://theme.hstatic.net/1000365849/1000614631/14/vido.svg?v=178"
              : "https://theme.hstatic.net/1000365849/1000614631/14/viden.svg?v=144"
          }
        />
      </div>

      <div className="flex px-10 border-l-2 border-r-2">
        <img
          src={
            selectedCategory === categories[1]?.id
              ? "https://theme.hstatic.net/1000365849/1000614631/14/tuicheodo.svg?v=178"
              : "https://theme.hstatic.net/1000365849/1000614631/14/tuicheoden.svg?v=144"
          }
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

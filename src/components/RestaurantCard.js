import React from "react";

const RestaurantCard = ({ restaurant }) => {
  let sum = 0;
  restaurant.grades.forEach((element) => {
    sum += element.score;
  });
  const average = Math.round(sum / restaurant.grades.length);
  return (
    <div>
      <h1>
        {restaurant.name}
        <p>{average}</p>
      </h1>
    </div>
  );
};

export default RestaurantCard;

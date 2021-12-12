// Home page will show a list of restaurants fetched from MongoDB Realm and stored in state
import RestaurantCard from "../components/RestaurantCard";
import Loading from "../components/Loading";
import * as Realm from "realm-web";
import { useState, useEffect } from "react";

const Home = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const REALM_APP_ID = process.env.REACT_APP_REALM_APP_ID;
    const app = new Realm.App({ id: REALM_APP_ID });
    async function getData() {
      try {
        const user = await app.logIn(Realm.Credentials.anonymous());
        const client = app.currentUser.mongoClient("mongodb-atlas");
        const rests = client.db("sample_restaurants").collection("restaurants");
        setRestaurants((await rests.find()).slice(0, 10));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (loading) {
      getData();
    }
  }, [loading]);

  return (
    <div>
      <h1>Home Page</h1>
      {loading && (
        <div>
          <Loading />
        </div>
      )}
      {restaurants.map((restaurant) => (
        <RestaurantCard key={restaurant._id} restaurant={restaurant} />
      ))}
    </div>
  );
};

export default Home;

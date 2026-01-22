import Categories from "../components/Categories";
import Hero from "../components/Hero";
import MenuComponent from "../components/MenuComponent";
import NewsLetter from "../components/NewsLetter";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <MenuComponent/>
      <NewsLetter/>
    </div>
  );
};
export default Home;

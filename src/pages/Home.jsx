import Categories from "../components/Categories";
import Hero from "../components/Hero";
import MenuComponent from "../components/MenuComponent";
import NewsLetter from "../components/NewsLetter";
import Testimonial from "../components/Testimonial";

const Home = () => {
  return (
    <div>
      <Hero />
      <Categories />
      <MenuComponent/>
      <NewsLetter/>
      <Testimonial/>
    </div>
  );
};
export default Home;

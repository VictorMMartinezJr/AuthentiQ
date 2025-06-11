import Header from "../components/Header";
import MenuBar from "../components/Menubar";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-content-center min-vh-100">
      <MenuBar />
      <Header />
    </div>
  );
};

export default Home;

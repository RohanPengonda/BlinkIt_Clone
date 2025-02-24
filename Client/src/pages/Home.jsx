import banner from "../assets/banner.jpg";
const Home = () => {
  return (
    <section>
      <div className="container mx-auto my-4">
        <div
          className={`h-full w-full min-h-full bg-blue-100 rounded ${
            !banner && "animate-pulse"
          } `}
        >
          <img src={banner} alt="" className="w-full h-full" />
        </div>
        <div className="bg-blue-500 w-full h-full">sdmfn</div>
      </div>
    </section>
  );
};

export default Home;

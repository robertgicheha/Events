import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="hero h-[90vh] w-full">
      <div className="container mx-auto px-4 py-16 ">
        <div className="flex flex-col mt-24 gap-9">
          <div className="text-5xl ml-28 text-indigo-500 ">
            <span className="hover:text-rose-400 tracking-wider">Plan.</span>
          </div>
          <div className="text-5xl ml-48 text-indigo-500 ">
            <span className="hover:text-rose-400 tracking-wider">Engage.</span>
          </div>
          <div className="text-5xl ml-72 text-indigo-500 ">
            <span className="hover:text-rose-400 tracking-wider">
              Make Memories.
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Link to="/events">
              <button className="hover:bg-rose-400  py-4 px-6 text-2xl rounded-xl bg-indigo-500 hover:text-indigo-100 transition duration-300 tracking-wider">
                Explore Events
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;

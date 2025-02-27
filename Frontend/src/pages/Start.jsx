import { Link } from "react-router-dom";

const Start = () => {
  return (
    <div
      className="flex justify-between flex-col pt-5 h-screen w-full
        bg-[url(https://images.unsplash.com/photo-1527603815363-e79385e0747e?q=80&w=1576&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] bg-cover bg-center"
    >
      <img
        className="w-18 ml-8"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber logo"
      />
      <div className="bg-white pb-7 py-4 px-4 rounded-t-3xl">
        <h2 className="flex items-center justify-center text-3xl font-bold">Get Started with Uber</h2>
        <Link to='/login' className="flex items-center justify-center w-full bg-black text-white py-3 rounded-full mt-5">
          Continue
        </Link>
      </div>
    </div>
  );
};

export default Start;

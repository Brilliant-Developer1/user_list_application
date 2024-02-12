import './LoadingScreen.css';

const LoadingScreen = () => {
  return (
    <div className=" bg-blur flex-col text-black flex justify-center items-center h-screen w-screen">
      <div className="loader"></div>
      <p className="p-5">Wait!</p>
    </div>
  );
};

export default LoadingScreen;

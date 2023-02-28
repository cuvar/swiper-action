import SwiperAction from "swiper-action";

function App() {
  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 flex flex-col space-y-2">
        <SwiperAction>
          <div className="bg-white rounded-lg py-3 px-2">First Item</div>
        </SwiperAction>
        <SwiperAction>
          <div className="bg-white rounded-lg py-3 px-2">Second Item</div>
        </SwiperAction>
        <SwiperAction>
          <div className="bg-white rounded-lg py-3 px-2">Third Item</div>
        </SwiperAction>
      </div>
    </div>
  );
}

export default App;

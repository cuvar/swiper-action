import SwiperAction from "swiper-action";

function App() {
  const actions = (
    <>
      <button className="action debug" onClick={(e) => console.log("action 1")}>
        Action 1
      </button>
      <button className="action debug" onClick={(e) => console.log("action 2")}>
        Action 2
      </button>
    </>
  );
  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 flex flex-col space-y-2">
        <SwiperAction actions={actions}>
          <div className="bg-white flex items-center rounded-lg py-3 px-2">
            First Item
          </div>
        </SwiperAction>
        {/* <SwiperAction actions={actions}>
          <div className="bg-white rounded-lg py-3 px-2">Second Item</div>
        </SwiperAction>
        <SwiperAction actions={actions}>
          <div className="bg-white rounded-lg py-3 px-2">Third Item</div>
        </SwiperAction> */}
      </div>
    </div>
  );
}

export default App;

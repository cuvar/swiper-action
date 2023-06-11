import { SwiperAction, Action } from "swiper-action";

function App() {
  const actions = [
    <Action key={1} action={() => console.log("action 1")}>
      <div className="bg-red-500">Action 1</div>
    </Action>,
    <Action key={2} action={() => console.log("action 2")}>
      <div className="bg-yellow-500">Action 2</div>
    </Action>,
  ];

  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 h-24 flex flex-col space-y-2">
        <SwiperAction actions={actions}>
          <div className="w-full h-10 bg-white flex">First Item</div>
        </SwiperAction>
      </div>
    </div>
  );
}

export default App;

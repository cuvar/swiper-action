import SwiperAction, { Action } from "swiper-action";

function App() {
  const actions = (
    <>
      <Action action={() => console.log("action 1")}>Action 1</Action>
      <Action action={() => console.log("action 2")}>Action 2</Action>
    </>
  );
  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 flex flex-col space-y-2">
        <SwiperAction actions={actions}>
          <div className="w-full h-full bg-white">First Item</div>
        </SwiperAction>
      </div>
    </div>
  );
}

export default App;

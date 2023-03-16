import SwiperAction, { Action } from "swiper-action";

function App() {
  const actions = (
    <>
      <Action action={() => console.log("action 1")}>
        {/* <div className="bg-red-500">Action 1</div> */}
        Action 1
      </Action>
      <Action action={() => console.log("action 2")}>
        {/* <div className="bg-yellow-500">Action 2</div> */}
        Action 2
      </Action>
      {/* <Action action={() => console.log("action 3")}>
        <div className="bg-blue-500">Action 3</div>
      </Action>
      <Action action={() => console.log("action 4")}>
        <div className="bg-green-500">Action 4</div>
      </Action> */}
    </>
  );

  console.log(actions.props.children.length);
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

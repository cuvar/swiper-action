import {
  SwiperAction,
  Action,
  ActionProps,
  InteractionEvent,
} from "swiper-action";

function App() {
  function handleAction(ev: InteractionEvent, args: any) {
    console.log("action 1");
    console.log(args);
  }

  const actions: React.ReactElement<ActionProps>[] = [
    <Action key={1} action={handleAction} args={"hello world"}>
      <div className="bg-red-500 h-full flex justify-center items-center">
        Action 1
      </div>
    </Action>,
    <Action key={2} action={() => console.log("action 2")}>
      <div className="bg-yellow-500 h-full">Action 2</div>
    </Action>,
  ];

  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 flex flex-col space-y-2">
        <SwiperAction actions={actions}>
          <div className="w-full h-10 bg-white flex">First Item</div>
        </SwiperAction>
      </div>
    </div>
  );
}

export default App;

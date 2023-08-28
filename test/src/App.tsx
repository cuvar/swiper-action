import {
  SwiperAction,
  ActionData,
  InteractionEvent,
  ResetEvent,
} from "swiper-action";

function App() {
  function handleAction(ev: InteractionEvent, args: string) {
    console.log("calling from action 1");
    console.log(args);
  }

  function handleSwipe(ev: InteractionEvent) {
    console.log("swiping");
    console.log(ev);
  }

  function handleSwipeEnd(ev: InteractionEvent) {
    console.log("end swiping");
    console.log(ev);
  }

  function handleSwipeStart(ev: InteractionEvent) {
    console.log("start swiping");
    console.log(ev);
  }

  function handleResetStart(ev: ResetEvent) {
    console.log("start reset");
    console.log(ev);
  }

  function handleResetEnd(ev: ResetEvent) {
    console.log("end reset");
    console.log(ev);
  }

  const actionData: ActionData[] = [
    {
      children: (
        <div className="bg-red-500 h-full flex justify-center items-center">
          Action 1
        </div>
      ),
      action: handleAction,
      args: 2,
    },
    {
      children: <div className="bg-yellow-500 h-full">Action 2</div>,
      action: handleAction,
      args: 3,
    },
  ];

  return (
    <div className="w-screen h-screen bg-sky-700 flex justify-center items-center">
      <div className="w-1/2 flex flex-col space-y-2">
        <SwiperAction
          actions={actionData}
          onSwipe={handleSwipe}
          onSwipeEnd={handleSwipeEnd}
          onSwipeStart={handleSwipeStart}
          onResetStart={handleResetStart}
          onResetEnd={handleResetEnd}
        >
          <div className="w-full h-10 bg-white flex">First Item</div>
        </SwiperAction>
      </div>
    </div>
  );
}

export default App;

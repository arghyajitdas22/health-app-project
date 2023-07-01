import * as React from "react";
import SendIcon from "./SendIcon";

interface IChatSecProps {}

const ChatSec: React.FunctionComponent<IChatSecProps> = (props) => {
  return (
    <>
      <div className="w-full max-w-[80%] mx-auto border border-[#dadada] min-h-[430px] max-h-[430px] rounded-[15px] overflow-y-auto mt-8"></div>
      <div className="fixed bottom-[30px] px-40 flex items-center w-full gap-2">
        <input
          type="text"
          className="border border-black focus:border-blue-500 focus:ring-blue-500 focus:outline-none rounded-[100px] min-h-[40px] h-auto w-full px-6"
          placeholder="Tell us your symptoms"
        />
        <SendIcon />
      </div>
    </>
  );
};

export default ChatSec;

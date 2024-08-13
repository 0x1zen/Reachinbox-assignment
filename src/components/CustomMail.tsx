import axios from "axios"; // Importing axios for making HTTP requests
import { useState } from "react"; // Importing useState to manage component state
import { BsLightningChargeFill } from "react-icons/bs"; // Importing icons from react-icons
import {
  FaCaretDown,
  FaEye,
  FaImage,
  FaRegSmile,
  FaUserMinus,
} from "react-icons/fa";
import { IoMdCode } from "react-icons/io";
import { IoLinkSharp } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { TbSquareLetterA } from "react-icons/tb";

function CustomMail({ threadId, onClose }: any) {
  // useState hook to manage the reply data
  const [replyData, setReplyData] = useState({
    to: "",
    from: "",
    subject: "",
    body: "",
  });

  // Function to handle sending the reply
  const handleSendReply = async () => {
    const token = localStorage.getItem("token"); // Get the token from local storage
    try {
      // Make a POST request to send the reply
      await axios.post(
        `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${threadId}`,
        {
          to: replyData.to,
          from: replyData.from,
          subject: replyData.subject,
          body: replyData.body,
        },
        {
          headers: {
            Authorization: token, // Add the token to the request headers
          },
        }
      );
    } catch {
      console.log("Reply sent successfully");
      onClose(); // Close the CustomMail component when done
    }
  };

  // Function to handle changes in input fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the reply data
    }));
  };

  // Function to handle changes in the textarea
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReplyData((prevData) => ({
      ...prevData,
      [name]: value, // Update the specific field in the reply data
    }));
  };

  // The return statement defines the UI of the CustomMail component
  return (
    <div className="bg-gray-400/25 fixed top-0 left-0 flex justify-center items-center h-full w-full z-20">
      <div className="bg-[#141517] w-1/2 h-4/5 rounded-lg border border-[#41464B]">
        {/* Header section with a close button */}
        <div className="flex justify-between items-center px-4 bg-[#23272C] rounded-t-lg py-2 border-b border-[#41464B]">
          <div className="pl-4 text-sm">Reply</div>
          <div onClick={onClose}>
            <RxCross2 className="text-xl cursor-pointer" /> {/* Close icon */}
          </div>
        </div>

        {/* Input fields for the "To" email address */}
        <div className="flex text-sm py-2 border-b border-[#41464B] pl-8">
          <div className="text-[#BAB9BD]">To :</div>
          <input
            className="bg-transparent ml-4"
            placeholder="Recipient's Email"
            name="to"
            value={replyData.to}
            onChange={handleInputChange} // Call handleInputChange when the input changes
          />
        </div>

        {/* Input fields for the "From" email address */}
        <div className="flex text-sm py-2 border-b border-[#41464B] pl-8">
          <div className="text-[#BAB9BD]">From :</div>
          <input
            className="bg-transparent ml-4"
            placeholder="Your Email"
            name="from"
            value={replyData.from}
            onChange={handleInputChange} // Call handleInputChange when the input changes
          />
        </div>

        {/* Input field for the email subject */}
        <div className="flex text-sm py-2 border-b border-[#41464B] pl-8">
          <div className="text-[#BAB9BD]">Subject :</div>
          <input
            className="bg-transparent ml-4"
            placeholder="Subject"
            name="subject"
            value={replyData.subject}
            onChange={handleInputChange} // Call handleInputChange when the input changes
          />
        </div>

        {/* Textarea for the email body */}
        <div className="flex text-sm py-2 border-b border-[#41464B] px-4 pr-8 pt-8 h-2/3">
          <textarea
            className="bg-transparent ml-4 w-full h-full"
            placeholder="Message Body"
            name="body"
            value={replyData.body}
            onChange={handleTextAreaChange} // Call handleTextAreaChange when the textarea changes
          />
        </div>

        {/* Footer section with send button and additional icons */}
        <div className="flex space-x-8 items-center h-16 ml-8">
          <div
            className="bg-gradient-to-r from-[#4B63DD] to-[#0524BFFC] px-5 py-2 rounded-md flex items-center cursor-pointer"
            onClick={handleSendReply} // Call handleSendReply when the send button is clicked
          >
            Send <FaCaretDown className="ml-4" /> {/* Send button with icon */}
          </div>

          {/* Additional icons for Variables, Preview Email, and other features */}
          <div className="flex items-center text-[#ADADAD]">
            <BsLightningChargeFill className="mr-3" />
            Variables
          </div>
          <div className="flex items-center text-[#ADADAD]">
            <FaEye className="mr-3" />
            Preview Email
          </div>
          <div className="flex space-x-3 text-xl text-[#ADADAD]">
            <div>
              <TbSquareLetterA />
            </div>
            <div>
              <IoLinkSharp />
            </div>
            <div>
              <FaImage />
            </div>
            <div>
              <FaRegSmile />
            </div>
            <div>
              <FaUserMinus />
            </div>
            <div>
              <IoMdCode />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomMail;

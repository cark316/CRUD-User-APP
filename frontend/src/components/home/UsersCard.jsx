import { Link } from "react-router-dom";
import { PiBookOpenTextLight } from "react-icons/pi";
import { BiUser, BiUserCircle } from "react-icons/bi";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfo, BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import UsersSingleCard from "./UsersSingleCard";

const UsersCard = ({ users }) => {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {users.map((item) => (
        <UsersSingleCard key={item._id} user={item} />
      ))}
    </div>
  );
};

export default UsersCard;

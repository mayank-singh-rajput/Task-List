import { useState } from "react";
import { Link } from "react-router-dom";

function Name() {
  const [Name, setName] = useState("");

  return (
    <div className="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif text-center">
      <h1 className="text-6xl font-bold">Personal Task List</h1>

      <div className="flex items-center justify-center h-screen">
        <div className="box-border border-4 border-slate-500 p-8 bg-slate-200 rounded-3xl">
        <div>
          <label className="text-2xl font-bold"> Name: </label>
          <input
            className="w-80 pt-2 pb-2 pl-5 pr-5 m-5 box-border border-4 border-red-500 rounded-full"
            type="text"
            name="Name"
            required
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>

        <button
          className="w-80 box-border border-4 px-5 border-gray-400 rounded-full object-cover text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
         >
          <Link to="/task" state={{ Name: Name }} style={{ textDecoration: 'none' }} > Submit </Link>
        </button>
        </div>
        </div>
    </div>
  );
}

export default Name;
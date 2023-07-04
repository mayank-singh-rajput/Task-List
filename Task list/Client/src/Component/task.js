import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation } from "react-router-dom";
import Popup from "reactjs-popup";

function List() {
  const [Name, setName] = useState("");
  const [Title, setTilte] = useState("");
  const [Description, setDescription] = useState("");
  const [Status, setStatus] = useState("");
  const [Tasklist, setTasklist] = useState([]);

  const [NewDescription, setNewDescription] = useState("");

  const location = useLocation();

  useEffect(() => {
    setName(location.state.Name);
  }, [location]);

  useEffect(() => {
    Axios.get(`http://localhost:4000/api/select/${location.state.Name}`).then(
      (response) => setTasklist(response.data)
    );
  });

  const AddTask = async () => {
    Axios.post("http://localhost:4000/api/insert", {
      Name: Name,
      Title: Title,
      Description: Description,
      Status: Status,
    }).then(() => {
  
    });

    setTasklist([
      ...Tasklist,
      {
        Name: Name,
        Title: Title,
        Description: Description,
        Status: Status,
      },
    ]);
  };

  const DeleteData = async (Name, Title) => {
    Axios.delete(`http://localhost:4000/api/delete/${Name}/${Title}`);
  };

  const UpdateList = async (Name, Title) => {
    Axios.put("http://localhost:4000/api/update", {
      Name: Name,
      Title: Title,
      Description: NewDescription,
    });
    setNewDescription("");
  };

  const UpdateStatus = async (Name, Title) => {
    Axios.put("http://localhost:4000/api/update/Status", {
      Name: Name,
      Title: Title,
      Status: "Done",
    });
    setStatus("");
  };

  const UpdateState = async (Name, Title) => {
    Axios.put("http://localhost:4000/api/update/State", {
      Name: Name,
      Title: Title,
      Status: "",
    });
    setStatus("");
  };

  return (
    <div className="'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif text-center">
      <h1 className="text-6xl font-bold">Personal Task List</h1>

      <div className="absolute top-4 right-4 w-fit pr-8 pl-8 pt-4 pb-4 text-xl font-bold bg-lime-500 border-4 border-slate-500">
        {" "}
        {Name}{" "}
      </div>

      <div className="flex items-center justify-center w-screen">
        <div className="w-fit mt-20 border-4 p-5 border-gray-500 bg-slate-200 rounded-3xl">
          <div>
            <label className="text-2xl font-bold"> Title: </label>
            <input
              className="w-[50%] pt-2 pb-2 pl-5 pr-5 m-5 border-4 border-slate-500 rounded-full"
              type="text"
              name="Tilte"
              required
              onChange={(e) => {
                setTilte(e.target.value);
              }}
            />
          </div>

          <div>
            <label className="text-2xl font-bold"> Description: </label>
            <input
              className="w-[40%] pt-2 pb-2 pl-5 pr-5 m-5 border-4 border-slate-500 rounded-full"
              type="text"
              name="Description"
              required
              onChange={(e) => {
                setDescription(e.target.value);
              }}
            />
          </div>

          <button
            className="w-[50%] border-4 px-5 border-gray-400 rounded-full text-2xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
            onClick={AddTask}
          >
            {" "}
            Add..{" "}
          </button>
        </div>
      </div>

      <div className="flex flex-col m-[10%]">
        <table className="table-fixed border-4 border-separate border-spacing-4 border-slate-500 rounded-3xl">
          <thead>
            <tr>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                No.{" "}
              </th>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                Task{" "}
              </th>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                Description{" "}
              </th>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                Status{" "}
              </th>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                Delete{" "}
              </th>
              <th className="border-2 border-slate-600 bg-slate-200 m-2 pt-2 pb-2 pr-8 pl-8 rounded-xl">
                {" "}
                Update{" "}
              </th>
            </tr>
          </thead>
          <tbody>
            {Tasklist.map((val, inx) => {
              return (
                <tr key={inx}>
                  <td> {inx + 1} </td>
                  <td> {val.Title} </td>
                  <td>
                    {" "}
                    {val.Description} <b className="text-xl"> {val.Status} </b>{" "}
                  </td>
                  <td>
                    {" "}
                    <div>
                      <input
                        className="h-6 w-6 box-border border-4 border-slate-500"
                        type="checkbox"
                        name="Status"
                        checked={val.Status}
                        hidden={val.Status}
                        onChange={() => {
                          UpdateStatus(val.Name, val.Title);
                        }}
                      />{" "}
                      <button
                        className="h-fit w-fit pl-2 pr-2 border-2 rounded-md text-2xl font-bold text-white transition ease-in-out bg-slate-600 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-500"
                        onClick={() => {
                          UpdateState(val.Name, val.Title);
                        }}
                        hidden={!val.Status}
                      >
                        {" "}
                        ✔{" "}
                      </button>
                    </div>{" "}
                  </td>
                  <td>
                    <button
                      className="w-fit pl-4 pr-4 box-border border-2 border-gray-400 rounded-full text-xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-red-600 duration-500"
                      onClick={() => {
                        DeleteData(val.Name, val.Title);
                      }}
                    >
                      Delete
                    </button>
                  </td>

                  <td>
                    <Popup
                      trigger={
                        <button className="w-fit pl-4 pr-4 box-border border-2 border-gray-400 rounded-full text-xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500">
                          Update
                        </button>
                      }
                    >
                      <div className="flex flex-row justify-center items-center border-4 m-2 p-5 rounded-full border-gray-500 bg-gray-200">
                        <div className="pr-5">
                          <label>Description: </label>
                          <input
                            type="text"
                            name="Description"
                            onChange={(e) => setNewDescription(e.target.value)}
                          />
                        </div>

                        <button
                          className="w-fit pl-4 pr-4 box-border border-2 border-gray-400 rounded-full object-cover text-xl font-bold transition ease-in-out bg-lime-500 hover:-translate-y-1 hover:scale-110 hover:bg-green-500 duration-500"
                          onClick={() => {
                            UpdateList(val.Name, val.Title);
                          }}
                        >
                          Update
                        </button>
                      </div>
                    </Popup>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default List;

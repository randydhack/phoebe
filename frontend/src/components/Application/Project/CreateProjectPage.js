import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react'
import { createProjectThunk } from "../../../store/projects";
import { Redirect, useHistory} from 'react-router-dom'


function CreateProjectPage() {
  const dispatch = useDispatch();
  const history = useHistory()

  const userSession = useSelector((state) => state.session.user);

  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [description, setDescription] = useState('')
  if (!userSession) return <Redirect to='/login'/>

  const handleSubmit = async (e) => {
    e.preventDefault()
    const project = await dispatch(createProjectThunk(name, type, description, null))
    return history.push(`/project/${project.id}/overview`)
  };

  return (
    <div className="bg-white w-screen h-screen">
      <div className="bg-[#d9d9d9] h-full w-[650px]">
        <div className="w-[64px] flex">
          <div onClick={() => history.goBack()}>return back to prev page</div>
          <div>exit</div>
        </div>
        <div>
          <div className="w-full">
            <h1 className="text-[30px] font-medium">New project</h1>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Project Name</label>
                <input type="text" className="outline-0 border-none" value={name} onChange={e => setName(e.target.value)}/>
              </div>
              <div>
                <label>Type of Project</label>
                <input type="text" className="outline-0 border-none" value={type} onChange={e => setType(e.target.value)}/>
              </div>
              <div>
                <label>Description of the project</label>
                <textarea className="outline-0 border-none" value={description} onChange={e => setDescription(e.target.value)}/>
              </div>
              <div>
                <img src={null} />
              </div>

              <button type="submit">submit</button>
            </form>
          </div>

          <div>
            PHOTOS OF  PROJECT
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateProjectPage;

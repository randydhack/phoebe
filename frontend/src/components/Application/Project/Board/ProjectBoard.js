import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getProjectSectionsThunk } from '../../../../store/sections'


function ProjectBoard() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const project = useSelector(state => state.projects)[id]

    const [sections, setSections] = useState({})


    useEffect(() => {
        (async () => {
            const data = await dispatch(getProjectSectionsThunk(id))
            setSections(data)
        })()
    }, [])

    console.log(sections, project)

    return (
        <div className='p-[20px] h-full'>
            {sections.map((section, i) => {
                return (
                    <div key={i} className='bg-gray-500 h-full w-[200px]'>

                    </div>
                )
            })}
        </div>
    )
}

export default ProjectBoard

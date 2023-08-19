import moment from 'moment';
import HomeProjectBox from './HomeProjectBox';
import './AppHome.css'

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userProjectsThunk } from '../../../store/projects';

function AppHome() {

    const dispatch = useDispatch()
    const projects = Object.values(useSelector(state => state.projects))

    useEffect(() => {
        dispatch(userProjectsThunk())
    }, [])


    return (
        <div className="w-full px-[32px] bg-gradient-to-t from-[#1E1F21] from-50% to-gray background-gradient">
            <div className="my-[20px]">
                <h1 className="font-bold text-[20px] text-white">Home</h1>
            </div>
            <div className="flex items-center flex-col mb-[20px]">
                <div className='font-semibold text-white'>{moment().format('dddd, MMMM Do')}</div>
                <h2 className="text-[32px] font-semibold text-white">Welcome Home, Randy</h2>
                <p className="text-white">You have some work to do!</p>
                <div className="flex bg-[#252628] px-[30px] py-[15px] rounded-[20px] mt-[15px] text-white">
                    <p className="">{projects.length} Project</p>
                    <p className="ml-[20px]">100 task incompleted</p>
                </div>
            </div>

            <div className="flex justify-center">
                <HomeProjectBox projects={projects}/>
                <div className="w-[550px] bg-[#2A2B2D] m-[5px] rounded-[10px] max-h-[350px] h-[350px] border-[1px] border-[#424244]">
                    <div className='m-[20px] text-white'>
                        sdsadasd
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHome

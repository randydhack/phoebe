import moment from 'moment';
import HomeProjectBox from './HomeProjectBox';

function AppHome() {
    return (
        <div className="bg-white w-full px-[32px] overflow-scroll">
            <div className="my-[20px]">
                <h1 className="font-bold text-[20px]">Home</h1>
            </div>
            <div className="flex items-center flex-col mb-[20px]">
                <div className='font-semibold'>{moment().format('dddd, MMMM Do')}</div>
                <h2 className="text-[32px] font-semibold">Welcome Home, Randy</h2>
                <p>You have some work to do!</p>
                <div className="flex bg-[#d9d9d9] px-[30px] py-[15px] rounded-[20px] mt-[15px]">
                    <p className="">1 Project</p>
                    <p className="ml-[20px]">100 task incompleted</p>
                </div>
            </div>

            <div className="flex justify-center">
                <HomeProjectBox />
                <div className="w-[600px] bg-gray-400 m-[5px] rounded-[10px] max-h-[350px] h-[350px]">
                    <div className='m-[20px]'>
                        sdsadasd
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppHome

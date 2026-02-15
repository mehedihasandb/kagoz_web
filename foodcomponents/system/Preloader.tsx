"use client";

const Preloader = (theme:any) => {

    return (
        <main>
            <div className="fixed inset-0 w-full h-full bg-white flex justify-center items-center z-[9999]">
                {/* <div
                    className="border-[5px] border-blue-100 border-t-blue-600 rounded-full w-12 h-12 animate-spinCustom">
                </div> */}
                <div className="border-[10px] border-gray-300 border-t-black border-r-gray-700 border-b-gray-400 rounded-full w-24 h-24 animate-spinCustom">
                </div>
            </div>
        </main>
    );
};

export default Preloader;

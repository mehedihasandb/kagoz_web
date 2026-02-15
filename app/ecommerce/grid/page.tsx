const Grid = (theme:any) => {

    return (
        <div>
           <div className="grid grid-cols-4 text-red-400">
            <div className="bg-black col-span-1">1</div>
            <div className="bg-green-500 col-span-3">2</div>
            {/* <div className="bg-blue-600">3</div> */}
            {/* <div className="bg-green-500">2</div>
            <div className="bg-blue-600">3</div> */}
           </div>
        </div>
    );
};

export default Grid;
import Button from "./Button";

function App() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-5xl mb-20 font-bold">Select Your Age Group</h2>

            {/* First Div */}
            <div className="border-2 rounded-lg p-6 w-full max-w-6xl flex items-center justify-between mb-6">
                <img
                    src="/Images/8th_class.jpeg"
                    alt="Graduate"
                    style={{ width: "300px", height: "225px" }}
                    className="rounded-2xl mr-4"
                />
                <div className="m-6 flex-1 text-lg">
                    <p className="font-bold">
                        Students in Class 8-10 (Age 13 -15)
                    </p>
                    <p>
                        Decide the stream of your choice and plan the next steps
                        for your dream career.
                    </p>
                </div>
                <Button display="Select" type="normal" extra="m-4" />
            </div>

            {/* Second Div */}
            <div className="border-2 rounded-lg p-6 w-full max-w-6xl flex items-center justify-between mb-6">
                <img
                    src="/Images/12th_class.jpeg"
                    alt="Graduate"
                    style={{ width: "300px", height: "225px" }}
                    className="rounded-2xl mr-4"
                />
                <div className="m-6 flex-1 text-lg">
                    <p className="font-bold">
                        Students in Class 11-12 (Age 16 -18)
                    </p>
                    <p>
                        Decide the stream of your choice and plan the next steps
                        for your dream career.
                    </p>
                </div>
                <Button display="Select" type="normal" extra="m-4" />
            </div>
        </div>
    );
}

export default App;

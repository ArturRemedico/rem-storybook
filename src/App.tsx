import Notes from "./Notes"
import { Toaster } from "sonner"

function App() {
    return (
        <div style={{ width: "800px", margin: "50px auto" }}>
            <Notes
                title={"Notes"}
                placeholder={"placeholder"}
                name="notes"
                appId="228"
                startText={"<p></p>"}
                status={""}
                emplId={"1233"}
                inpWrapSubStyle={{ padding: "6px 11px", minHeight: "100px" }}
            />
            <Toaster />
        </div>
    )
}

export default App

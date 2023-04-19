import Card from "../components/shared/Card"
import { Link } from "react-router-dom"

function Aboutpage() {
  return (
    <Card>
      <div className="about">
        <h1>About this project</h1>
        <p>This is a React app to give feedback for a product or a service</p>
        <p>Version: 1.0.0</p>

        <p>
            <Link to="/">Back to Home</Link>
        </p>
      </div>
    </Card>
  )
}

export default Aboutpage

import './styles/Objective.css'

function Objective(props) {
    return (
        <label className="Objective">
            {props.children}
            <input type="checkbox"/>
        </label>
    )
}
export default Objective
function Objective(props) {
    return (
        <label className="Objective Glint">
            {props.children}
            <input type="checkbox"/>
        </label>
    )
}
export default Objective
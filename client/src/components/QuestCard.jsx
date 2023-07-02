
function QuestCard(props) {

    return (
      <div className="QuestCard Glint">
        <header>{props.title}</header>
        <footer>{props.children}</footer>
      </div>
    );
  }
  
  export default QuestCard
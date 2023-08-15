
function QuestCard(props) {

    return (
      <div className="QuestCard Interactable">
        <header>{props.title}</header>
        <footer>{props.children}</footer>
        <div className="statusButtons complete">✓</div>
        <div className="statusButtons defeat">✕</div>
        <div className="statusButtons delete">🗑</div>
      </div>
    );
  }
  
  export default QuestCard
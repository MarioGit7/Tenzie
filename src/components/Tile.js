export default function Tile(props){
    
    const styles = {
        backgroundColor: props.locked ? "#00A763" : "#FAFAFA"
    }

    return (
        <button 
            key={props.id} 
            id={props.id} 
            locked={props.locked} 
            className="tile"
            style={styles}
            disabled={props.disabled}
            onClick={() => props.toggle(props.id)}
            >{props.num}</button>
    )
}
export default function Modal(props){

    return(
        <div className="modal-con">
            <h4>You won!</h4>
            <button onClick={props.toggle} className="reroll-btn">Close</button>
        </div>
    )
}
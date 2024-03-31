const Message = (props) => {

    return(<div dangerouslySetInnerHTML={{ __html: props.target }} />)

}


export default Message
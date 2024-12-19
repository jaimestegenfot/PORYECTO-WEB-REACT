/* eslint-disable react/prop-types */
const ColorCircle = ({color = "ffffff"}) => {
    if(!color){
        return <div>No tiene Color</div>
    }
    return (
        <div>
            <div 
            style={{
                backgroundColor: color,
                width: "30px",
                height: "30px",
                borderRadius: "50%"
            }}>
            </div>
        </div>
    )
}

export default ColorCircle 
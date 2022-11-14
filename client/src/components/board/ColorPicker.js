import React, {useState} from 'react';

export const ColorPicker = ({parentCallback}) => {
    //const [color, setColor] = useState("#e66465");

   /* const handleChange = event => {
        console.log(event.target.value);
        setColor(event.target.value);
        parentCallback(color);
    }*/

    return (
    <div>
        <input type="color" id="head" name="head"
         onChange={parentCallback}/>
        <label>My Color</label>
    </div>
    );
}

import React from "react"
import { colorCode, colors, rank } from "../Color"

interface Prop {
    onNameChange: (name: string) => void;
    onColorChange: (color: string) => void;
}

export const InputForm: React.FC<Prop> = ({ onNameChange, onColorChange }) => {

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onNameChange(e.target.value)
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        onColorChange(e.target.value)
    }

    return <div className="inputform">
        <div className="input-wrap">
            <label htmlFor="name">name</label>
            <input type="text" id="name" onChange={handleNameChange} className="input" />
        </div>
        <div className="input-wrap">
            <label htmlFor="color">color</label>
            <select id="color" className="input" onChange={handleColorChange}>
                <option value=""></option>
                {colors.map((color, idx) => <option value={colorCode(color)}>{rank(color)}</option>)}
            </select>
        </div>
    </div>
}

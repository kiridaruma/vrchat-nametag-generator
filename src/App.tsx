import React, { useState } from "react";
import ReactDom from "react-dom"
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { InputForm } from "./components/InputForm";
import { Renderer } from "./components/Renderer";

interface State {
    name: string;
    color: string;
}

const initState = { name: '', color: '' }

const App: React.FC = () => {

    const [state, setState] = useState<State>(initState);

    const setName = (newName: string) => {
        setState((prev) => { return { ...prev, name: newName } })
    }

    const setColor = (newColor: string) => {
        setState((prev) => { return { ...prev, color: newColor } })
    }

    return <>
        <Header></Header>
        <InputForm onNameChange={setName} onColorChange={setColor}></InputForm>
        <Renderer name={state.name} color={state.color} ></Renderer>
        <Footer></Footer>
    </>;
}

export default (elemId: string) => {
    ReactDom.render(<App />, document.getElementById(elemId));
}

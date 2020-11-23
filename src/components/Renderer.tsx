import React, { useRef, MutableRefObject, useState, useEffect } from "react"

interface Prop {
    name: string;
    color: string;
}

export const Renderer: React.FC<Prop> = ({ name, color }) => {
    const svgRef = useRef<SVGSVGElement>()
    const [imageResourceUri, setImage] = useState<string>("")
    const [fontResourceUri, setFont] = useState<string>("")

    useEffect(() => {
        if (!fontResourceUri) {
            fetchFontResourceUri()
                .then(setFont)
            return;
        }
        const canvas = document.createElement('canvas')
        canvas.width = svgRef.current.width.baseVal.value;
        canvas.height = svgRef.current.height.baseVal.value;
        const ctx = canvas.getContext('2d')

        const image = new Image()
        image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
            setImage(canvas.toDataURL())
        }

        const svgData = (new XMLSerializer).serializeToString(svgRef.current)
        image.src
            = "data:image/svg+xml;charset=utf-8;base64,"
            + btoa(unescape(encodeURIComponent(svgData)))
    }, [name, color, fontResourceUri])

    return <div className="renderer">
        <div className="svg-wrap">
            {svgElem(name, color, svgRef, fontResourceUri)}
        </div>
        <div>
            {imageResourceUri
                && <img src={imageResourceUri} alt={name} className="nametag-image" />
                || <span>now loading…</span>
            }
        </div>
    </div>
}

const svgElem = (name: string, color: string, ref: MutableRefObject<SVGSVGElement>, fontResourceUri: string) => {
    return <svg ref={ref} className="raw-svg" width="2200" height="400" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <style>{`
                    @font-face {
                        font-family: BankGothic;
                        src: url(${fontResourceUri});
                    }
                    text {
                        font-family: 'BankGothic', sans-serif;
                        -webkit-font-size-adjust: 0.45;
                        font-size-adjust: 0.45;
                    }
                `}</style>
        </defs>

        {/* <!-- left --> */}
        <line x1="50" y1="150" x2="50" y2="250" stroke={color} strokeWidth="15px" />
        <path d="M 50,150 a 100 100 180 0 1 100,-100" fill="none" stroke={color} strokeWidth="15px" />
        <path d="M 150,350 a 100 100 90 0 1 -100,-100" fill="none" stroke={color} strokeWidth="15px" />

        {/* <!-- top-left --> */}
        <line x1="150" y1="50" x2="350" y2="50" stroke={color} strokeWidth="15px" />
        <line x1="345" y1="48" x2="405" y2="102" stroke={color} strokeWidth="15px" />

        {/* <!-- top-right --> */}
        <line x1="2050" y1="50" x2="1850" y2="50" stroke={color} strokeWidth="15px" />
        <line x1="1855" y1="48" x2="1795" y2="102" stroke={color} strokeWidth="15px" />

        {/* <!-- top --> */}
        <line x1="400" y1="100" x2="1800" y2="100" stroke={color} strokeWidth="15px" />

        {/* <!-- right --> */}
        <line x1="2150" y1="250" x2="2150" y2="150" stroke={color} strokeWidth="15px" />
        <path d="M 2050,50 a 100 100 270 0 1 100,100" fill="none" stroke={color} strokeWidth="15px" />
        <path d="M 2150,250 a 100 100 0 0 1 -100,100" fill="none" stroke={color} strokeWidth="15px" />

        {/* <!-- bottom --> */}
        <line x1="150" y1="350" x2="2050" y2="350" stroke={color} strokeWidth="15px" />

        {/* <!-- text --> */}
        <text
            x="1110" y="290" fontFamily="MediaGothic"
            textAnchor="middle" fontSize="200px"
            stroke="none" fill="black" >
            {name}
        </text>
        <text
            x="1100" y="270" fontFamily="MediaGothic"
            textAnchor="middle" fontSize="200px"
            stroke="none" fill="white" >
            {name}
        </text>
    </svg>;
}

const fetchFontResourceUri = (): Promise<string> => {
    return new Promise(async (resolve, reject) => {
        const response = await fetch('font/BankGothicLight.ttf')
        if (!response.ok) {
            throw new Error('failed fetch font data')
        }
        const reader = new FileReader
        reader.onload = () => {
            resolve(reader.result as string)
        }
        reader.readAsDataURL(await response.blob())
    })
}

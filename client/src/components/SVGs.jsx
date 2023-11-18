import './styles/SVGs.css';

export function CheckboxIcon({ symbol }) {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 17.5 17.5" className="CheckboxIcon">
            <g id="layer5" transform="translate(-3.7499999,-3.7499999)">
                <path d="M 3.9999999,3.9999999 H 21 V 21 H 10 L 3.9999999,15 Z" id="path13" />
                <path d="M 4.75,4.7285715 H 20.271429 V 20.271429 h -9 L 4.75,14 Z" id="path13-2" />
                <text x="10.66314" y="15.893404" id="text39">
                    <tspan id="tspan39" x="10.66314"y="15.893404">{symbol || '!'}</tspan>
                </text>
            </g>
        </svg>
    )
}

export function CheckmarkIcon() {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 23.664991 23.664991" className="CheckmarkIcon">
            <g id="g21" transform="translate(-0.66750431,-0.66750431)">
                <circle id="circle20" r="10.832496" cy="12.5" cx="12.5" />
                <path d="M 6.9999999,11 11,15 18,8 19.5,9.4999997 11,18 5.4999998,12.5 Z" id="path29" />
            </g>
        </svg>
    )
}

export function CompassIcon() {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 23.664991 23.664991" className="CompassIcon">
            <g id="layer3" transform="translate(-0.66750431,-0.66750431)">
                <circle id="path1-9" r="10.832496" cy="12.5" cx="12.5" />
                <path d="M 6.9999999,18 10.5,10.5 18,6.9999997 14.5,14.5 Z" id="path19" />
                <circle id="path1-9-6" r="1.1793591" cy="12.5" cx="12.5" />
            </g>
        </svg>
    )
}

export function CutCornerCard() {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 200 23" className="CutCornerCard">
            <g id="layer1" transform="translate(0.1322915,0.24880412)">
                <path d="m 0,0 h 200 l -1e-5,19.499997 -3.5,3.500003 H 0 Z" id="path4" vectorEffect="non-scaling-stroke" />
            </g>
        </svg>
    )
}

export function ExclamationPointIcon() {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 23.664991 23.664991" className="ExclamationPointIcon">
            <g id="layer1" transform="translate(-0.66750431,-0.66750431)">
                <circle id="path1" r="10.832496" cy="12.5" cx="12.5" />
                <circle id="circle15" r="7.5543699" cy="12.5" cx="12.5" />
                <path d="M 13.024961,14.39012 13.52653,11.545583 V 6.0872671 h -2.032602 v 5.4583159 l 0.501569,2.844537 z" id="path16" />
                <path d="m 13.52653,15.693099 h -2.032602 v 2.976562 h 2.032602 z" id="path17" />
            </g>
        </svg>
    )
}

export function FileIcon() {
    return (
        <svg viewBox="0 0 102 52" className="FileIcon">
            <g id="layer1" transform="translate(1,1)">
                <path d="m 0,0 h 39.999999 l 4,3.9999999 H 100 V 43.058463 L 93.000001,50 H 0 Z" id="path1" />
            </g>
        </svg>
    )
}

export function ListIcon() {
    return(
        <svg preserveAspectRatio='none' viewBox="0 0 19.25 17" className="ListIcon">
            <g id="layer4" transform="translate(-3.25,-4)">
                <circle id="path2" cx="5.25" cy="6" r="2" />
                <circle id="path3" cx="5.25" cy="12.5" r="2" />
                <circle id="path4" cx="5.25" cy="19" r="1.9999999" />
                <rect id="rect8" width="14" height="3" x="8.5" y="17.5" />
                <rect id="rect9" width="14" height="3.0000002" x="8.5" y="11" />
                <rect id="rect10" width="8.5" height="3" x="8.5" y="4.5" />
            </g>
        </svg>
    )
}
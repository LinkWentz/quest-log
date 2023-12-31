import './styles/SVGs.css';

export function CheckboxIcon({ symbol }) {
    return(
        <div className="CheckboxIcon">
            <svg preserveAspectRatio='none' viewBox="0 0 17.5 17.5" className="CheckboxIcon">
                <g id="layer5" transform="translate(-3.7499999,-3.7499999)">
                    <path d="M 3.9999999,3.9999999 H 21 V 21 H 10 L 3.9999999,15 Z" id="path13" />
                    <path d="M 4.75,4.7285715 H 20.271429 V 20.271429 h -9 L 4.75,14 Z" id="path13-2" />
                </g>
            </svg>
            <span>{symbol || '!'}</span>
        </div>
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
    return (
        <svg viewBox="0 0 19.25 17" className="ListIcon">
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

export function CursorIcon() {
    return (
        <svg preserveAspectRatio='none' viewBox="0 0 11.257194 11.447" className="CursorIcon">
            <g id="layer1">
                <path id="path1" d="M 0.738973,0 0,0.6826456 V 2.1259684 L 3.670577,5.505607 V 6.6244018 H 3.4240804 V 5.5278279 L 2.7863932,4.8901407 H 2.4618652 L 2.0200317,5.3319742 v 2.7471187 l 1.9414836,1.611272 H 5.6844075 L 7.4414067,11.447363 11.257194,8.5493489 V 7.6315759 L 10.115662,6.5350016 8.9519087,3.4912597 7.6315757,2.2830647 H 5.7743245 L 5.3934692,1.9693888 H 3.5811767 L 1.4774292,0 Z M 0.7834147,0.7384562 H 1.1637532 L 5.3490275,4.4762125 H 6.1097046 L 6.0874837,4.2297159 4.3868123,2.6634033 l 0.872815,0.022221 1.6784505,1.4996501 h 0.4252969 l -0.06718,-0.649056 -0.6940147,-0.649056 0.6490557,-0.022221 0.872815,0.8278564 1.298112,3.356901 1.0965743,0.8278563 0.02222,0.358118 L 9.2206237,9.2206259 7.6987547,7.9674719 6.6244018,7.9447349 4.8565511,4.7919555 0.8283732,1.2531534 Z" />
            </g>
        </svg>
    )
}

export function HardDriveIcon() {
    return (
        <svg viewBox="0 0 12.264583 29.996876" className="HardDriveIcon">
            <g id="layer1" transform="translate(0.1322915,0.24880412)">
            <path d="M 10.83418,28.127473 2.4655582,22.482767 V 20.620963 L 2.24349,20.471176 v -2.967335 l 0.4144639,-0.27956 V 16.718359 L 2.24349,16.4388 V 0 L 12,6.5808492 V 21.728906 l -0.330804,0.22313 v 1.405711 L 12,23.580877 v 3.439696 l -1.157552,-0.780778 z" />
                <path d="m 9.201106,16.93588 c 0.992188,1.567274 0.6834333,9.050782 -4.6057406,5.888936 C 3.5124194,22.177435 1.2512859,20.021145 0.84189908,16.38195 0.24248589,11.053537 3.4705064,10.382065 5.320334,11.365636 l 0.045951,3.199013 z" />
                <path d="M 9.5783809,16.089625 6.4234771,13.961616 V 11.552725 L 1.0731354,7.943874 V 1.2394624 l 8.5052452,5.7368605 z" />
                <path d="M 8.59069,29.499999 0.22206819,23.855293 V 21.993489 L 0,21.843702 v -2.967335 l 0.41446391,-0.27956 V 18.090885 L 0,17.811326 V 1.372526 L 9.75651,7.9533752 V 23.101432 l -0.3308043,0.22313 v 1.405711 l 0.3308043,0.22313 v 3.439696 L 8.5989582,27.612321 Z" />
            </g>
        </svg>
    )
}
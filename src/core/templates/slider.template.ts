import {ItemSlider} from "../interfaces/item.slider";

export const normal_style = `
    <style>
        :host {
            background: #2b2e3b;
            display: block;
            width: 100%;
        }
        p {
            color: #990000;
            font-weight: bold;
        }
        .item {
            width: 100%;
            // animation: 12s ani-opacity infinite linear;
            height: 300px;
            position: relative;
        }
        .item img {
            width: 100%;
            object-fit: cover;
            height: 300px;
        }
        .item h1 {
            position: absolute;
            color: white;
            background: rgba(153, 0, 0, 0.8);
            width: 100%;
            text-align: center;
            bottom: 0;
            margin: 0;
            text-transform: uppercase;
            padding: 5px 0;
        }
        @keyframes ani-opacity {
            0% { opacity: 0.0 }
            4% { opacity: 1.0 }
            33.33% { opacity: 1.0 }
            37.33% { opacity: 0.0 }
            100% { opacity: 0.0 }
        }
    </style>
`

export const hispt_style = `
    <style>
        :host {
            background: #2b2e3b;
            display: block;
            width: 100%;
            height: 370px;
            overflow: hidden;
            position: relative;
        }
        .loader {
            border: 16px solid #fff;
            border-top: 16px solid #495d7f;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            animation: spin 1.5s linear infinite;
            position: absolute;
            top: 30%;
            margin-left: auto;
            margin-right: auto;
            left: 0;
            right: 0;
        }
        @keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}
        .item {
            display: none;
            position: relative;
            transition: all 0.5s ease-in-out;
            background: #fff;
            height: 100%;
            width: 100%;
        }
        .item.active {
            display: block;
        }
        .item img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            object-position: center center;
            max-height: 370px;
            position: absolute;
        }
        .item .caption {
            position: absolute;
            top: 0;
            width: 100%;
            height: 100%;
            background: rgba(51, 51, 51, 0.5);
            padding: 80px 0 0 18%;
            box-sizing: border-box;
        }
        .item .caption label {
            background-color: #495d7f;
            color: white;
            width: 120px;
            text-align: center;
            padding: 5px;
        }
        .item .caption h1 {
            font-family: "Arvo", serif;
            font-size: 54px;
            line-height: 60px;
            margin-top: 14px;
            font-weight: 500;
            color: white;
        }
        .item .caption a {
            border: 3px solid white;
            display: inline-block;
            background-color: rgba(255, 255, 255, 0.2);
            color: white;
            font-size: 14px;
            font-weight: 700;
            text-transform: uppercase;
            text-decoration: none;
            padding: 10px 0;
            width: 130px;
            text-align: center;
            transition: all 0.2s ease-in-out;
            margin-top: 18px;
        }
        .item .caption a:hover {
            background-color: rgba(255, 255, 255, 0.35);
        }
    </style>
`

export function get_template(item: ItemSlider, type: string): string {
    switch (type) {
        case 'deltagel':
            return `
                <div class="item animationSlide">
                    <img src="${item.image}" alt="">
                    <div class="caption">
                        <!--<label>Nouveauté</label>-->
                        <h1>${item.title}</h1>
                        <a href="${item.url}">
                            Voir le produit
                        </a>
                    </div>
                </div>
            `
        default:
            return `
                <div class="item">
                    <img src="${item.image}" alt="${item.title}">
                    <h1>${item.title}</h1>
                </div>
            `
    }
}

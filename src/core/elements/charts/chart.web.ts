import {Chart, registerables} from 'chart.js'


export class ChartWeb {

    constructor() {
        Chart.register(...registerables);
    }

    createBar(
        context: CanvasRenderingContext2D,
        labels: Array<string>,
        colors: Array<string>,
        data: Array<any>,
        title: string
    ) {
        new Chart(context, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: colors,
                    borderColor: colors,
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

import * as ApexCharts from 'apexcharts';

export class ApexChartWeb {
    constructor() {

    }

    start() {
        var options = {
            chart: {
                toolbar: {
                    show: false
                },
                type: 'line'
            },
            series: [{
                name: 'sales',
                data: [30,40,35,50,49,60,70,91,125]
            }],
            xaxis: {
                categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
            }
        }

        var chart = new ApexCharts(document.querySelector("#chart-lines"), options);

        chart.render().then();
    }

    get_evolution() {
        const element_chart = document.getElementById('chart-evolution')

        if (element_chart) {
            const categories = eval(element_chart.getAttribute('data-categories')!)
            const data_created = eval(element_chart.getAttribute('data-tasks-created')!)
            const data_resolve = eval(element_chart.getAttribute('data-tasks-resolve')!)

            var options = {
                series: [{
                    name: 'Tareas resueltas',
                    data: data_resolve
                }, {
                    name: 'Tareas creadas',
                    data: data_created
                }],
                chart: {
                    toolbar: {
                        show: false
                    },
                    type: 'area'
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                xaxis: {
                    type: 'date',
                    categories: categories
                },
                tooltip: {
                    x: {
                        format: 'dd/MM/yy'
                    },
                },
            };

            var chart = new ApexCharts(document.querySelector("#chart-evolution"), options);
            chart.render().then();
        }
    }
}

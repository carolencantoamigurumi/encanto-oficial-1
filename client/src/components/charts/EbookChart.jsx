import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, plugins, PointElement, scales, Title, Tooltip } from 'chart.js'
import { Line } from 'react-chartjs-2'



// Registrar os módulos que o Chart.js precisa
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const EbookChart = ({ data }) => {
    // Configuração dos dados para Chart.js
    const chartData = {
        labels: data.map(item => item.period),
        datasets: [
            {
                label: 'Ebooks Vendidos',
                data: data.map(item => item.quantity),
                borderColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4
            }
        ]
    }

    const options = {
        responsive: true,
        plugins: {
            legend: { position:'top' },
            title: { display: true, text: 'Quantidade de Ebooks Vendidos por Período' }
        },
        scales: {
            x: { title: { display: true, text: 'Período' } },
            y: { title: { display: true, text: 'Quantidade' }, beginAtZero: true }
        }
    }

    return <Line options={options} data={chartData} />
}

export default EbookChart
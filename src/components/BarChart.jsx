import {useEffect, useState} from "react";
import {Bar} from "react-chartjs-2"
import {useNavigate} from "react-router-dom";
import {BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BarChart({filterDate = new Date()}) {
    const [reservations, setReservations] = useState([]);

    const fetchReservations = async () => {
        try {
            const reservations = await window.electron.getReservations();
            setReservations(reservations);
        } catch (error) {
            console.error('Error fetching reservations:', error);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    const filteredReservations = reservations.filter((reservation) => {
        if (reservation.deleted)
            return false;

        const reservationDate = new Date(reservation.date);

        return reservationDate.getMonth() === filterDate.getMonth() && reservationDate.getFullYear() === filterDate.getFullYear();
    })

    const generateChartData = (filteredReservations) => {
        let values = new Array(31).fill(0);

        for (const reservation of filteredReservations) {
            const day = new Date(reservation.date).getDate();
            values[day - 1] += 1;
        }

        const chartData = {
            labels: Array.from({ length: 31 }, (_, i) => (i + 1).toString() + "." + (filterDate.getMonth()+1).toString()),
            datasets: [
                {
                    label: "Reservierungen",
                    data: values,
                    backgroundColor: "rgba(13, 110, 253, 1)",
                    borderColor: "rgba(0, 0, 0, 1)",
                    borderWidth: 2
                }
            ]
        };

        return chartData;
    }

    const chartData = generateChartData(filteredReservations);
    const maxDataValue = Math.max(...chartData.datasets[0].data);

    const navigate = useNavigate();

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                min: 0,
                max: maxDataValue + 5,
                ticks: {
                    stepSize: 1,
                }
            },
        },
        onClick: (event, elements) => {
            if (elements.length > 0) {
                const index = elements[0].index;
                navigate(`/all?year=${filterDate.getFullYear()}&month=${filterDate.getMonth() + 1}&day=${index + 1}`);
            }
        }
    };

    return (
        <>
            <Bar data={chartData} options={options} height={100} />
        </>
    )
}

export default BarChart;
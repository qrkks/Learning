import Table from './Table'

async function Meal({ params }) {
    const res = await fetch(`http://localhost:8000/meals/${params.id}`)
    const meal = await res.json()
    // console.log(res.json) 它返回的是一个 Promise，得需要await或then才能返回具体值。
    // console.log(meal) 它返回的是一个对象
    return (
        <div>
            <h1>Meal Details for {params.id}</h1>
            {/* <table>
                <thead>
                    <tr>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(meal).map(([key, value]) => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                        </tr>
                    ))}
                </tbody>
            </table> */}
            <Table {...meal}/>
            {meal.image && <img src={meal.image} alt={meal.name} />}
        </div>
    );
}

export default Meal

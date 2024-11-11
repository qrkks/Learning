import { notFound } from 'next/navigation'
import Table from './Table'



async function Meal({ params }) {
    const { slug } = params
    
    const res = await fetch(`http://localhost:8000/meals/${slug}`)
    const meal = await res.json()
    // console.log(res.json) 它返回的是一个 Promise，得需要await或then才能返回具体值。
    // console.log(meal) 它返回的是一个对象
    if (res.status === 404) {
        notFound()
    }

    return (
        <div className='flex flex-col items-center justify-center gap-4'>
            <h1>Meal Details for {slug}</h1>
            {meal.image && <img src={meal.image} alt={meal.name} className='rounded' />}
            <Table {...meal}/>
        </div>
    );
}

export default Meal

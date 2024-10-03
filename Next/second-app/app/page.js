'use client'
export default  function HomePage() {
  function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
  }
  return (
    <div>
      <h1>HomePage</h1>
      <form action="" className="flex flex-col items-center" onSubmit={handleSubmit}>
        <div>
          <label >email</label>
          <input type="email" className="border" name="email"/>
        </div>
        <div>
          <label >feedback</label>
          <textarea className="border"  id="" cols="30" rows="10" name="feedback"></textarea>
        </div>
        <button>send feedback</button>
      </form>
    </div>
  );
}

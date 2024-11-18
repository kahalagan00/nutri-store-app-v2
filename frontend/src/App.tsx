import axios from "axios";

const TEST_URL = "http://127.0.0.1:3000";

async function getProducts() {
  try {
    const response = await axios.get(`${TEST_URL}/api/v1/products/`);
    const { data } = response.data;
    console.log(data);
  } catch (err: unknown) {
    console.error(err);
  }
}

function App() {
  return (
    <div className="bg-white">
      <h1 className="text-2xl text-slate-600">JhuvNutriStore</h1>
      <button className="h-8 border-8" onClick={getProducts}>
        Fetch Products API
      </button>
    </div>
  );
}

export default App;

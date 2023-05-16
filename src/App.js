import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import {useSelector} from 'react-redux'
function App() {
  const pop = useSelector(state => state.popReducer.pop)
  console.log(pop)
  return (
    <Layout>
    {pop && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;

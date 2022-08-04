import {Link} from 'react-router-dom';

const Home = () => {
  return (
    <div>
            Home<br/>
      <Link to="/about">Aboutへ</Link>
    </div>
  );
};

export default Home;

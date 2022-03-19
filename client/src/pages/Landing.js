import { Logo } from '../components';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage.js';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className='container page'>
        <div className='info'>
          <h1>
            Integrated oil <span>Management</span> system
          </h1>
          <p>
            Oil Refining Complex of the company houses the largest oil refinery
            in the country having a production capacity of 120,000 barrels a
            day. The refinery complex is strategically located at the coastal
            belt of Baluchistan province having key installations of deep sea
            port connected with sub-sea pipelines and storage tanks in close
            vicinity. These facilitates assist the company for handling huge
            consignments of crude oil and finished petroleum products and
            overall improves economies of scale. With the help of its
            subsidiaries involved in petroleum marketing and petroleum
            infrastructure businesses, it provides a perfect synergy between
            various business portfolios.
          </p>
          <Link to='/register' className='btn btn-hero'>
            login/register
          </Link>
        </div>
        <img src={main} alt='IOMS main' className='img main-img' />
      </div>
    </Wrapper>
  );
};

export default Landing;

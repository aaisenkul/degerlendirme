import data from '../data.json';
import { NavLink } from 'react-router-dom';

const Header = ({ setSelectedPage }) => {
    return (
        <div className={'button-list'}>
            {
                data.pages.map(i => {
                    return (
                        <NavLink
                            key={i.page}
                            activeClassName={'active'}
                            style={{ marginRight: '20px' }}
                            to={`/question/${i.page}`}>{i.page}
                        </NavLink>
                    );
                })
            }
        </div>
    );
}

export default Header;
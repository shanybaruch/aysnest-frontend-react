import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

export function HostHeader() {
  const user = useSelector(storeState => storeState.userModule.user);

  return (
    <section className="host-header">
      <div className="host-header-nav">
        <ul>
          <li>
            <NavLink to={`/user/${user?._id}/host/orders`} className={({ isActive }) => isActive ? 'active' : ''}>
              Orders
            </NavLink>
          </li>
          <li>
            <NavLink to={`/user/${user?._id}/host/calendar`} className={({ isActive }) => isActive ? 'active' : ''}>
              Calendar
            </NavLink>
          </li>
          <li>
            <NavLink to={`/user/${user?._id}/host/listings`} className={({ isActive }) => isActive ? 'active' : ''}>
              Listings
            </NavLink>
          </li>
        </ul>
      </div>
    </section>
  )
}

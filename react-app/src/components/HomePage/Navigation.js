import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import { Profile } from '../Profile';
import './HomePage.css';

function Navigation({ isLoaded }) {
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='Navigation-holder'>
			<div>
				<i className="fa-brands fa-twitter"></i>

			</div>

			<div>
				<NavLink exact to="/">Home</NavLink>
			</div>

			<div>
				<i className="fa-regular fa-user"></i> <Profile />
			</div>
			<div>
				<i className="fa-sharp fa-regular fa-envelope"></i> Message
			</div>

			{isLoaded && (
				<div>
					<ProfileButton user={sessionUser} />
				</div>
			)}
		</div>
	);
}

export default Navigation;
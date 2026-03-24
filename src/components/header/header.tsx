import { JSX } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);
  const user = useAppSelector((state) => state.user);
  const offers = useAppSelector((state) => state.offers);
  const favoriteCount = offers.filter(offer => offer.isFavorite).length;

  const handleSignOut = (evt: React.MouseEvent<HTMLAnchorElement>) => {
      evt.preventDefault();
      dispatch(logoutAction());
  };

  return (
    <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authorizationStatus === AuthorizationStatus.Auth && user ? (
                    <>
                        <li className="header__nav-item user">
                            <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Favorites}>
                                <div className="header__avatar-wrapper user__avatar-wrapper">
                                    <img className="header__avatar user__avatar" src={user.avatarUrl} width="20" height="20" alt="User avatar" />
                                </div>
                                <span className="header__user-name user__name">{user.email}</span>
                                <span className="header__favorite-count">{favoriteCount}</span>
                            </Link>
                        </li>
                        <li className="header__nav-item">
                            <a className="header__nav-link" href="#" onClick={handleSignOut}>
                                <span className="header__signout">Sign out</span>
                            </a>
                        </li>
                    </>
                ) : (
                    <li className="header__nav-item user">
                        <Link className="header__nav-link header__nav-link--profile" to={AppRoute.Login}>
                            <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                            <span className="header__login">Sign in</span>
                        </Link>
                    </li>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </header>
  );
}

export { Header };

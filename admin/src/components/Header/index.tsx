import React from 'react';
import { Button } from '@material-ui/core'
import { useCookies } from 'react-cookie'
import axios from 'axios';

export const Header = ({
  uData,
  isAuth
}) => {
  return (
    <>
        <nav className={`nav-nb`}>
          <div className={`nav-container`}>
            <div className={'nav-left'}>
              <a href={'/'}>
                <i className={'dot-icon'} />
              </a>
              <ul className={'nav-items'}>
                <a href={'/updates'}>Updates</a>
                <a href={'/updates/add'}>Add an Update</a>
                <span />
                <a href={'/targets'}>Targets</a>
              </ul>
            </div>
  
            <div className={'nav-right'}>
              {!isAuth && (
                <Button color="primary" variant="contained" disableElevation href={'/id/login'}>
                  Sign in
                </Button>
              )}
              {isAuth && (
                <>
                  <img src={uData.avatar_url} style={{ borderRadius: 25, width: 40, height: 40 }} />
                  <p>{uData.name}</p>
                  <Button color="primary" variant="contained" disableElevation href={'/id/logout'}>
                    Sign Out
                  </Button>
                </>
              )}
            </div>
          </div>
        </nav>
      </>
  )
}